import { Text, TouchableOpacity, View } from "react-native";
import { Check } from "lucide-react-native";

type FlightFilterOptionProps = {
  label: string;
  count?: number;
  active: boolean;
  onPress: () => void;
};

const FlightFilterOption = ({
  label,
  count,
  active,
  onPress,
}: FlightFilterOptionProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`mb-3 flex-row items-center justify-between rounded-2xl border px-4 py-3 ${
        active ? "border-primary bg-primary/10" : "border-gray-100 bg-gray-50"
      }`}
    >
      <View>
        <Text
          className={`font-bold ${active ? "text-primary" : "text-gray-800"}`}
        >
          {label}
        </Text>

        {typeof count === "number" ? (
          <Text className="mt-0.5 text-xs text-gray-500">{count} flights</Text>
        ) : null}
      </View>

      {active ? <Check size={18} color="#13275F" /> : null}
    </TouchableOpacity>
  );
};

export default FlightFilterOption;