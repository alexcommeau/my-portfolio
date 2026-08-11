import { chatRequestSchema } from "@/lib/chat-schema";
import {
  chatJson,
  enforceChatRateLimit,
  getChatUpstreamTimeoutMs,
  getKnowledgeEndpoint,
} from "@/lib/chat-server";

export const runtime = "nodejs";
export const maxDuration = 95;

/** Relaye le flux SSE Nest.js tout en gardant la clé privée côté serveur. */
export async function POST(request: Request) {
  const rateLimitResponse = enforceChatRateLimit(request);
  if (rateLimitResponse) return rateLimitResponse;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return chatJson({ error: "Requête invalide." }, 400);
  }

  const parsedRequest = chatRequestSchema.safeParse(body);
  if (!parsedRequest.success) {
    return chatJson({ error: "La question envoyée est invalide." }, 400);
  }

  const baseUrl = process.env.KNOWLEDGE_API_BASE_URL?.trim();
  const chatKey = process.env.KNOWLEDGE_CHAT_KEY?.trim();
  const endpoint = baseUrl
    ? getKnowledgeEndpoint(baseUrl, "knowledge/ask/stream")
    : null;

  if (!endpoint || !chatKey) {
    console.error(
      "[chat-stream] KNOWLEDGE_API_BASE_URL ou KNOWLEDGE_CHAT_KEY non configurée.",
    );
    return chatJson(
      { error: "L’assistant est temporairement indisponible." },
      503,
    );
  }

  const timeoutSignal = AbortSignal.timeout(getChatUpstreamTimeoutMs());
  const signal = AbortSignal.any([request.signal, timeoutSignal]);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "text/event-stream",
        "Content-Type": "application/json",
        "x-knowledge-chat-key": chatKey,
      },
      body: JSON.stringify(parsedRequest.data),
      signal,
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        "[chat-stream] Le backend RAG a répondu %d.",
        response.status,
      );

      if (response.status === 400) {
        return chatJson({ error: "La question envoyée est invalide." }, 400);
      }

      return chatJson(
        { error: "L’assistant est temporairement indisponible." },
        response.status === 503 || response.status === 401 ? 503 : 502,
      );
    }

    const contentType = response.headers.get("content-type");
    if (!response.body || !contentType?.includes("text/event-stream")) {
      console.error("[chat-stream] Le backend RAG n’a pas renvoyé un flux SSE.");
      return chatJson(
        { error: "L’assistant a renvoyé une réponse invalide." },
        502,
      );
    }

    return new Response(response.body, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, no-transform",
        "Content-Type": "text/event-stream; charset=utf-8",
        "X-Accel-Buffering": "no",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    if (request.signal.aborted) {
      return new Response(null, { status: 499 });
    }

    const timedOut = timeoutSignal.aborted;
    console.error(
      "[chat-stream] Appel du backend RAG en échec :",
      timedOut ? "timeout" : "connexion impossible",
    );

    return chatJson(
      {
        error: timedOut
          ? "L’assistant met trop de temps à répondre. Réessayez dans un instant."
          : "L’assistant est temporairement indisponible.",
      },
      timedOut ? 504 : 502,
    );
  }
}
