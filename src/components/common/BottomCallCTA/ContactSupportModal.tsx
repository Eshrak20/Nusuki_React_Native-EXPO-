import React from "react";
import {
  Animated,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

type ContactSupportModalProps = {
  visible: boolean;
  phoneNumber: string;
  fadeAnim: Animated.Value;
  slideAnim: Animated.Value;
  onClose: () => void;
  onCall: () => void;
  onWhatsApp: () => void;
  onCopy: () => void;
};

const ContactSupportModal = ({
  visible,
  phoneNumber,
  fadeAnim,
  slideAnim,
  onClose,
  onCall,
  onWhatsApp,
  onCopy,
}: ContactSupportModalProps) => {
  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
    >
      <Pressable className="flex-1" onPress={onClose}>
        <Animated.View
          className="flex-1 bg-black/50"
          style={{
            opacity: fadeAnim,
          }}
        />
      </Pressable>

      <Animated.View
        className="absolute bottom-0 left-0 right-0"
        style={{
          transform: [{ translateY: slideAnim }],
        }}
      >
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={80}
            tint="light"
            className="overflow-hidden rounded-t-[32px]"
          >
            <ModalContent
              phoneNumber={phoneNumber}
              onCall={onCall}
              onWhatsApp={onWhatsApp}
              onCopy={onCopy}
              onClose={onClose}
            />
          </BlurView>
        ) : (
          <View className="overflow-hidden rounded-t-[32px] bg-white">
            <ModalContent
              phoneNumber={phoneNumber}
              onCall={onCall}
              onWhatsApp={onWhatsApp}
              onCopy={onCopy}
              onClose={onClose}
            />
          </View>
        )}
      </Animated.View>
    </Modal>
  );
};

type ModalContentProps = {
  phoneNumber: string;
  onClose: () => void;
  onCall: () => void;
  onWhatsApp: () => void;
  onCopy: () => void;
};

const ModalContent = ({
  phoneNumber,
  onClose,
  onCall,
  onWhatsApp,
  onCopy,
}: ModalContentProps) => {
  return (
    <View
      className="px-6 pt-6"
      style={{
        paddingBottom: Platform.OS === "ios" ? 34 : 24,
      }}
    >
      <View className="mb-6 h-1 w-10 self-center rounded-full bg-slate-300" />

      <Text className="mb-2 text-center text-xl font-extrabold text-slate-800">
        Contact Support
      </Text>

      <Text className="mb-6 text-center text-sm text-slate-500">
        {phoneNumber}
      </Text>

      <View className="gap-3">
        <TouchableOpacity onPress={onCall} activeOpacity={0.9}>
          <LinearGradient
            colors={["#3b82f6", "#2563eb"] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center gap-3 rounded-2xl py-4"
          >
            <Ionicons name="call-outline" size={22} color="white" />

            <Text className="text-base font-bold text-white">Direct Call</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={onWhatsApp} activeOpacity={0.9}>
          <LinearGradient
            colors={["#25D366", "#128C7E"] as const}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row items-center justify-center gap-3 rounded-2xl py-4"
          >
            <Ionicons name="logo-whatsapp" size={22} color="white" />

            <Text className="text-base font-bold text-white">WhatsApp</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onCopy}
          activeOpacity={0.9}
          className="flex-row items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-100 py-4"
        >
          <Ionicons name="copy-outline" size={22} color="#475569" />

          <Text className="text-base font-bold text-slate-600">
            Copy Number
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onClose}
          activeOpacity={0.7}
          className="mt-2 py-3"
        >
          <Text className="text-center font-semibold text-slate-400">
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactSupportModal;