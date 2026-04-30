import "../../global.css";

import { View } from "react-native";
import { Slot } from "expo-router";
import BottomTabs from "../components/BottomTabs";

export default function RootLayout() {
  return (
    <View className="flex-1 bg-white">
      <Slot />

      <BottomTabs />
    </View>
  );
}