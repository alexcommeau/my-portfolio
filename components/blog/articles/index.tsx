import type { ComponentType } from "react";
import { RagAutoHebergeContent } from "@/components/blog/articles/rag-auto-heberge";
import { HomelabDockerComposeContent } from "@/components/blog/articles/homelab-docker-compose";
import { NextAppRouterWorkflowContent } from "@/components/blog/articles/next-app-router-workflow";
import { PromptEngineeringPatternsContent } from "@/components/blog/articles/prompt-engineering-patterns";

type ArticleEntry = {
  Content: ComponentType;
  tags: string[];
};

export const articleRegistry: Record<string, ArticleEntry> = {
  "rag-auto-heberge": {
    Content: RagAutoHebergeContent,
    tags: ["RAG", "Auto-hébergement", "LLM", "Homelab"],
  },
  "homelab-docker-compose": {
    Content: HomelabDockerComposeContent,
    tags: ["Docker", "Homelab", "Auto-hébergement", "DevOps"],
  },
  "next-app-router-workflow": {
    Content: NextAppRouterWorkflowContent,
    tags: ["Next.js", "React", "Server Components", "Web"],
  },
  "prompt-engineering-patterns": {
    Content: PromptEngineeringPatternsContent,
    tags: ["Prompt Engineering", "LLM", "IA", "Fiabilité"],
  },
};
