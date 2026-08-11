import {
  chatStreamEventSchema,
  type ChatDoneEvent,
} from "@/lib/chat-schema";

/** Erreur publique déjà nettoyée, distinguée des erreurs réseau du navigateur. */
export class ChatStreamError extends Error {}

/**
 * Lit un flux SSE ligne par ligne et transmet chaque token au composant. Le
 * dernier événement sert de valeur canonique pour corriger le texte affiché.
 */
export async function readChatStream(
  response: Response,
  onToken: (token: string) => void,
): Promise<ChatDoneEvent> {
  if (!response.body) {
    throw new ChatStreamError("L’assistant n’a renvoyé aucun flux.");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let dataLines: string[] = [];
  let completed: ChatDoneEvent | null = null;

  const consumeEvent = () => {
    if (dataLines.length === 0) return;

    const rawData = dataLines.join("\n");
    dataLines = [];

    let body: unknown;
    try {
      body = JSON.parse(rawData) as unknown;
    } catch {
      throw new ChatStreamError("Le flux de l’assistant est invalide.");
    }

    const parsed = chatStreamEventSchema.safeParse(body);
    if (!parsed.success) {
      throw new ChatStreamError("Le flux de l’assistant est invalide.");
    }

    if (parsed.data.type === "token") {
      onToken(parsed.data.token);
    } else if (parsed.data.type === "done") {
      completed = parsed.data;
    } else {
      throw new ChatStreamError(parsed.data.error);
    }
  };

  const consumeLine = (line: string) => {
    if (line === "") {
      consumeEvent();
    } else if (line.startsWith("data:")) {
      dataLines.push(line.slice(5).replace(/^ /, ""));
    }
  };

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        buffer += decoder.decode();
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      for (const line of lines) consumeLine(line);
    }

    if (buffer) consumeLine(buffer);
    consumeEvent();
  } finally {
    reader.releaseLock();
  }

  if (!completed) {
    throw new ChatStreamError("La réponse de l’assistant a été interrompue.");
  }

  return completed;
}
