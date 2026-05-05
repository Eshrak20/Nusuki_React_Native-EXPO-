import { Linking } from "react-native";
import * as Clipboard from "expo-clipboard";

export const DEFAULT_SUPPORT_PHONE =
  process.env.EXPO_PUBLIC_SUPPORT_PHONE || "09600000000";

export const cleanPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.replace(/\D/g, "");
};

export const callPhoneNumber = async (phoneNumber = DEFAULT_SUPPORT_PHONE) => {
  const url = `tel:${phoneNumber}`;

  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error("Unable to make call");
  }

  await Linking.openURL(url);
};

export const openWhatsAppWithPhone = async (
  phoneNumber = DEFAULT_SUPPORT_PHONE,
) => {
  const cleanNumber = cleanPhoneNumber(phoneNumber);
  const url = `whatsapp://send?phone=${cleanNumber}`;

  const canOpen = await Linking.canOpenURL(url);

  if (!canOpen) {
    throw new Error("WhatsApp is not installed");
  }

  await Linking.openURL(url);
};

export const copyPhoneNumber = async (phoneNumber = DEFAULT_SUPPORT_PHONE) => {
  await Clipboard.setStringAsync(phoneNumber);
};