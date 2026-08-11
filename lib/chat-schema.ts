import { z } from "zod";

export const CHAT_QUESTION_MIN_LENGTH = 3;
export const CHAT_QUESTION_MAX_LENGTH = 500;

/** Normalise une question comme le DTO Nest.js avant de vérifier sa longueur. */
const normalizedQuestionSchema = z
  .string()
  .transform((value) => value.trim().replace(/\s+/g, " "))
  .pipe(
    z
      .string()
      .min(CHAT_QUESTION_MIN_LENGTH, "La question est trop courte.")
      .max(CHAT_QUESTION_MAX_LENGTH, "La question est trop longue."),
  );

/** Corps strict accepté par la façade publique POST /api/chat. */
export const chatRequestSchema = z.strictObject({
  question: normalizedQuestionSchema,
});

/** Réponse minimale attendue du backend Nest.js et renvoyée au navigateur. */
export const chatSuccessResponseSchema = z.strictObject({
  answer: z.string().min(1),
  answered: z.boolean(),
});

/** Erreur générique que la façade peut afficher sans révéler son infrastructure. */
export const chatErrorResponseSchema = z.strictObject({
  error: z.string().min(1),
});

/** Événements envoyés dans le flux SSE public du chat. */
export const chatStreamEventSchema = z.discriminatedUnion("type", [
  z.strictObject({ type: z.literal("token"), token: z.string().min(1) }),
  z.strictObject({
    type: z.literal("done"),
    answer: z.string().min(1),
    answered: z.boolean(),
  }),
  z.strictObject({ type: z.literal("error"), error: z.string().min(1) }),
]);

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatSuccessResponse = z.infer<typeof chatSuccessResponseSchema>;
export type ChatErrorResponse = z.infer<typeof chatErrorResponseSchema>;
export type ChatStreamEvent = z.infer<typeof chatStreamEventSchema>;
export type ChatDoneEvent = Extract<ChatStreamEvent, { type: "done" }>;
