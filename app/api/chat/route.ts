import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { systemPrompt } from "@/lib/system-prompt";

export const maxDuration = 30;

const llamacpp = createOpenAICompatible({
  name: "llamacpp",
  baseURL: process.env.LLAMACPP_BASE_URL ?? "http://localhost:8080/v1",
  apiKey: process.env.LLAMACPP_API_KEY,
});

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: llamacpp(process.env.LLAMACPP_MODEL ?? "local-model"),
    instructions: systemPrompt,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
