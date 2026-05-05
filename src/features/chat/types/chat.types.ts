export type ChatMessage = {
  id: string;
  text?: string;

  type: "text" | "image" | "file" | "audio";

  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  mimeType?: string;

  senderId: string;
  senderType: "user" | "admin";

  createdAt: any;
  seen: boolean;
};