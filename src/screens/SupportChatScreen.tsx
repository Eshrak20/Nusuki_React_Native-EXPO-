import { useEffect, useRef, useState } from "react";
import { FlatList, Keyboard, Platform, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AttachmentSheet from "@/features/chat/components/AttachmentSheet";
import ChatHeader from "@/features/chat/components/ChatHeader";
import ChatInputBar from "@/features/chat/components/ChatInputBar";
import EmojiPanel from "@/features/chat/components/EmojiPanel";
import MessageBubble from "@/features/chat/components/MessageBubble";
import type { ChatInputBarRef } from "@/features/chat/components/ChatInputBar";
import {
  ChatMessage,
  createSupportChatIfNeeded,
  listenSupportMessages,
  sendSupportMessage,
} from "../features/chat/services/chatService";
import { router } from "expo-router";

const CURRENT_USER = {
  id: "user_1",
  name: "Demo User",
  email: "demo@gmail.com",
};

const EMOJI_PANEL_HEIGHT = 360;

const SupportChatScreen = () => {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const chatInputRef = useRef<ChatInputBarRef>(null);
  const [chatId, setChatId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [attachmentVisible, setAttachmentVisible] = useState(false);
  const [emojiVisible, setEmojiVisible] = useState(false);

  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [inputAreaHeight, setInputAreaHeight] = useState(72);
  const EXTRA_KEYBOARD_GAP = 100;
  const bottomOffset =
    keyboardHeight > 0 ? keyboardHeight + EXTRA_KEYBOARD_GAP : 0;

  const listBottomPadding =
    inputAreaHeight +
    bottomOffset +
    (emojiVisible ? EMOJI_PANEL_HEIGHT : 0) +
    20;

  useEffect(() => {
    let unsubscribe: undefined | (() => void);

    const prepareChat = async () => {
      const id = await createSupportChatIfNeeded({
        userId: CURRENT_USER.id,
        userName: CURRENT_USER.name,
        userEmail: CURRENT_USER.email,
      });

      setChatId(id);
      unsubscribe = listenSupportMessages(id, setMessages);
    };

    prepareChat();

    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (event) => {
      const height = event.endCoordinates?.height ?? 0;

      /**
       * Android-e kichu phone-e keyboard height er moddhe bottom navigation inset
       * dhuke jay. Tai safe area minus kore clean offset rakhlam.
       */
      setKeyboardHeight(Math.max(height - insets.bottom, 0));
      setEmojiVisible(false);

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 120);
    });

    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [insets.bottom]);

  useEffect(() => {
    if (!messages.length) return;

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 120);
  }, [messages]);

  const handleSend = async () => {
    if (!chatId || !message.trim()) return;

    const text = message.trim();
    setMessage("");

    await sendSupportMessage({
      chatId,
      text,
      senderId: CURRENT_USER.id,
      senderType: "user",
    });
  };

  const handleOpenEmoji = () => {
    if (emojiVisible) {
      setEmojiVisible(false);

      setTimeout(() => {
        chatInputRef.current?.focusInput();
      }, 80);

      return;
    }

    Keyboard.dismiss();

    setTimeout(() => {
      setKeyboardHeight(0);
      setEmojiVisible(true);
    }, 80);
  };

  const handleInputFocus = () => {
    if (emojiVisible) {
      setEmojiVisible(false);
    }

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 180);
  };

  return (
    <View className="flex-1 bg-[#F2F4F7]">
      <ChatHeader
        onCloseChat={() => {
          router.replace("/");
        }}
      />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MessageBubble item={item} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 12,
          paddingTop: 16,
          paddingBottom: listBottomPadding,
        }}
        onContentSizeChange={() => {
          flatListRef.current?.scrollToEnd({ animated: true });
        }}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center px-8">
            <View className="rounded-2xl bg-white px-5 py-4 shadow-sm">
              <Text className="text-center text-sm font-semibold text-slate-800">
                Nusuki Support
              </Text>
              <Text className="mt-1 text-center text-xs leading-5 text-slate-500">
                Start a conversation with Nusuki Team. We will reply as soon as
                possible.
              </Text>
            </View>
          </View>
        }
      />

      <View
        className="absolute left-0 right-0 bg-white"
        style={{
          bottom: bottomOffset,
          paddingBottom: keyboardHeight > 0 ? 0 : insets.bottom,
        }}
        onLayout={(event) => {
          setInputAreaHeight(event.nativeEvent.layout.height);
        }}
      >
        <ChatInputBar
          ref={chatInputRef}
          message={message}
          setMessage={setMessage}
          emojiVisible={emojiVisible}
          onInputFocus={handleInputFocus}
          onSendText={handleSend}
          onOpenEmoji={handleOpenEmoji}
          onOpenAttachment={() => {
            Keyboard.dismiss();
            setKeyboardHeight(0);
            setEmojiVisible(false);
            setAttachmentVisible(true);
          }}
          onOpenCamera={() => {
            Keyboard.dismiss();
            setKeyboardHeight(0);
            setEmojiVisible(false);
            console.log("Open camera");
          }}
          onStartVoice={() => {
            Keyboard.dismiss();
            setKeyboardHeight(0);
            setEmojiVisible(false);
            console.log("Start voice recording");
          }}
        />

        {emojiVisible ? (
          <EmojiPanel
            onClose={() => setEmojiVisible(false)}
            onSelectEmoji={(emoji) => {
              setMessage((prev) => `${prev}${emoji}`);
            }}
          />
        ) : null}
      </View>

      <AttachmentSheet
        visible={attachmentVisible}
        onClose={() => setAttachmentVisible(false)}
        onPickImage={() => {
          setAttachmentVisible(false);
          console.log("Pick image");
        }}
        onPickFile={() => {
          setAttachmentVisible(false);
          console.log("Pick file");
        }}
        onOpenCamera={() => {
          setAttachmentVisible(false);
          console.log("Open camera");
          4;
        }}
      />
    </View>
  );
};

export default SupportChatScreen;
