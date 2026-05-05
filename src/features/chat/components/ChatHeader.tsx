import { ArrowLeft, MoreVertical } from "lucide-react-native";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ChatHeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onCloseChat?: () => void;
};

const PRIMARY_COLOR = "#13275F";

const ChatHeader = ({
  title = "Nusuki Team",
  subtitle = "Usually replies soon",
  onBack,
  onCloseChat,
}: ChatHeaderProps) => {
  const handleOpenMenu = () => {
    Alert.alert(
      "Close chat?",
      "Do you want to close this chat and go back to home?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Close chat",
          style: "destructive",
          onPress: onCloseChat,
        },
      ]
    );
  };

  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: PRIMARY_COLOR }}>
      <View className="flex-row items-center px-4 py-3">
        {onBack ? (
          <TouchableOpacity
            onPress={onBack}
            activeOpacity={0.75}
            className="mr-3 h-10 w-10 items-center justify-center rounded-full"
          >
            <ArrowLeft size={23} color="#FFFFFF" />
          </TouchableOpacity>
        ) : null}

        <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-white/20">
          <Text className="text-base font-extrabold text-white">N</Text>
        </View>

        <View className="flex-1">
          <Text className="text-base font-extrabold text-white">{title}</Text>
          <Text className="mt-0.5 text-xs font-medium text-white/75">
            {subtitle}
          </Text>
        </View>

        <TouchableOpacity
          onPress={handleOpenMenu}
          activeOpacity={0.75}
          className="h-10 w-10 items-center justify-center rounded-full"
        >
          <MoreVertical size={22} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatHeader;