import { z } from "zod";

/**
 * Schéma partagé entre le formulaire client et la route `POST /api/contact`.
 * Ce module doit rester isomorphe : aucun import serveur, aucun `process.env`.
 */

// Bloque l'injection d'en-têtes MIME via les champs repris tels quels par Resend.
const noNewline = (value: string) => !/[\r\n]/.test(value);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Votre nom doit contenir au moins 2 caractères.")
    .max(80, "Votre nom ne peut pas dépasser 80 caractères.")
    .refine(noNewline, "Votre nom contient des caractères non autorisés."),
  email: z
    .string()
    .trim()
    .max(254, "Cette adresse email est trop longue.")
    // Borner la longueur avant la validation du format évite d'exécuter le
    // motif email sur une chaîne arbitrairement longue.
    .pipe(z.email("Cette adresse email semble invalide.")),
  subject: z
    .string()
    .trim()
    .min(3, "Le sujet doit contenir au moins 3 caractères.")
    .max(120, "Le sujet ne peut pas dépasser 120 caractères.")
    .refine(noNewline, "Le sujet contient des caractères non autorisés."),
  message: z
    .string()
    .trim()
    .min(20, "Votre message doit contenir au moins 20 caractères.")
    .max(4000, "Votre message ne peut pas dépasser 4000 caractères."),
  // Honeypot : invisible pour un humain, donc toujours vide.
  company: z.literal("").optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string[] | undefined>
>;

export type ContactResponse =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: ContactFieldErrors };

export const MESSAGE_MAX_LENGTH = 4000;
