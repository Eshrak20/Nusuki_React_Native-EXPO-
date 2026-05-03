import { Alert, Text, TouchableOpacity, View } from "react-native";
import { CalendarDays } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { addSegment, removeSegment } from "../../redux/features/flightSearchSlice";
import { formatDisplayDate } from "../../utils/flightDate";
import type { AirportItem } from "../../types/flight/types.flight";

type MultiCityFieldsProps = {
  onOpenAirport: (field: {
    segmentIndex: number;
    field: "fromDest" | "toDest";
  }) => void;
  onOpenDate: (index: number) => void;
};

const AirportMiniBox = ({
  title,
  airport,
  onPress,
}: {
  title: string;
  airport: AirportItem | null;
  onPress: () => void;
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.85}
    className="mb-3 rounded-2xl bg-gray-50 p-4"
  >
    <Text className="text-xs font-bold uppercase text-gray-400">{title}</Text>

    <View className="mt-2 flex-row items-center">
      <Text className="mr-3 text-lg font-extrabold text-primary">
        {airport?.iata_code ?? "---"}
      </Text>

      <View className="flex-1">
        <Text numberOfLines={1} className="font-extrabold text-gray-900">
          {airport?.city_name ?? "Select Airport"}
        </Text>
        <Text numberOfLines={1} className="text-xs text-gray-500">
          {airport?.name ?? "Tap to select"}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const MultiCityFields = ({ onOpenAirport, onOpenDate }: MultiCityFieldsProps) => {
  const dispatch = useDispatch();
  const segments = useSelector((state: RootState) => state.flightSearch.segments);

  const handleAddSegment = () => {
    if (segments.length >= 5) {
      Alert.alert("Limit reached", "You can add maximum 5 flights.");
      return;
    }

    dispatch(addSegment());
  };

  return (
    <View>
      {segments.map((segment, index) => (
        <View
          key={index}
          className="mb-4 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm"
        >
          <View className="mb-3 flex-row items-center justify-between">
            <View className="rounded-full bg-primary px-3 py-1">
              <Text className="text-xs font-extrabold text-white">
                Flight {index + 1}
              </Text>
            </View>

            {segments.length > 2 ? (
              <TouchableOpacity onPress={() => dispatch(removeSegment(index))}>
                <Text className="font-bold text-red-500">Remove</Text>
              </TouchableOpacity>
            ) : null}
          </View>

          <AirportMiniBox
            title="From"
            airport={segment.fromDest}
            onPress={() => onOpenAirport({ segmentIndex: index, field: "fromDest" })}
          />

          <AirportMiniBox
            title="To"
            airport={segment.toDest}
            onPress={() => onOpenAirport({ segmentIndex: index, field: "toDest" })}
          />

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onOpenDate(index)}
            className="rounded-2xl bg-gray-50 p-4"
          >
            <Text className="text-xs font-bold uppercase text-gray-400">
              Departure
            </Text>

            <View className="mt-2 flex-row items-center">
              <CalendarDays size={20} color="#13275F" />
              <Text className="ml-2 text-base font-extrabold text-gray-900">
                {formatDisplayDate(segment.departureDate)}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity
        disabled={segments.length >= 5}
        activeOpacity={0.85}
        onPress={handleAddSegment}
        className={`mb-5 rounded-2xl border py-4 ${
          segments.length >= 5
            ? "border-gray-200 bg-gray-100"
            : "border-primary bg-primary/10"
        }`}
      >
        <Text
          className={`text-center font-extrabold ${
            segments.length >= 5 ? "text-gray-400" : "text-primary"
          }`}
        >
          Add Flight {segments.length >= 5 ? "(Max 5)" : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MultiCityFields;