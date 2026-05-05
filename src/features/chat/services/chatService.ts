
//? Ei file ta basically 3 ta kaj kortese:

//TODO User er jonno support chat create kore
//* Message send kore Firestore e save kore
//! Message list live listen kore UI te show korar jonno data dey



import {
  addDoc,
  collection,
  doc,
  getDoc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../config/firebase";

export type ChatMessage = {
  id: string;
  text: string;
  senderId: string;
  senderType: "user" | "admin";
  createdAt: any;
  seen: boolean;
};

type CreateSupportChatParams = {
  userId: string;
  userName: string;
  userEmail: string;
};

export const getSupportChatId = (userId: string) => {
  return `support_${userId}`;
};

export const createSupportChatIfNeeded = async ({
  userId,
  userName,
  userEmail,
}: CreateSupportChatParams) => {
  const chatId = getSupportChatId(userId);
  const chatRef = doc(db, "chats", chatId);
  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {
    await setDoc(chatRef, {
      userId,
      userName,
      userEmail,
      status: "open",
      lastMessage: "",
      lastMessageAt: serverTimestamp(),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return chatId;
};

export const sendSupportMessage = async ({
  chatId,
  text,
  senderId,
  senderType,
}: {
  chatId: string;
  text: string;
  senderId: string;
  senderType: "user" | "admin";
}) => {
  const cleanText = text.trim();

  if (!cleanText) return;

  const messagesRef = collection(db, "chats", chatId, "messages");

  await addDoc(messagesRef, {
    text: cleanText,
    senderId,
    senderType,
    seen: false,
    createdAt: serverTimestamp(),
  });

  await updateDoc(doc(db, "chats", chatId), {
    lastMessage: cleanText,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const listenSupportMessages = (
  chatId: string,
  callback: (messages: ChatMessage[]) => void
) => {
  const messagesRef = collection(db, "chats", chatId, "messages");

  const q = query(messagesRef, orderBy("createdAt", "asc"), limit(100));

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map((item) => ({
      id: item.id,
      ...item.data(),
    })) as ChatMessage[];

    callback(messages);
  });
};