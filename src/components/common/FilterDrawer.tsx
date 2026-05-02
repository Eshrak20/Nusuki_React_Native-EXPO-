import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Check, X } from "lucide-react-native";

type FilterDrawerProps = {
  visible: boolean;
  title: string;
  subtitle?: string;
  options: string[];
  selectedValue: string;
  allLabel?: string;
  onClose: () => void;
  onSelect: (value: string) => void;
  onClear: () => void;
};

const FilterDrawer = ({
  visible,
  title,
  subtitle = "Select one option",
  options,
  selectedValue,
  allLabel = "All",
  onClose,
  onSelect,
  onClear,
}: FilterDrawerProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 flex-row bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="h-full w-[82%] rounded-l-3xl bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
            <View>
              <Text className="text-lg font-extrabold text-gray-900">
                {title}
              </Text>

              <Text className="mt-0.5 text-xs text-gray-500">
                {subtitle}
              </Text>
            </View>

            <TouchableOpacity
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-gray-100"
            >
              <X size={20} color="#111827" />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-5 py-4 pb-28"
          >
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClear}
              className={`mb-3 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                selectedValue === ""
                  ? "border-primary bg-primary/10"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <Text
                className={`font-bold ${
                  selectedValue === "" ? "text-primary" : "text-gray-700"
                }`}
              >
                {allLabel}
              </Text>

              {selectedValue === "" ? (
                <Check size={18} color="#13275F" />
              ) : null}
            </TouchableOpacity>

            {options.map((option) => {
              const isSelected = selectedValue === option;

              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.85}
                  onPress={() => onSelect(option)}
                  className={`mb-3 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-gray-100 bg-gray-50"
                  }`}
                >
                  <Text
                    className={`font-bold ${
                      isSelected ? "text-primary" : "text-gray-700"
                    }`}
                  >
                    {option}
                  </Text>

                  {isSelected ? <Check size={18} color="#13275F" /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default FilterDrawer;