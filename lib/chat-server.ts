import "server-only";

import type {
  ChatErrorResponse,
  ChatSuccessResponse,
} from "@/lib/chat-schema";

const DEFAULT_UPSTREAM_TIMEOUT_MS = 90_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_MAX_BUCKETS = 5000;

// Attaché à globalThis pour survivre au HMR et partager le même quota entre les
// routes JSON et SSE. La limite reste locale au processus Next.js.
const globalForChat = globalThis as unknown as {
  chatRateLimit?: Map<string, number[]>;
};
const buckets = (globalForChat.chatRateLimit ??= new Map<string, number[]>());

/** Produit une réponse JSON publique avec un cache explicitement désactivé. */
export function chatJson(
  body: ChatSuccessResponse | ChatErrorResponse,
  status: number,
  headers?: HeadersInit,
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

/** Lit le timeout facultatif en conservant une valeur sûre en cas d’erreur. */
export function getChatUpstreamTimeoutMs(): number {
  const configured = Number(process.env.KNOWLEDGE_API_TIMEOUT_MS);
  return Number.isInteger(configured) && configured > 0
    ? configured
    : DEFAULT_UPSTREAM_TIMEOUT_MS;
}

/** Construit une URL Nest.js sûre à partir de la configuration runtime. */
export function getKnowledgeEndpoint(
  baseUrl: string,
  path: "knowledge/ask" | "knowledge/ask/stream",
): URL | null {
  try {
    const endpoint = new URL(
      path,
      `${baseUrl.trim().replace(/\/+$/, "")}/`,
    );
    return endpoint.protocol === "http:" || endpoint.protocol === "https:"
      ? endpoint
      : null;
  } catch {
    return null;
  }
}

/** Désactive le quota par défaut en développement et en test. */
function isRateLimitEnabled(): boolean {
  const configured = process.env.KNOWLEDGE_CHAT_RATE_LIMIT_ENABLED
    ?.trim()
    .toLowerCase();

  if (configured === "true") return true;
  if (configured === "false") return false;

  return process.env.NODE_ENV === "production";
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

  if (buckets.size > RATE_LIMIT_MAX_BUCKETS) {
    for (const [key, timestamps] of buckets) {
      const last = timestamps[timestamps.length - 1];
      if (last === undefined || last <= windowStart) buckets.delete(key);
    }
  }

  return null;
}

/** Retourne directement la réponse 429 commune, ou null si la requête passe. */
export function enforceChatRateLimit(request: Request): Response | null {
  if (!isRateLimitEnabled()) return null;

  const retryAfter = checkRateLimit(getClientIp(request));

  return retryAfter === null
    ? null
    : chatJson(
        {
          error:
            "Vous avez posé trop de questions. Réessayez dans quelques minutes.",
        },
        429,
        { "Retry-After": String(retryAfter) },
      );
}
