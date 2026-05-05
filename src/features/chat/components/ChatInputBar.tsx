import {
  Camera,
  Keyboard,
  Mic,
  Paperclip,
  Send,
  Smile,
} from "lucide-react-native";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export type ChatInputBarRef = {
  focusInput: () => void;
  blurInput: () => void;
};

type ChatInputBarProps = {
  message: string;
  setMessage: (value: string) => void;
  emojiVisible: boolean;
  onSendText: () => void;
  onOpenEmoji: () => void;
  onOpenAttachment: () => void;
  onOpenCamera: () => void;
  onStartVoice: () => void;
  onInputFocus?: () => void;
};

const PRIMARY_COLOR = "#13275F";

const ChatInputBar = forwardRef<ChatInputBarRef, ChatInputBarProps>(
  (
    {
      message,
      setMessage,
      emojiVisible,
      onSendText,
      onOpenEmoji,
      onOpenAttachment,
      onOpenCamera,
      onStartVoice,
      onInputFocus,
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const hasText = message.trim().length > 0;

    useImperativeHandle(ref, () => ({
      focusInput: () => {
        inputRef.current?.focus();
      },
      blurInput: () => {
        inputRef.current?.blur();
      },
    }));

    return (
      <View className="flex-row items-end gap-2 bg-white px-3 pb-2 pt-2">
        <View className="min-h-12 max-h-32 flex-1 flex-row items-end rounded-3xl border border-slate-200 bg-white px-2 py-1 shadow-sm">
          <TouchableOpacity
            onPress={onOpenEmoji}
            activeOpacity={0.75}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            {emojiVisible ? (
              <Keyboard size={24} color="#64748B" />
            ) : (
              <Smile size={24} color="#64748B" />
            )}
          </TouchableOpacity>

          <TextInput
            ref={inputRef}
            value={message}
            onChangeText={setMessage}
            onFocus={onInputFocus}
            placeholder="Message"
            placeholderTextColor="#64748B"
            multiline
            textAlignVertical="center"
            className="max-h-28 min-h-10 flex-1 py-2 text-[18px] text-slate-900"
          />
          {/* 
          <TouchableOpacity
            onPress={onOpenAttachment}
            activeOpacity={0.75}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <Paperclip size={24} color="#64748B" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onOpenCamera}
            activeOpacity={0.75}
            className="h-10 w-10 items-center justify-center rounded-full"
          >
            <Camera size={24} color="#64748B" />
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          onPress={hasText ? onSendText : onStartVoice}
          activeOpacity={0.85}
          className="h-14 w-14 items-center justify-center rounded-full"
          style={{ backgroundColor: PRIMARY_COLOR }}
        >
          {hasText ? (
            <Send size={22} color="#FFFFFF" />
          ) : (
            // <Mic size={25} color="#FFFFFF" />
            <Send size={22} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    );
  },
);

ChatInputBar.displayName = "ChatInputBar";

export default ChatInputBar;
