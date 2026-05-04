import React from "react";
import { Animated, ColorValue, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export type ToastType = "success" | "error" | "info";

type CallToastProps = {
  visible: boolean;
  message: string;
  type: ToastType;
  toastAnim: Animated.Value;
};

const CallToast = ({ visible, message, type, toastAnim }: CallToastProps) => {
  if (!visible) return null;

  const getToastColors = (): [ColorValue, ColorValue, ...ColorValue[]] => {
    switch (type) {
      case "success":
        return ["#4ade80", "#22c55e"];
      case "error":
        return ["#f87171", "#ef4444"];
      case "info":
        return ["#60a5fa", "#3b82f6"];
      default:
        return ["#60a5fa", "#3b82f6"];
    }
  };

  const getToastIcon = (): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "alert-circle";
      case "info":
        return "information-circle";
      default:
        return "information-circle";
    }
  };

  return (
    <Animated.View
      className="absolute left-5 right-5 z-[1000]"
      style={{
        bottom: 100,
        transform: [
          {
            translateY: toastAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [100, 0],
            }),
          },
        ],
      }}
    >
      <LinearGradient
        colors={getToastColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        className="flex-row items-center gap-3 rounded-2xl p-4 shadow-md"
      >
        <Ionicons name={getToastIcon()} size={24} color="white" />

        <Text className="flex-1 text-sm font-semibold text-white">
          {message}
        </Text>
      </LinearGradient>
    </Animated.View>
  );
};

export default CallToast;