"use client";

import { createContext, useContext, useState } from "react";

type AboutTab = "profile" | "chat";

type AboutTabContextValue = {
  aboutTab: AboutTab;
  setAboutTab: (tab: AboutTab) => void;
};

const AboutTabContext = createContext<AboutTabContextValue | null>(null);

export function AboutTabProvider({ children }: { children: React.ReactNode }) {
  const [aboutTab, setAboutTab] = useState<AboutTab>("chat");
  return (
    <AboutTabContext.Provider value={{ aboutTab, setAboutTab }}>
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
