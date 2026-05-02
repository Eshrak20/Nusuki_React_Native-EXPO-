import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Check, X } from "lucide-react-native";
import { countries } from "../../data/countries";

type CountryFilterDrawerProps = {
  visible: boolean;
  selectedCountry: string;
  onClose: () => void;
  onSelectCountry: (country: string) => void;
  onClear: () => void;
};

const CountryFilterDrawer = ({
  visible,
  selectedCountry,
  onClose,
  onSelectCountry,
  onClear,
}: CountryFilterDrawerProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 flex-row bg-black/40">
        <Pressable className="flex-1" onPress={onClose} />

        <View className="h-full w-[82%] rounded-l-3xl bg-white">
          <View className="flex-row items-center justify-between border-b border-gray-100 px-5 py-4">
            <View>
              <Text className="text-lg font-extrabold text-gray-900">
                Filter Country
              </Text>
              <Text className="mt-0.5 text-xs text-gray-500">
                Select one country
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
                selectedCountry === ""
                  ? "border-primary bg-primary/10"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <Text
                className={`font-bold ${
                  selectedCountry === "" ? "text-primary" : "text-gray-700"
                }`}
              >
                All Countries
              </Text>

              {selectedCountry === "" ? (
                <Check size={18} color="#13275F" />
              ) : null}
            </TouchableOpacity>

            {countries.map((country) => {
              const isSelected = selectedCountry === country;

              return (
                <TouchableOpacity
                  key={country}
                  activeOpacity={0.85}
                  onPress={() => onSelectCountry(country)}
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
                    {country}
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

export default CountryFilterDrawer;