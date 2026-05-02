import "../../global.css";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { View } from "react-native";
import { Slot } from "expo-router";
import BottomTabs from "../components/BottomTabs";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <View className="flex-1 bg-white">
        <Slot />

        {/* <BottomTabs /> */}
      </View>
    </Provider>
  );
}
