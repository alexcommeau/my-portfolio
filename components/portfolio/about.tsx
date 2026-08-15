"use client";

import { useEffect, useRef, useState } from "react";
import {
  Check,
  CircleQuestionMark,
  Copy,
  MessageSquareWarning,
  TriangleAlert,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { scrollToSection } from "@/components/portfolio/section-link";
import { useAboutTabContext } from "@/components/portfolio/ui-context";
import { Input } from "@/components/ui/input";
import { SectionReveal } from "@/components/ui/section-reveal";
import {
  CHAT_QUESTION_MAX_LENGTH,
  chatErrorResponseSchema,
  chatRequestSchema,
} from "@/lib/chat-schema";
import { ChatStreamError, readChatStream } from "@/lib/chat-stream";
import { aboutCards, bio, chatQA } from "@/lib/data";
import { cn } from "@/lib/utils";
import styles from "./about.module.css";

type ChatMessage = {
  id: number;
  role: "user" | "assistant";
  content: string;
  answered?: boolean;
  responseId?: string;
};

function GpuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="2" y="14" width="4" height="8" />
      <rect x="10" y="9" width="4" height="13" />
      <rect x="18" y="4" width="4" height="18" />
    </svg>
  );
}

export function About() {
  const { aboutTab, setAboutTab, reportChatAnswer } = useAboutTabContext();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [copiedResponseId, setCopiedResponseId] = useState<string | null>(null);
  const [chatStatus, setChatStatus] = useState<
    "idle" | "waiting" | "streaming"
  >("idle");
  const [chatError, setChatError] = useState<string | null>(null);
  const messageSequence = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const copyFeedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const chatTyping = chatStatus !== "idle";

  /** Maintient le dernier message visible sans gérer la conversation côté API. */
  useEffect(() => {
    if (aboutTab !== "chat") return;
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [aboutTab, messages, chatStatus]);

  /** Annule aussi l'appel Nest.js et le LLM si le composant disparaît. */
  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
      if (copyFeedbackTimerRef.current) {
        clearTimeout(copyFeedbackTimerRef.current);
      }
    };
  }, []);

  const copyAnswer = async (message: ChatMessage) => {
    if (!message.responseId) return;

    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedResponseId(message.responseId);
      if (copyFeedbackTimerRef.current) {
        clearTimeout(copyFeedbackTimerRef.current);
      }
      copyFeedbackTimerRef.current = setTimeout(
        () => setCopiedResponseId(null),
        2000,
      );
    } catch {
      setChatError("La réponse n’a pas pu être copiée.");
    }
  };

  const reportAnswer = (questionId: string) => {
    reportChatAnswer(questionId);
    scrollToSection("contact", Boolean(shouldReduceMotion));
  };

  /** Envoie une question indépendante et conserve uniquement l’historique visuel. */
  const askQuestion = async (rawQuestion: string) => {
    if (chatTyping) return;

    const parsedQuestion = chatRequestSchema.safeParse({ question: rawQuestion });
    if (!parsedQuestion.success) {
      setChatError(
        parsedQuestion.error.issues[0]?.message ??
          "Écrivez une question entre 3 et 500 caractères.",
      );
      return;
    }

    const question = parsedQuestion.data.question;
    const userMessage: ChatMessage = {
      id: ++messageSequence.current,
      role: "user",
      content: question,
    };

    setMessages((current) => [...current, userMessage]);
    setChatInput("");
    setChatError(null);
    setChatStatus("waiting");

    const abortController = new AbortController();
    const assistantMessageId = ++messageSequence.current;
    let assistantMessageAdded = false;
    activeRequestRef.current = abortController;

    try {
      const response = await fetch("/api/chat/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const body: unknown = await response.json().catch(() => null);
        const parsedError = chatErrorResponseSchema.safeParse(body);
        setChatError(
          parsedError.success
            ? parsedError.data.error
            : "L’assistant n’a pas pu répondre. Réessayez dans un instant.",
        );
        return;
      }

      const completed = await readChatStream(response, (token) => {
        if (!assistantMessageAdded) {
          assistantMessageAdded = true;
          setChatStatus("streaming");
          setMessages((current) => [
            ...current,
            {
              id: assistantMessageId,
              role: "assistant",
              content: token,
            },
          ]);
          return;
        }

        setMessages((current) =>
          current.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: message.content + token }
              : message,
          ),
        );
      });

      setMessages((current) => {
        const finalMessage: ChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          content: completed.answer,
          answered: completed.answered,
          responseId: completed.id,
        };

        return assistantMessageAdded
          ? current.map((message) =>
              message.id === assistantMessageId ? finalMessage : message,
            )
          : [...current, finalMessage];
      });
    } catch (error) {
      if (abortController.signal.aborted) return;

      if (assistantMessageAdded) {
        setMessages((current) =>
          current.filter((message) => message.id !== assistantMessageId),
        );
      }
      setChatError(
        error instanceof ChatStreamError
          ? error.message
          : "Connexion impossible. Vérifiez votre réseau et réessayez.",
      );
    } finally {
      if (activeRequestRef.current === abortController) {
        activeRequestRef.current = null;
      }
      setChatStatus("idle");
    }
  };

  /** Valide le formulaire avant de transmettre sa question au même flux. */
  const sendChatMessage = (event: React.FormEvent) => {
    event.preventDefault();
    void askQuestion(chatInput);
  };

  return (
    <section
      id="about"
      className="relative border-t border-zinc-900 bg-white/[1.5%]"
    >
      <SectionReveal className="mx-auto max-w-6xl px-8 py-24">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-4xl font-extrabold tracking-tight">
            À propos{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
              de moi
            </span>
          </h2>
          <p className="mb-7 text-[15.5px] text-zinc-400">
            Quelques mots sur ce qui m&apos;anime, du développement à l&apos;IA, en
            passant par mes passions créatives.
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
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-[1.1fr_1fr]">
            <div className="h-full rounded-[10px] border border-zinc-800 bg-zinc-900 p-8 pb-10">
              <h3 className="mb-6 text-xl font-bold text-cyan-400">Qui suis-je ?</h3>
              {bio.map((paragraph, i) => (
                <p
                  key={paragraph}
                  className={cn("text-[15px] leading-[1.85] text-zinc-400", i > 0 && "mt-5")}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2">
              {aboutCards.map((card) => (
                <div
                  key={card.title}
                  className="min-h-[200px] rounded-[10px] border border-zinc-800 bg-zinc-900 p-6"
                >
                  <div className="mb-3 flex size-9.5 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-400/10 font-mono text-[15px] font-bold text-cyan-400">
                    {card.glyph}
                  </div>
                  <div className="mb-1.5 text-[16px] font-bold">{card.title}</div>
                  <div className="text-[15px] leading-relaxed text-zinc-400">
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
                  Réponses construites depuis les connaissances du portfolio
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 rounded-full border border-zinc-800 px-3.5 py-1.5 text-[12.5px] text-zinc-300">
                  <GpuIcon className="size-3.5" />
                  Mode léger
                </div>
                <span className="group relative inline-flex text-zinc-600">
                  <CircleQuestionMark className="size-5" aria-hidden="true" />
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
                <span
                  aria-disabled="true"
                  title="Architecture bientôt disponible"
                  className="inline-flex cursor-default items-center gap-1 text-[12.5px] font-semibold text-zinc-600"
                >
                  Voir l&apos;architecture →
                </span>
              </div>
            </div>
            <div
              role="note"
              className="flex gap-2.5 border-b border-amber-400/15 bg-amber-400/[0.04] px-5.5 py-3 text-[12.5px] leading-relaxed text-zinc-400"
            >
              <TriangleAlert
                className="mt-0.5 size-4 shrink-0 text-amber-300"
                aria-hidden="true"
              />
              <p>
                Cet assistant est expérimental : ses réponses peuvent contenir des
                erreurs ou des imprécisions. Si vous avez un doute sur une réponse,
                vérifiez l’information auprès d’une source fiable (cv, linkedin) ou contactez-moi. J’améliore continuellement ce
                chat grâce à vos retours.
              </p>
            </div>
            <div className="grid grid-cols-1 overflow-hidden rounded-b-[10px] bg-zinc-900 md:grid-cols-[250px_1fr]">
              <div className="border-b border-zinc-800 px-4 py-5 md:border-r md:border-b-0">
                <div className="mb-3 px-1 font-mono text-[11px] tracking-wide text-zinc-600 uppercase">
                  Questions suggérées
                </div>
                <div className="flex flex-col gap-1.5">
                  {chatQA.map(({ q }) => (
                    <button
                      key={q}
                      type="button"
                      disabled={chatTyping}
                      onClick={() => void askQuestion(q)}
                      className="cursor-pointer rounded-lg border border-zinc-800 px-3 py-2.5 text-left text-[13px] leading-tight text-zinc-400 transition-colors hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex h-[438px] min-w-0 flex-col">
                <div
                  role="log"
                  aria-live="polite"
                  aria-label="Conversation avec l’assistant"
                  className={cn(
                    styles.chatScrollbar,
                    "min-h-0 flex-1 space-y-4 overflow-y-auto px-6.5 py-6",
                  )}
                >
                  {messages.length === 0 ? (
                    <div className="m-auto flex min-h-[290px] max-w-[470px] flex-col items-center justify-center text-center">
                      <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-cyan-400/30 bg-cyan-400/10 text-xl text-cyan-300">
                        ✦
                      </div>
                      <div className="mb-3 text-[19px] font-bold text-zinc-100">
                        Que souhaitez-vous savoir ?
                      </div>
                      <div className="text-sm leading-relaxed text-zinc-400">
                        Posez une question sur mon parcours, mes compétences ou mes
                        projets. Chaque question est traitée indépendamment à partir
                        de ma base de connaissances.
                      </div>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex",
                          message.role === "user" ? "justify-end" : "justify-start",
                        )}
                      >
                        <div className="flex max-w-[88%] min-w-0 flex-col items-start gap-1.5">
                          <div
                            className={cn(
                              "w-full whitespace-pre-wrap rounded-xl px-4 py-3 text-sm leading-relaxed",
                              message.role === "user"
                                ? "bg-cyan-400 text-[#052027]"
                                : message.answered === false
                                  ? "border border-amber-400/20 bg-amber-400/5 text-zinc-300"
                                  : "border border-zinc-800 bg-zinc-950 text-zinc-300",
                            )}
                          >
                            {message.content}
                          </div>

                          {message.role === "assistant" && message.responseId ? (
                            <div
                              className="flex items-center gap-1 pl-1 text-zinc-500"
                              aria-label="Actions sur la réponse"
                            >
                              <button
                                type="button"
                                onClick={() => void copyAnswer(message)}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                                aria-label="Copier la réponse"
                              >
                                {copiedResponseId === message.responseId ? (
                                  <Check
                                    className="size-3.5 text-teal-400"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <Copy className="size-3.5" aria-hidden="true" />
                                )}
                                {copiedResponseId === message.responseId
                                  ? "Copié"
                                  : "Copier"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (message.responseId) {
                                    reportAnswer(message.responseId);
                                  }
                                }}
                                className="inline-flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[11.5px] transition-colors hover:bg-zinc-800 hover:text-zinc-300"
                                aria-label="Signaler une erreur dans cette réponse"
                              >
                                <MessageSquareWarning
                                  className="size-3.5"
                                  aria-hidden="true"
                                />
                                Signaler une erreur
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    ))
                  )}

                  {chatStatus === "waiting" ? (
                    <div className="flex justify-start" role="status">
                      <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-500">
                        Recherche et génération en cours…
                      </div>
                    </div>
                  ) : null}

                  {chatError ? (
                    <p
                      role="alert"
                      className="rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3 text-[13px] text-red-300"
                    >
                      {chatError}
                    </p>
                  ) : null}

                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={sendChatMessage}
                  className="flex gap-2 border-t border-zinc-800 px-4 py-4 sm:px-6.5"
                >
                  <label htmlFor="portfolio-chat-question" className="sr-only">
                    Votre question
                  </label>
                  <Input
                    id="portfolio-chat-question"
                    name="question"
                    value={chatInput}
                    onChange={(event) => {
                      setChatInput(event.target.value);
                      if (chatError) setChatError(null);
                    }}
                    maxLength={CHAT_QUESTION_MAX_LENGTH}
                    autoComplete="off"
                    disabled={chatTyping}
                    placeholder="Posez votre question…"
                    className="min-w-0 flex-1 border-zinc-800 bg-zinc-950 text-zinc-200 placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    disabled={chatTyping || chatInput.trim().length === 0}
                    className="cursor-pointer rounded-md bg-cyan-400 px-4 text-[13.5px] font-bold text-[#052027] transition-colors hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-cyan-400"
                  >
                    Envoyer
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}
