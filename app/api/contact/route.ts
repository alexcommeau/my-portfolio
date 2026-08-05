import { z } from "zod";
import {
  contactSchema,
  type ContactResponse,
} from "@/lib/contact-schema";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const RESEND_TIMEOUT_MS = 10_000;
const FROM_ADDRESS = "Portfolio <onboarding@resend.dev>";
const DEFAULT_TO_ADDRESS = "alexcommeau@gmail.com";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_MAX_BUCKETS = 5000;

// Attaché à globalThis pour survivre au rechargement de module du HMR en dev.
// L'état reste volatile : il repart de zéro à chaque redémarrage du conteneur
// et ne serait pas partagé entre plusieurs instances (cf. CONTEXT.md §14).
const globalForContact = globalThis as unknown as {
  contactRateLimit?: Map<string, number[]>;
};
const buckets = (globalForContact.contactRateLimit ??= new Map<
  string,
  number[]
>());

function json(body: ContactResponse, status: number, headers?: HeadersInit) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Fenêtre glissante par IP. Renvoie le nombre de secondes à attendre lorsque le
 * quota est dépassé, `null` sinon. La requête courante est comptabilisée dès
 * qu'elle est acceptée, y compris si elle échoue plus loin à la validation :
 * sinon un bot pourrait boucler indéfiniment sur des charges utiles invalides.
 */
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

  // Balayage opportuniste : borne la mémoire sous flood d'IP distinctes, sans
  // `setInterval` (un timer dans un module de route retient le process).
  if (buckets.size > RATE_LIMIT_MAX_BUCKETS) {
    for (const [key, timestamps] of buckets) {
      const last = timestamps[timestamps.length - 1];
      if (last === undefined || last <= windowStart) buckets.delete(key);
    }
  }

  return null;
}

export async function POST(request: Request) {
  const retryAfter = checkRateLimit(getClientIp(request));
  if (retryAfter !== null) {
    return json(
      {
        ok: false,
        error:
          "Vous avez envoyé trop de messages. Réessayez dans quelques minutes.",
      },
      429,
      { "Retry-After": String(retryAfter) },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(
      { ok: false, error: "Requête invalide." },
      400,
    );
  }

  // Honeypot : on répond comme un succès pour que le bot n'apprenne rien du
  // piège. Testé avant la validation, donc aucun email n'est envoyé.
  const honeypot = (body as { company?: unknown } | null)?.company;
  if (typeof honeypot === "string" && honeypot.length > 0) {
    return json({ ok: true }, 200);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Certains champs sont invalides.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      400,
    );
  }

  // Lecture volontairement à l'intérieur du handler : `next build` tourne en CI
  // sans aucun secret, un accès au module scope casserait la compilation.
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return json(
      {
        ok: false,
        error: "L'envoi de messages est temporairement indisponible.",
      },
      503,
    );
  }

  const data = parsed.data;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_ADDRESS,
        to: [process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO_ADDRESS],
        reply_to: data.email,
        // Préfixe stable : sert de critère au filtre Gmail.
        subject: `[Portfolio] ${data.subject}`,
        // Corps en texte brut : rien à échapper, donc aucune injection HTML
        // possible depuis les champs du visiteur.
        text: [
          `Nom    : ${data.name}`,
          `Email  : ${data.email}`,
          `Sujet  : ${data.subject}`,
          "",
          data.message,
        ].join("\n"),
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(
        "[contact] Resend a répondu %d: %s",
        response.status,
        detail.slice(0, 500),
      );
      return json(
        {
          ok: false,
          error:
            "L'envoi a échoué. Réessayez plus tard ou écrivez-moi directement.",
        },
        502,
      );
    }
  } catch (error) {
    console.error(
      "[contact] Appel Resend en échec :",
      error instanceof Error ? error.message : "erreur inconnue",
    );
    return json(
      {
        ok: false,
        error:
          "L'envoi a échoué. Réessayez plus tard ou écrivez-moi directement.",
      },
      502,
    );
  }

  return json({ ok: true }, 200);
}
