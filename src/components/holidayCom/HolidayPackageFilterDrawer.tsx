import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Check, X } from "lucide-react-native";
import type { TourPackageFilters } from "../../types/holiday/types.tourPackageLists";

type HolidayPackageFilterDrawerProps = {
  visible: boolean;
  filters?: TourPackageFilters;
  selectedDuration: string;
  minPrice: string;
  maxPrice: string;
  onChangeMinPrice: (value: string) => void;
  onChangeMaxPrice: (value: string) => void;
  onSelectDuration: (value: string) => void;
  onClear: () => void;
  onApply: () => void;
  onClose: () => void;
};

const HolidayPackageFilterDrawer = ({
  visible,
  filters,
  selectedDuration,
  minPrice,
  maxPrice,
  onChangeMinPrice,
  onChangeMaxPrice,
  onSelectDuration,
  onClear,
  onApply,
  onClose,
}: HolidayPackageFilterDrawerProps) => {
  const durations = filters?.duration_days ?? [];

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 flex-row bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="h-full w-[84%] rounded-l-3xl bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
            <View>
              <Text className="text-lg font-extrabold text-gray-900">
                Filter Packages
              </Text>
              <Text className="mt-0.5 text-xs text-gray-500">
                Price and duration
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
            contentContainerClassName="px-5 py-4 pb-32"
          >
            <Text className="mb-3 text-sm font-extrabold text-gray-900">
              Price Range
            </Text>

            <View className="flex-row gap-3">
              <View className="flex-1 rounded-2xl bg-gray-100 px-4 py-2">
                <Text className="text-xs font-bold text-gray-500">Min</Text>
                <TextInput
                  value={minPrice}
                  onChangeText={onChangeMinPrice}
                  keyboardType="numeric"
                  placeholder={String(filters?.price?.min ?? "Min")}
                  placeholderTextColor="#9CA3AF"
                  className="h-10 text-base font-bold text-gray-900"
                />
              </View>

              <View className="flex-1 rounded-2xl bg-gray-100 px-4 py-2">
                <Text className="text-xs font-bold text-gray-500">Max</Text>
                <TextInput
                  value={maxPrice}
                  onChangeText={onChangeMaxPrice}
                  keyboardType="numeric"
                  placeholder={String(filters?.price?.max ?? "Max")}
                  placeholderTextColor="#9CA3AF"
                  className="h-10 text-base font-bold text-gray-900"
                />
              </View>
            </View>

            <Text className="mb-3 mt-6 text-sm font-extrabold text-gray-900">
              Duration
            </Text>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => onSelectDuration("")}
              className={`mb-3 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
                selectedDuration === ""
                  ? "border-primary bg-primary/10"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <Text
                className={`font-bold ${
                  selectedDuration === "" ? "text-primary" : "text-gray-700"
                }`}
              >
                All Durations
              </Text>

              {selectedDuration === "" ? (
                <Check size={18} color="#13275F" />
              ) : null}
            </TouchableOpacity>

            {durations.map((duration) => {
              const isSelected = selectedDuration === duration;

              return (
                <TouchableOpacity
                  key={duration}
                  activeOpacity={0.85}
                  onPress={() => onSelectDuration(duration)}
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
                    {duration} Days
                  </Text>

                  {isSelected ? <Check size={18} color="#13275F" /> : null}
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <View className="absolute bottom-0 left-0 right-0 flex-row gap-3 border-t border-gray-100 bg-white px-5 py-4">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onClear}
              className="flex-1 rounded-2xl border border-primary py-3"
            >
              <Text className="text-center font-extrabold text-primary">
                Clear
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={onApply}
              className="flex-1 rounded-2xl bg-primary py-3"
            >
              <Text className="text-center font-extrabold text-white">
                Apply
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default HolidayPackageFilterDrawer;