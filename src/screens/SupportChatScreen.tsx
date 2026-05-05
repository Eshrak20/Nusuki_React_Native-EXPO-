import { useEffect, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Send } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChatMessage,
  createSupportChatIfNeeded,
  listenSupportMessages,
  sendSupportMessage,
} from "../features/chat/services/chatService";

const CURRENT_USER = {
  id: "user_1",
  name: "Demo User",
  email: "demo@gmail.com",
};

const SupportChatScreen = () => {
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    let unsubscribe: undefined | (() => void);

    const prepareChat = async () => {
      const id = await createSupportChatIfNeeded({
        userId: CURRENT_USER.id,
        userName: CURRENT_USER.name,
        userEmail: CURRENT_USER.email,
      });

      setChatId(id);

      unsubscribe = listenSupportMessages(id, setMessages);
    };

    prepareChat();

    return () => {
      unsubscribe?.();
    };
  }, []);

  const handleSend = async () => {
    if (!chatId || !message.trim()) return;

    const text = message;
    setMessage("");

    await sendSupportMessage({
      chatId,
      text,
      senderId: CURRENT_USER.id,
      senderType: "user",
    });
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    const isMine = item.senderType === "user";

    return (
      <View
        className={`mb-2 max-w-[80%] rounded-2xl px-4 py-2 ${
          isMine
            ? "self-end rounded-br-sm bg-primary"
            : "self-start rounded-bl-sm bg-slate-200"
        }`}
      >
        <Text
          className={`text-sm leading-5 ${
            isMine ? "text-white" : "text-slate-800"
          }`}
        >
          {item.text}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-[#ECE5DD]">
      <SafeAreaView edges={["top"]} className="bg-primary">
        <View className="flex-row items-center px-4 py-3">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-white/20">
            <Text className="text-base font-extrabold text-white">N</Text>
          </View>

          <View>
            <Text className="text-base font-extrabold text-white">
              Nusuki Team
            </Text>
            <Text className="text-xs font-medium text-white/70">
              Usually replies soon
            </Text>
          </View>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerClassName="px-3 py-4"
        />

        <View className="flex-row items-end gap-2 border-t border-slate-200 bg-white px-3 py-2">
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Message Nusuki team..."
            placeholderTextColor="#94A3B8"
            multiline
            className="max-h-28 flex-1 rounded-3xl bg-slate-100 px-4 py-3 text-sm text-slate-900"
          />

          <TouchableOpacity
            onPress={handleSend}
            activeOpacity={0.8}
            className="h-12 w-12 items-center justify-center rounded-full bg-primary"
          >
            <Send size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SupportChatScreen;