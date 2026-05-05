import { Camera, FileText, ImageIcon, X } from "lucide-react-native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type AttachmentSheetProps = {
  visible: boolean;
  onClose: () => void;
  onPickImage: () => void;
  onPickFile: () => void;
  onOpenCamera: () => void;
};

const PRIMARY_COLOR = "#13275F";

const AttachmentSheet = ({
  visible,
  onClose,
  onPickImage,
  onPickFile,
  onOpenCamera,
}: AttachmentSheetProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={onClose}
        className="flex-1 justify-end bg-black/30"
      >
        <TouchableOpacity activeOpacity={1}>
          <SafeAreaView
            edges={["bottom"]}
            className="rounded-t-3xl bg-white px-5 pb-4 pt-4"
          >
            <View className="mb-5 flex-row items-center justify-between">
              <Text className="text-base font-extrabold text-slate-900">
                Send attachment
              </Text>

              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.75}
                className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
              >
                <X size={18} color="#475569" />
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-around">
              <TouchableOpacity
                onPress={onPickImage}
                activeOpacity={0.8}
                className="items-center"
              >
                <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-violet-100">
                  <ImageIcon size={25} color="#7C3AED" />
                </View>
                <Text className="text-xs font-semibold text-slate-700">
                  Gallery
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onPickFile}
                activeOpacity={0.8}
                className="items-center"
              >
                <View className="mb-2 h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                  <FileText size={25} color="#2563EB" />
                </View>
                <Text className="text-xs font-semibold text-slate-700">
                  Document
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onOpenCamera}
                activeOpacity={0.8}
                className="items-center"
              >
                <View
                  className="mb-2 h-14 w-14 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${PRIMARY_COLOR}18` }}
                >
                  <Camera size={25} color={PRIMARY_COLOR} />
                </View>
                <Text className="text-xs font-semibold text-slate-700">
                  Camera
                </Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default AttachmentSheet;