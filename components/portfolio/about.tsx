"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { Reveal } from "@/components/portfolio/reveal";
import { useAboutTabContext } from "@/components/portfolio/ui-context";
import { Input } from "@/components/ui/input";
import { aboutCards, bio, chatQA } from "@/lib/data";
import { cn } from "@/lib/utils";

function messageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function GpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="14" width="4" height="8" />
      <rect x="10" y="9" width="4" height="13" />
      <rect x="18" y="4" width="4" height="18" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.6 1.4c0 1.6-2.1 1.9-2.1 3.1" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function About() {
  const { aboutTab, setAboutTab } = useAboutTabContext();
  const [chatInput, setChatInput] = useState("");
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const chatTyping = status === "submitted";
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, chatTyping, error]);

  const askQuestion = (question: string) => {
    sendMessage({ text: question });
  };

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = chatInput.trim();
    if (!text) return;
    sendMessage({ text });
    setChatInput("");
  };

  return (
    <section
      id="about"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <Reveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            À propos{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              de moi
            </span>
          </h2>
          <p className="mb-7 text-[15.5px] text-zinc-400">
            Construire des produits fiables, à la croisée du fullstack et de l&apos;IA
          </p>
          <div className="inline-flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
            <button
              onClick={() => setAboutTab("chat")}
              className={cn(
                "cursor-pointer rounded-md px-4.5 py-2 font-sans text-[13px] font-semibold transition-colors",
                aboutTab === "chat"
                  ? "bg-cyan-400 text-[#052027]"
                  : "bg-transparent text-zinc-400"
              )}
            >
              ✦ IA Chat
            </button>
            <button
              onClick={() => setAboutTab("profile")}
              className={cn(
                "cursor-pointer rounded-md px-4.5 py-2 font-sans text-[13px] font-semibold transition-colors",
                aboutTab === "profile"
                  ? "bg-zinc-800 text-zinc-100"
                  : "bg-transparent text-zinc-400"
              )}
            >
              Profil
            </button>
          </div>
        </div>

        {aboutTab === "profile" && (
          <div className="grid min-h-[460px] grid-cols-1 gap-5 md:grid-cols-[1.1fr_1fr]">
            <div className="rounded-[10px] border border-zinc-800 bg-zinc-900 p-8">
              <h3 className="mb-4 text-xl font-bold text-cyan-400">Parcours</h3>
              {bio.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={cn("text-[15px] leading-loose text-zinc-400", i > 0 && "mt-4")}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="min-h-[200px] rounded-[10px] border border-zinc-800 bg-zinc-900 p-5"
                >
                  <div className="mb-3 flex size-9.5 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 font-mono text-[15px] font-bold text-cyan-400">
                    {card.glyph}
                  </div>
                  <div className="mb-1.5 text-[15px] font-bold">{card.title}</div>
                  <div className="text-[13px] leading-snug text-zinc-500">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aboutTab === "chat" && (
          <div className="rounded-[10px] border border-cyan-400/30">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-t-[10px] border-b border-zinc-800 bg-zinc-900 px-5.5 py-4.5">
              <div>
                <div className="flex items-center gap-2 text-[15px] font-bold">
                  <span className="text-cyan-400">✦</span> Assistant IA auto-hébergé
                </div>
                <div className="mt-1 text-[12.5px] text-zinc-500">
                  Conçu, hébergé et déployé par mes soins • Système RAG
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 px-3.5 py-1.5 text-[12.5px] text-zinc-300">
                  <GpuIcon className="size-3.5" />
                  Mode léger
                </div>
                <span className="group relative inline-flex text-zinc-600">
                  <InfoIcon className="size-4" />
                  <span className="pointer-events-none absolute top-[calc(100%+12px)] right-[-8px] z-20 w-65 rounded-[10px] border border-zinc-800 bg-zinc-900 p-4 text-left opacity-0 shadow-[0_8px_24px_rgba(0,0,0,0.4)] transition-opacity group-hover:opacity-100">
                    <span className="mb-2.5 flex items-center gap-2 text-[13.5px] font-bold text-zinc-200">
                      <span className="text-zinc-300">✦</span> Mode léger
                    </span>
                    <span className="mb-2.5 block text-[12.5px] leading-relaxed text-zinc-400">
                      Mon serveur GPU principal est actuellement indisponible.
                    </span>
                    <span className="mb-3 block text-[12.5px] leading-relaxed text-zinc-400">
                      Vous discutez avec un modèle plus compact exécuté sur mon
                      homelab.
                    </span>
                    <span className="flex flex-col gap-1.5 border-t border-zinc-800 pt-2.5">
                      <span className="flex justify-between text-xs text-zinc-500">
                        <span>Accélération</span>
                        <span className="font-semibold text-zinc-300">CPU</span>
                      </span>
                      <span className="flex justify-between text-xs text-zinc-500">
                        <span>Latence estimée</span>
                        <span className="font-semibold text-zinc-300">
                          ~3–5 s
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span className="text-zinc-800">|</span>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-cyan-400 hover:text-cyan-300"
                >
                  Voir l&apos;architecture →
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 overflow-hidden rounded-b-[10px] bg-zinc-900 md:grid-cols-[250px_1fr]">
              <div className="border-b border-zinc-800 px-4 py-5 md:border-r md:border-b-0">
                <div className="mb-3 px-1 font-mono text-[11px] tracking-wide text-zinc-600 uppercase">
                  Questions suggérées
                </div>
                <div className="flex flex-col gap-1.5">
                  {chatQA.map((item) => (
                    <button
                      key={item.q}
                      onClick={() => askQuestion(item.q)}
                      className="cursor-pointer rounded-lg border border-zinc-800 px-3 py-2.5 text-left text-[13px] leading-tight text-zinc-300 transition-colors hover:border-cyan-400 hover:text-cyan-400"
                    >
                      {item.q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col px-6.5 py-6">
                <div
                  ref={chatScrollRef}
                  className="flex h-[350px] flex-col gap-3.5 overflow-y-auto pr-1"
                >
                  {messages.length === 0 && (
                    <div className="m-auto max-w-[420px] text-center">
                      <div className="mb-3.5 text-[19px] font-bold text-zinc-100">
                        Bonjour 👋 Je suis l&apos;assistant IA d&apos;Alex.
                      </div>
                      <div className="text-sm leading-relaxed text-zinc-500">
                        Je peux vous parler de son parcours, de ses compétences,
                        de ses projets, ou de la façon dont j&apos;ai moi-même été
                        construit.
                      </div>
                    </div>
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={cn(
                        "max-w-[80%]",
                        msg.role === "user" ? "self-end" : "self-start"
                      )}
                    >
                      <div
                        className={cn(
                          "rounded-lg px-3.5 py-2.5 text-[13.5px] leading-normal",
                          msg.role === "user"
                            ? "rounded-br-sm bg-cyan-400 font-semibold text-[#052027]"
                            : "rounded-bl-sm border border-zinc-700 bg-zinc-800 text-zinc-300"
                        )}
                      >
                        {messageText(msg.parts)}
                      </div>
                    </div>
                  ))}
                  {chatTyping && (
                    <div className="max-w-[80%] self-start">
                      <div className="rounded-lg border border-zinc-700 bg-zinc-800 px-3.5 py-2.5 font-mono text-[12.5px] text-zinc-400">
                        l&apos;assistant écrit…
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="max-w-[80%] self-start">
                      <div className="rounded-lg border border-red-900/50 bg-red-950/40 px-3.5 py-2.5 text-[13px] text-red-300">
                        Impossible de joindre le modèle — vérifiez que le
                        serveur est bien démarré et réessayez.
                      </div>
                    </div>
                  )}
                </div>
                <form
                  onSubmit={sendChatMessage}
                  className="mt-3.5 flex gap-2 border-t border-zinc-800 pt-3.5"
                >
                  <Input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Écrire un message…"
                    className="h-auto flex-1 rounded-md border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-[13.5px] text-zinc-200"
                  />
                  <button
                    type="submit"
                    aria-label="Envoyer"
                    className="cursor-pointer flex size-9.5 shrink-0 items-center justify-center rounded-md bg-cyan-400 text-[#052027] transition-colors hover:bg-cyan-300"
                  >
                    <SendIcon className="size-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </Reveal>
    </section>
  );
}
