import { Text, TouchableOpacity, View } from "react-native";
import { Users } from "lucide-react-native";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { flightClasses } from "../../data/flightConfig";

type TravelerSummaryButtonProps = {
  onPress: () => void;
};

const TravelerSummaryButton = ({ onPress }: TravelerSummaryButtonProps) => {
  const { travelers, cabin } = useSelector((state: RootState) => state.flightSearch);

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;
  const cabinLabel = flightClasses.find((item) => item.value === cabin)?.label ?? "Economy";

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className="mb-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
    >
      <View className="flex-row items-center">
        <View className="h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
          <Users size={21} color="#13275F" />
        </View>

        <View className="ml-3">
          <Text className="font-extrabold text-gray-900">
            {totalTravelers} Traveller{totalTravelers > 1 ? "s" : ""}
          </Text>
          <Text className="text-xs text-gray-500">{cabinLabel}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TravelerSummaryButton;