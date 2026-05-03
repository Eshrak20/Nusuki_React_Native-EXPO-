import { Text, View } from "react-native";
import { Timer } from "lucide-react-native";
import useSharedFlightTimer from "../../hooks/useSharedFlightTimer";

type FlightTimerProps = {
  compact?: boolean;
};

const FlightTimer = ({ compact = false }: FlightTimerProps) => {
  const { formatted, isExpired } = useSharedFlightTimer();

  return (
    <View
      className={`flex-row items-center justify-center ${
        compact ? "rounded-full bg-orange-500 px-3 py-1" : "bg-orange-500 py-2"
      }`}
    >
      <Timer size={compact ? 14 : 16} color="#FFFFFF" />

      <Text
        className={`ml-2 font-extrabold text-white ${
          compact ? "text-xs" : "text-sm"
        }`}
      >
        {isExpired ? "Expired" : `Remaining ${formatted}`}
      </Text>
    </View>
  );
};

export default FlightTimer;