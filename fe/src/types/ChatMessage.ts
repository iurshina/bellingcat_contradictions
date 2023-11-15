import { UserType } from "./UserProfile";

export type ChatMessageRole = UserType.USER | UserType.SYSTEM;

export interface ChatMessage {
  content: string;
  role: ChatMessageRole;
  userId: string;
  sentAt: string;
}

export function buildChatMessage(content: string, role: ChatMessageRole): ChatMessage {
  // TODO user
  return { sentAt: `${Date.now()}`, content, role, userId: "0" };
}
