import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Plane, Search, X } from "lucide-react-native";
import type { AirportItem } from "../../types/flight/types.flight";

type AirportPickerModalProps = {
  visible: boolean;
  title: string;
  keyword: string;
  airports: AirportItem[];
  isLoading: boolean;
  onChangeKeyword: (value: string) => void;
  onSelect: (airport: AirportItem) => void;
  onClose: () => void;
};

const AirportPickerModal = ({
  visible,
  title,
  keyword,
  airports,
  isLoading,
  onChangeKeyword,
  onSelect,
  onClose,
}: AirportPickerModalProps) => {
  
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 bg-white">
        <View className="bg-primary px-4 pb-4 pt-12">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={onClose}>
              <X size={25} color="#FFFFFF" />
            </TouchableOpacity>

            <Text className="ml-4 text-lg font-extrabold text-white">
              {title}
            </Text>
          </View>

          <View className="mt-4 flex-row items-center rounded-2xl bg-white px-4">
            <Search size={20} color="#6B7280" />

            <TextInput
              value={keyword}
              onChangeText={onChangeKeyword}
              autoFocus
              placeholder="Search city or airport"
              placeholderTextColor="#9CA3AF"
              className="ml-2 h-12 flex-1 text-sm font-semibold text-gray-900"
            />
          </View>
        </View>

        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#13275F" />
            <Text className="mt-3 text-gray-500">Loading airports...</Text>
          </View>
        ) : (
          <FlatList
            data={airports}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <Pressable
                onPress={() => onSelect(item)}
                className="flex-row items-center border-b border-gray-100 px-4 py-4"
              >
                <View className="w-14 border-r border-gray-200">
                  <Text className="text-lg font-extrabold text-primary">
                    {item.iata_code}
                  </Text>
                </View>

                <View className="ml-4 flex-1">
                  <Text className="text-base font-extrabold text-gray-900">
                    {item.city_name}
                  </Text>

                  <Text numberOfLines={1} className="mt-0.5 text-xs text-gray-500">
                    {item.country}, {item.name} ({item.iata_code})
                  </Text>
                </View>

                <Plane size={18} color="#9CA3AF" />
              </Pressable>
            )}
            ListEmptyComponent={
              <View className="mt-20 items-center">
                <Text className="text-gray-500">No airport found.</Text>
              </View>
            }
          />
        )}
      </View>
    </Modal>
  );
};

export default AirportPickerModal;