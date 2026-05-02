import { View, Text } from "react-native";
import LottieView from "lottie-react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <LottieView
        source={require("../../assets/lottie/telegram icon.json")}
        autoPlay
        loop
        style={{
          width: 220,
          height: 220,
        }}
      />

      <Text className="mt-4 text-lg font-semibold text-gray-800">
        Loading...
      </Text>
    </View>
  );
}