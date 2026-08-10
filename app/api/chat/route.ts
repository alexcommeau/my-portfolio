import {
  chatRequestSchema,
  chatSuccessResponseSchema,
  type ChatErrorResponse,
  type ChatSuccessResponse,
} from "@/lib/chat-schema";

export const runtime = "nodejs";
export const maxDuration = 95;

const DEFAULT_UPSTREAM_TIMEOUT_MS = 90_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_MAX_BUCKETS = 5000;

// Attaché à globalThis pour survivre au HMR en développement. Cette limite
// reste volontairement locale au processus et devra passer dans un stockage
// partagé si le portfolio est un jour répliqué sur plusieurs instances.
const globalForChat = globalThis as unknown as {
  chatRateLimit?: Map<string, number[]>;
};
const buckets = (globalForChat.chatRateLimit ??= new Map<string, number[]>());

/** Produit toutes les réponses publiques avec un cache explicitement désactivé. */
function json(
  body: ChatSuccessResponse | ChatErrorResponse,
  status: number,
  headers?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

/** Retrouve l’adresse transmise par le reverse proxy pour isoler les quotas. */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }

  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/** Applique une fenêtre glissante de dix requêtes par dix minutes et par IP. */
function checkRateLimit(ip: string): number | null {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (buckets.get(ip) ?? []).filter(
    (timestamp) => timestamp > windowStart,
  );

  if (recent.length >= RATE_LIMIT_MAX) {
    buckets.set(ip, recent);
    const oldest = recent[0] ?? now;
    return Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000),
    );
  }

  recent.push(now);
  buckets.set(ip, recent);

  // Nettoyage opportuniste pour borner la mémoire sans maintenir de timer.
  if (buckets.size > RATE_LIMIT_MAX_BUCKETS) {
    for (const [key, timestamps] of buckets) {
      const last = timestamps[timestamps.length - 1];
      if (last === undefined || last <= windowStart) buckets.delete(key);
    }
  }

  return null;
}

/** Lit le timeout facultatif en conservant une valeur sûre en cas d’erreur. */
function getUpstreamTimeoutMs(): number {
  const configured = Number(process.env.KNOWLEDGE_API_TIMEOUT_MS);
  return Number.isInteger(configured) && configured > 0
    ? configured
    : DEFAULT_UPSTREAM_TIMEOUT_MS;
}

/** Construit l’URL NestJS au runtime afin que la même image serve dev et prod. */
function getKnowledgeEndpoint(baseUrl: string): URL | null {
  try {
    const endpoint = new URL(
      "knowledge/ask",
      `${baseUrl.trim().replace(/\/+$/, "")}/`,
    );
    return endpoint.protocol === "http:" || endpoint.protocol === "https:"
      ? endpoint
      : null;
  } catch {
    return null;
  }
}

/** Relaye une question validée au backend RAG sans exposer sa clé au navigateur. */
export async function POST(request: Request) {
  const retryAfter = checkRateLimit(getClientIp(request));
  if (retryAfter !== null) {
    return json(
      {
        error:
          "Vous avez posé trop de questions. Réessayez dans quelques minutes.",
      },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Requête invalide." }, 400);
  }

  const parsedRequest = chatRequestSchema.safeParse(body);
  if (!parsedRequest.success) {
    return json({ error: "La question envoyée est invalide." }, 400);
  }

  // Les variables sont lues dans le handler : aucun secret n’est nécessaire
  // pendant `next build` et elles restent modifiables au runtime en production.
  const baseUrl = process.env.KNOWLEDGE_API_BASE_URL?.trim();
  const chatKey = process.env.KNOWLEDGE_CHAT_KEY?.trim();
  const endpoint = baseUrl ? getKnowledgeEndpoint(baseUrl) : null;

  if (!endpoint || !chatKey) {
    console.error(
      "[chat] KNOWLEDGE_API_BASE_URL ou KNOWLEDGE_CHAT_KEY non configurée.",
    );
    return json(
      { error: "L’assistant est temporairement indisponible." },
      503,
    );
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-knowledge-chat-key": chatKey,
      },
      body: JSON.stringify(parsedRequest.data),
      signal: AbortSignal.timeout(getUpstreamTimeoutMs()),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("[chat] Le backend RAG a répondu %d.", response.status);

      if (response.status === 400) {
        return json({ error: "La question envoyée est invalide." }, 400);
      }

      return json(
        { error: "L’assistant est temporairement indisponible." },
        response.status === 503 || response.status === 401 ? 503 : 502,
      );
    }

    const upstreamBody: unknown = await response.json().catch(() => null);
    const parsedResponse = chatSuccessResponseSchema.safeParse(upstreamBody);

    if (!parsedResponse.success) {
      console.error("[chat] Le backend RAG a renvoyé un contrat invalide.");
      return json(
        { error: "L’assistant a renvoyé une réponse invalide." },
        502,
      );
    }

    return json(parsedResponse.data, 200);
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error(
      "[chat] Appel du backend RAG en échec :",
      timedOut ? "timeout" : "connexion impossible",
    );

    return json(
      {
        error: timedOut
          ? "L’assistant met trop de temps à répondre. Réessayez dans un instant."
          : "L’assistant est temporairement indisponible.",
      },
      timedOut ? 504 : 502,
    );
  }
}
