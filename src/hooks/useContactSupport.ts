import { useRef, useState } from "react";
import { Animated, Dimensions } from "react-native";

import {
  callPhoneNumber,
  copyPhoneNumber,
  DEFAULT_SUPPORT_PHONE,
  openWhatsAppWithPhone,
} from "../utils/contactActions";
import { ToastType } from "@/components/common/BottomCallCTA/CallToast";


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type UseContactSupportProps = {
  phoneNumber?: string;
};

export const useContactSupport = ({
  phoneNumber = DEFAULT_SUPPORT_PHONE,
}: UseContactSupportProps = {}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<ToastType>("success");

  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const toastAnim = useRef(new Animated.Value(0)).current;

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

  const openContactModal = () => {
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

  const closeContactModal = () => {
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
      await callPhoneNumber(phoneNumber);
      closeContactModal();
      showToast("Calling support...", "info");
    } catch {
      showToast("Unable to make call", "error");
    }
  };

  const handleWhatsApp = async () => {
    try {
      await openWhatsAppWithPhone(phoneNumber);
      closeContactModal();
      showToast("Opening WhatsApp...", "info");
    } catch {
      showToast("WhatsApp is not installed", "error");
    }
  };

  const handleCopy = async () => {
    await copyPhoneNumber(phoneNumber);
    closeContactModal();
    showToast(`✓ ${phoneNumber} copied to clipboard!`, "success");
  };

  return {
    phoneNumber,

    modalVisible,
    toastVisible,
    toastMessage,
    toastType,

    slideAnim,
    fadeAnim,
    toastAnim,

    openContactModal,
    closeContactModal,
    handleCall,
    handleWhatsApp,
    handleCopy,
  };
};