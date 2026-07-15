import type { ComponentType } from "react";
import { RagAutoHebergeContent } from "@/components/blog/articles/rag-auto-heberge";

type ArticleEntry = {
  Content: ComponentType;
  tags: string[];
};

export const articleRegistry: Record<string, ArticleEntry> = {
  "rag-auto-heberge": {
    Content: RagAutoHebergeContent,
    tags: ["RAG", "Auto-hébergement", "LLM", "Homelab"],
  },
};
