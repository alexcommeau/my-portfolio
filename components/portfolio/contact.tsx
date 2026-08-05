"use client";

import { useId, useState } from "react";
import { z } from "zod";
import { SectionReveal } from "@/components/ui/section-reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  MESSAGE_MAX_LENGTH,
  type ContactFieldErrors,
  type ContactResponse,
} from "@/lib/contact-schema";

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  company: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const labelClass = "mb-1.5 block text-[12.5px] font-medium text-zinc-400";
const fieldClass =
  "w-full border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200";
const errorClass = "mt-1.5 text-[12.5px] text-red-400";

export function Contact() {
  const uid = useId();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const setField =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.target;
      setForm((f) => ({ ...f, [field]: value }));
      // L'erreur disparaît dès que le visiteur corrige le champ.
      setFieldErrors((errors) =>
        errors[field] ? { ...errors, [field]: undefined } : errors,
      );
    };

  const reset = () => {
    setStatus("idle");
    setFieldErrors({});
    setFormError(null);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    setFormError(null);
    setFieldErrors({});

    // Pré-validation avec le schéma partagé : aucun aller-retour réseau si la
    // saisie est incomplète.
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      setFieldErrors(z.flattenError(parsed.error).fieldErrors);
      setStatus("error");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json: ContactResponse | null = await res.json().catch(() => null);

      if (res.ok && json?.ok) {
        setForm(initialForm);
        setStatus("success");
        return;
      }

      if (json && !json.ok) {
        if (json.fieldErrors) setFieldErrors(json.fieldErrors);
        setFormError(json.error);
      } else {
        setFormError("L'envoi a échoué. Réessayez dans un instant.");
      }
      setStatus("error");
    } catch {
      setFormError("Connexion impossible. Vérifiez votre réseau et réessayez.");
      setStatus("error");
    }
  };

  const fieldProps = (field: "name" | "email" | "subject" | "message") => ({
    id: `${uid}-${field}`,
    name: field,
    value: form[field],
    onChange: setField(field),
    "aria-invalid": Boolean(fieldErrors[field]),
    "aria-describedby": fieldErrors[field] ? `${uid}-${field}-error` : undefined,
  });

  const fieldError = (field: "name" | "email" | "subject" | "message") =>
    fieldErrors[field]?.[0] ? (
      <p id={`${uid}-${field}-error`} className={errorClass}>
        {fieldErrors[field][0]}
      </p>
    ) : null;

  return (
    <section
      id="contact"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <SectionReveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            Contactez-
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              moi
            </span>
          </h2>
          <p className="text-[15.5px] text-zinc-400">
            Une question, un projet, ou simplement envie de discuter ? N&apos;hésitez pas à me laisser un message.
          </p>
        </div>
        <div className="mx-auto max-w-[620px] rounded-xl border border-zinc-800 bg-zinc-900 p-9 shadow-sm sm:p-10">

          {status === "success" ? (
            <div role="status" className="py-7 text-center">
              <p className="text-[15px] font-semibold text-teal-400">
                Merci, votre message a bien été envoyé ✓
              </p>
              <button
                type="button"
                onClick={reset}
                className="mt-4 cursor-pointer text-[13.5px] font-medium text-cyan-400 underline-offset-4 hover:underline"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="relative grid gap-4">
              {/* Honeypot : déporté hors écran plutôt que masqué en display:none,
                  que les bots savent ignorer. Les trois attributs sont
                  nécessaires pour ne jamais gêner un visiteur réel. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor={`${uid}-company`}>Société</label>
                <input
                  id={`${uid}-company`}
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={setField("company")}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${uid}-name`} className={labelClass}>
                    Nom
                  </label>
                  <Input
                    type="text"
                    autoComplete="name"
                    placeholder="Votre nom"
                    className={fieldClass}
                    {...fieldProps("name")}
                  />
                  {fieldError("name")}
                </div>
                <div>
                  <label htmlFor={`${uid}-email`} className={labelClass}>
                    Email
                  </label>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="vous@exemple.com"
                    className={fieldClass}
                    {...fieldProps("email")}
                  />
                  {fieldError("email")}
                </div>
              </div>
              <div>
                <label htmlFor={`${uid}-subject`} className={labelClass}>
                  Sujet
                </label>
                <Input
                  type="text"
                  autoComplete="off"
                  placeholder="Sujet de votre message"
                  className={fieldClass}
                  {...fieldProps("subject")}
                />
                {fieldError("subject")}
              </div>
              <div>
                <label htmlFor={`${uid}-message`} className={labelClass}>
                  Message
                </label>
                <Textarea
                  rows={5}
                  maxLength={MESSAGE_MAX_LENGTH}
                  placeholder="Décrivez votre projet…"
                  className={`${fieldClass} resize-y`}
                  {...fieldProps("message")}
                />
                {fieldError("message")}
              </div>

              {formError ? (
                <p role="alert" className="text-[13px] text-red-400">
                  {formError}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 cursor-pointer justify-self-start rounded-md bg-cyan-400 px-6.5 py-2.75 text-[14.5px] font-bold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-cyan-400"
              >
                {status === "submitting"
                  ? "Envoi en cours…"
                  : "Envoyer le message"}
              </button>
            </form>
          )}
        </div>
      </SectionReveal>
    </section>
  );
}
