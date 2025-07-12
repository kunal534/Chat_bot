import { RAGChat, mistralai } from "@upstash/rag-chat";
import { redis } from "./redis";

export const ragChat = new RAGChat({
  model: mistralai("mistral-small"),
  redis,
});
