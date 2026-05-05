import { X } from "lucide-react-native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type EmojiPanelProps = {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
};

const EMOJI_LIST = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "🥹",
  "😅",
  "😂",
  "🤣",
  "🥲",
  "☺️",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🥳",
  "🤩",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "👍",
  "👎",
  "👌",
  "✌️",
  "🤞",
  "🤟",
  "🤘",
  "🤙",
  "👋",
  "👏",
  "🙌",
  "🙏",
  "🤝",
  "💪",
  "❤️",
  "🧡",
  "💛",
  "💚",
  "💙",
  "💜",
  "🖤",
  "🤍",
  "🔥",
  "✨",
  "🎉",
  "✅",
  "❌",
  "⭐",
];

const EmojiPanel = ({ onSelectEmoji, onClose }: EmojiPanelProps) => {
  return (
    <View className="h-[320px] border-t border-slate-200 bg-white">
      <View className="items-center pt-2">
        <View className="h-1.5 w-14 rounded-full bg-slate-300" />
      </View>

      <View className="flex-row items-center justify-between px-4 py-3">
        <Text className="text-base font-extrabold text-slate-700">Emojis</Text>

        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.75}
          className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
        >
          <X size={20} color="#64748B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="px-3 pb-5"
      >
        <View className="flex-row flex-wrap">
          {EMOJI_LIST.map((emoji, index) => (
            <TouchableOpacity
              key={`${emoji}-${index}`}
              onPress={() => onSelectEmoji(emoji)}
              activeOpacity={0.65}
              className="h-12 w-[12.5%] items-center justify-center rounded-full"
            >
              <Text className="text-[29px]">{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default EmojiPanel;