import { View, Text, Pressable } from "react-native";
import { User, LogIn } from "lucide-react-native";

const AppHeader = () => {
  return (
    <View className="flex-row items-center justify-between bg-white rounded-2xl border border-primary-light/30 px-4 py-3 mx-2 mt-2 shadow-sm">
      
      {/* Left: Profile */}
      <Pressable className="flex-row items-center bg-primary-light/20 px-3 py-2 rounded-xl">
        <User size={16} color="#13275F" />
        <Text className="ml-2 text-primary font-semibold text-sm">
          Eshrak
        </Text>
      </Pressable>

      {/* Center: Title */}
      <View className="items-center">
        <Text className="text-xs text-gray-400 uppercase tracking-widest">
          Welcome to
        </Text>
        <Text className="text-primary font-bold text-base">
          NusukiApp
        </Text>
      </View>

      {/* Right: Login */}
      <Pressable className="flex-row items-center bg-primary px-4 py-2 rounded-xl">
        <Text className="text-white font-semibold text-sm mr-1">
          Login
        </Text>
        <LogIn size={14} color="white" />
      </Pressable>

    </View>
  );
};

export default AppHeader;