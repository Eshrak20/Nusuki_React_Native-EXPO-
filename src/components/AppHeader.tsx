import { View, Text, ImageBackground, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const banner = require("../../assets/banner.png");

const AppHeader = () => {
  return (
    <View
      style={{ width }}
      className="h-72 overflow-hidden rounded-b-[36px] bg-primary"
    >
      <ImageBackground
        source={banner}
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      >
        <LinearGradient
          colors={[
            "rgba(19,39,95,0.45)",
            "rgba(19,39,95,0.35)",
            "rgba(19,39,95,0.85)",
          ]}
          className="flex-1 items-center justify-center px-6"
        >
          <Text className="text-white/80 text-xs uppercase tracking-[5px] mb-3">
            Welcome To
          </Text>

          <Text className="text-white text-5xl font-extrabold text-center">
            NusukiApp
          </Text>

          <Text className="mt-4 text-white/90 text-center text-base leading-6">
            Explore your journey with a smarter travel experience
          </Text>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default AppHeader;