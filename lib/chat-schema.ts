import { z } from "zod";

export const CHAT_QUESTION_MIN_LENGTH = 3;
export const CHAT_QUESTION_MAX_LENGTH = 500;

/** Normalise une question comme le DTO NestJS avant de vérifier sa longueur. */
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

/** Réponse minimale attendue du backend NestJS et renvoyée au navigateur. */
export const chatSuccessResponseSchema = z.strictObject({
  answer: z.string().min(1),
  answered: z.boolean(),
});

/** Erreur générique que la façade peut afficher sans révéler son infrastructure. */
export const chatErrorResponseSchema = z.strictObject({
  error: z.string().min(1),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatSuccessResponse = z.infer<typeof chatSuccessResponseSchema>;
export type ChatErrorResponse = z.infer<typeof chatErrorResponseSchema>;
