import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import CallToast, { ToastType } from "./CallToast";
import ContactSupportModal from "./ContactSupportModal";

type BottomCallCTAProps = {
  label?: string;
  amount?: string | number | null;
  buttonText?: string;
  phoneNumber?: string;
  currencySymbol?: string;
  theme?: "light" | "dark";
};

const DEFAULT_SUPPORT_PHONE =
  process.env.EXPO_PUBLIC_SUPPORT_PHONE || "09600000000";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const BottomCallCTA = ({
  label = "Starting from",
  amount,
  buttonText = "Call Now",
  phoneNumber = DEFAULT_SUPPORT_PHONE,
  currencySymbol = "৳",
  theme = "light",
}: BottomCallCTAProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;

  const formattedAmount =
    amount !== undefined && amount !== null && amount !== ""
      ? Number(amount).toLocaleString("en-BD")
      : null;

  const showToast = (message: string, type: ToastType = "success") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);

    Animated.sequence([
      Animated.spring(toastAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.delay(2000),
      Animated.timing(toastAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => setToastVisible(false));
  };

  const openModal = () => {
    setModalVisible(true);

    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: SCREEN_HEIGHT,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => setModalVisible(false));
  };

  const handleCall = async () => {
    try {
      await Linking.openURL(`tel:${phoneNumber}`);
      closeModal();
      showToast("Calling support...", "info");
    } catch {
      showToast("Unable to make call", "error");
    }
  };

  const handleWhatsApp = async () => {
    const cleanNumber = phoneNumber.replace(/\D/g, "");

    try {
      await Linking.openURL(`whatsapp://send?phone=${cleanNumber}`);
      closeModal();
      showToast("Opening WhatsApp...", "info");
    } catch {
      showToast("WhatsApp is not installed", "error");
    }
  };

  const handleCopy = async () => {
    await Clipboard.setStringAsync(phoneNumber);
    closeModal();
    showToast(`✓ ${phoneNumber} copied to clipboard!`, "success");
  };

  return (
    <>
      <CallToast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        toastAnim={toastAnim}
      />

      <LinearGradient
        colors={
          theme === "light"
            ? (["#ffffff", "#f8fafc"] as const)
            : (["#1e293b", "#0f172a"] as const)
        }
        className={`absolute bottom-0 left-0 right-0 border-t px-5 pt-4 shadow-lg ${
          theme === "light" ? "border-slate-200" : "border-slate-700"
        }`}
        style={{
          paddingBottom: Platform.OS === "ios" ? 34 : 20,
        }}
      >
        <View className="flex-row items-center gap-4 pb-12">
          <View className="flex-1">
            <Text className="mb-1 text-xs font-semibold text-slate-500">
              {label}
            </Text>

            {formattedAmount ? (
              <Text className="text-2xl font-extrabold text-primary">
                {currencySymbol} {formattedAmount}
              </Text>
            ) : (
              <Text className="text-base font-semibold text-slate-500">
                Contact us
              </Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={openModal}
            className="flex-1"
          >
            <LinearGradient
              colors={["#13275F", "#13275F"] as const}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-row items-center justify-center gap-2 rounded-2xl py-4 shadow-md"
            >
              <Ionicons name="call" size={20} color="white" />

              <Text className="text-base font-extrabold text-white">
                {buttonText}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ContactSupportModal
        visible={modalVisible}
        phoneNumber={phoneNumber}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
        onClose={closeModal}
        onCall={handleCall}
        onWhatsApp={handleWhatsApp}
        onCopy={handleCopy}
      />
    </>
  );
};

export default BottomCallCTA;