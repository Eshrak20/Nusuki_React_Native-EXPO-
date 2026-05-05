import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/config/firebase";

type UploadVoiceParams = {
  chatId: string;
  uri: string;
};

export const uploadVoiceMessage = async ({
  chatId,
  uri,
}: UploadVoiceParams) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const fileName = `voice_${Date.now()}.m4a`;
  const storagePath = `support_chats/${chatId}/voice_messages/${fileName}`;

  const voiceRef = ref(storage, storagePath);

  await uploadBytes(voiceRef, blob, {
    contentType: "audio/m4a",
  });

  const downloadURL = await getDownloadURL(voiceRef);

  return {
    fileUrl: downloadURL,
    fileName,
    mimeType: "audio/m4a",
  };
};