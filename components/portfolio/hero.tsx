"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { roles } from "@/lib/data";
import { Reveal } from "@/components/portfolio/reveal";
import { GithubIcon, LinkedinIcon, MailIcon } from "@/components/portfolio/social-icons";

function useTypedRole() {
  const [text, setText] = useState("");
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  const pauseUntil = useRef<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const full = roles[roleIdx.current];
      if (!deleting.current) {
        charIdx.current++;
        setText(full.slice(0, charIdx.current));
        if (charIdx.current === full.length) {
          deleting.current = true;
          pauseUntil.current = Date.now() + 1400;
        }
      } else {
        if (pauseUntil.current && Date.now() < pauseUntil.current) return;
        pauseUntil.current = null;
        charIdx.current--;
        setText(full.slice(0, charIdx.current));
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
    }, 65);
    return () => clearInterval(interval);
  }, []);

  return text;
}

export function Hero() {
  const typed = useTypedRole();

  return (
    <section
      id="hero"
      className="relative mx-auto grid min-h-[calc(100vh-86px)] max-w-6xl grid-cols-1 items-center gap-10 px-8 py-8 md:grid-cols-[1.1fr_0.9fr]"
    >
      <Reveal>
        <div className="mb-5 inline-block rounded-md border border-cyan-400/25 bg-cyan-400/10 px-3 py-1.5 font-mono text-[13px] text-cyan-300">
          Bonjour, je suis
        </div>
        <h1 className="mb-5.5 text-5xl leading-[1.05] font-extrabold tracking-tight md:text-6xl">
          Alex{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-amber-400 bg-clip-text text-transparent">
            Commeau
          </span>
        </h1>
        <div className="mb-6 h-[30px] font-mono text-xl text-teal-400 md:text-[22px]">
          <span>{typed}</span>
          <span className="animate-[blink_1s_step-start_infinite]">|</span>
        </div>
        <p className="mb-8 max-w-[520px] text-[16.5px] leading-relaxed text-zinc-400">
          Je conçois des applications web et j&apos;explore les technologies
          d&apos;IA générative pour créer des outils utiles, du backend à
          l&apos;interface utilisateur. J&apos;aime transformer un problème
          complexe en un système simple, fiable et agréable à utiliser.
        </p>
        <div className="mb-7 flex gap-2.5">
          <a
            href="#"
            aria-label="GitHub"
            className="flex size-9.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <GithubIcon className="size-4.25" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="flex size-9.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <LinkedinIcon className="size-4.25" />
          </a>
          <a
            href="mailto:alex.commeau@example.com"
            aria-label="Email"
            className="flex size-9.5 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 transition-colors hover:border-cyan-400 hover:text-cyan-400"
          >
            <MailIcon className="size-4.25" />
          </a>
        </div>
        <div className="flex gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-cyan-400 px-5.5 py-2.75 text-[14.5px] font-semibold text-[#052027] shadow-sm transition-colors hover:bg-cyan-300"
          >
            Voir mes projets
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-md border border-zinc-800 px-5.5 py-2.75 text-[14.5px] font-semibold text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-900"
          >
            CV
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 19h16" />
            </svg>
          </a>
        </div>
      </Reveal>

      <Reveal className="relative w-full max-w-[340px] justify-self-center">
        <div className="aspect-[17/20] w-full overflow-hidden rounded-[10px] border border-zinc-800 shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          <Image
            src="/images/hero.webp"
            alt="Photo de profil d'Alex Commeau"
            width={340}
            height={400}
            sizes="(max-width: 403px) calc(100vw - 4rem), 340px"
            className="h-full w-full object-cover"
            preload
          />
        </div>
        <div className="absolute right-2 -bottom-4 flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.25 shadow-[0_4px_16px_rgba(0,0,0,0.4)] sm:-right-5">
          <span className="size-1.75 rounded-full bg-emerald-400" />
          <span className="text-[12.5px] font-semibold">Disponible</span>
        </div>
      </Reveal>

      <Link
        href="#about"
        aria-label="Défiler vers le bas"
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-zinc-600 transition-colors hover:text-cyan-400"
      >
        <span className="font-mono text-[10.5px] tracking-wider uppercase">
          Scroll
        </span>
        <svg
          className="size-4.5 animate-[bounce-down_1.8s_ease-in-out_infinite]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </Link>
    </section>
  );
}
