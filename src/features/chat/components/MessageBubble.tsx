import { CheckCheck } from "lucide-react-native";
import { Text, View } from "react-native";
import type { ChatMessage } from "../services/chatService";

type MessageBubbleProps = {
  item: ChatMessage;
};

const PRIMARY_COLOR = "#13275F";

const MessageBubble = ({ item }: MessageBubbleProps) => {
  const isMine = item.senderType === "user";

  return (
    <View
      className={`mb-2 max-w-[82%] rounded-2xl px-3 py-2 ${
        isMine
          ? "self-end rounded-br-sm"
          : "self-start rounded-bl-sm bg-white"
      }`}
      style={isMine ? { backgroundColor: PRIMARY_COLOR } : undefined}
    >
      <Text
        className={`text-[14px] leading-5 ${
          isMine ? "text-white" : "text-slate-800"
        }`}
      >
        {item.text}
      </Text>

      <View className="mt-1 flex-row items-center justify-end">
        <Text
          className={`mr-1 text-[10px] ${
            isMine ? "text-white/70" : "text-slate-400"
          }`}
        >
          now
        </Text>

        {isMine ? <CheckCheck size={14} color="rgba(255,255,255,0.75)" /> : null}
      </View>
    </View>
  );
};

export default MessageBubble;