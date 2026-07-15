"use client";

import { useState } from "react";
import { Reveal } from "@/components/portfolio/reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialForm = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState(initialForm);
  const [sent, setSent] = useState(false);

  const setField =
    (field: keyof typeof initialForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm(initialForm);
  };

  return (
    <section
      id="contact"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
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

          {sent ? (
            <div className="py-7 text-center text-[15px] font-semibold text-teal-400">
              Merci, votre message a bien été envoyé ✓
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-medium text-zinc-400">
                    Nom
                  </label>
                  <Input
                    type="text"
                    required
                    value={form.name}
                    onChange={setField("name")}
                    placeholder="Votre nom"
                    className="w-full border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[12.5px] font-medium text-zinc-400">
                    Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={form.email}
                    onChange={setField("email")}
                    placeholder="vous@exemple.com"
                    className="w-full border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-[12.5px] font-medium text-zinc-400">
                  Sujet
                </label>
                <Input
                  type="text"
                  required
                  value={form.subject}
                  onChange={setField("subject")}
                  placeholder="Sujet de votre message"
                  className="w-full border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[12.5px] font-medium text-zinc-400">
                  Message
                </label>
                <Textarea
                  required
                  value={form.message}
                  onChange={setField("message")}
                  placeholder="Décrivez votre projet…"
                  rows={5}
                  className="w-full resize-y border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-200"
                />
              </div>
              <button
                type="submit"
                className="mt-1 justify-self-start cursor-pointer rounded-md bg-cyan-400 px-6.5 py-2.75 text-[14.5px] font-bold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300"
              >
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </section>
  );
}
