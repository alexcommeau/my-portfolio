"use client";

import { createContext, useContext, useState } from "react";

type AboutTab = "profile" | "chat";

type AboutTabContextValue = {
  aboutTab: AboutTab;
  setAboutTab: (tab: AboutTab) => void;
  chatReport: { questionId: string; sequence: number } | null;
  reportChatAnswer: (questionId: string) => void;
};

const AboutTabContext = createContext<AboutTabContextValue | null>(null);

export function AboutTabProvider({ children }: { children: React.ReactNode }) {
  const [aboutTab, setAboutTab] = useState<AboutTab>("chat");
  const [chatReport, setChatReport] = useState<{
    questionId: string;
    sequence: number;
  } | null>(null);

  const reportChatAnswer = (questionId: string) => {
    setChatReport((current) => ({
      questionId,
      sequence: (current?.sequence ?? 0) + 1,
    }));
  };

  return (
    <AboutTabContext.Provider
      value={{ aboutTab, setAboutTab, chatReport, reportChatAnswer }}
    >
      {children}
    </AboutTabContext.Provider>
  );
}

export function useAboutTabContext() {
  const ctx = useContext(AboutTabContext);
  if (!ctx) {
    throw new Error("useAboutTabContext must be used within an AboutTabProvider");
  }
  return ctx;
}
