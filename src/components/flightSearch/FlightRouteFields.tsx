import { Text, TouchableOpacity, View } from "react-native";
import { CalendarDays, Repeat2 } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { swapDestinations } from "../../redux/features/flightSearchSlice";
import { formatDisplayDate } from "../../utils/flightDate";
import type { AirportItem } from "../../types/flight/types.flight";

type FlightRouteFieldsProps = {
  onOpenAirport: (field: "from" | "to") => void;
  onOpenDepartureDate: () => void;
  onOpenReturnDate: () => void;
};

const AirportBox = ({
  title,
  airport,
  onPress,
}: {
  title: string;
  airport: AirportItem | null;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    className="mb-3 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
  >
    <Text className="text-xs font-bold uppercase text-gray-400">{title}</Text>

    <View className="mt-2 flex-row items-center">
      <View className="mr-3 h-12 w-14 items-center justify-center rounded-2xl bg-primary/10">
        <Text className="text-lg font-extrabold text-primary">
          {airport?.iata_code ?? "---"}
        </Text>
      </View>

      <View className="flex-1">
        <Text numberOfLines={1} className="text-base font-extrabold text-gray-900">
          {airport?.city_name ?? "Select Airport"}
        </Text>
        <Text numberOfLines={1} className="mt-0.5 text-xs text-gray-500">
          {airport ? `${airport.country}, ${airport.name}` : "Tap to select"}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

const DateBox = ({
  title,
  date,
  onPress,
}: {
  title: string;
  date: string;
  onPress: () => void;
}) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    className="flex-1 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm"
  >
    <Text className="text-xs font-bold uppercase text-gray-400">{title}</Text>

    <View className="mt-2 flex-row items-center">
      <CalendarDays size={20} color="#13275F" />
      <Text className="ml-2 text-base font-extrabold text-gray-900">
        {formatDisplayDate(date)}
      </Text>
    </View>
  </TouchableOpacity>
);

const FlightRouteFields = ({
  onOpenAirport,
  onOpenDepartureDate,
  onOpenReturnDate,
}: FlightRouteFieldsProps) => {
  const dispatch = useDispatch();
  const searchData = useSelector((state: RootState) => state.flightSearch);

  return (
    <View>
      <View className="relative">
        <AirportBox
          title="From"
          airport={searchData.fromDest}
          onPress={() => onOpenAirport("from")}
        />

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => dispatch(swapDestinations())}
          className="absolute right-5 top-[78px] z-10 h-11 w-11 items-center justify-center rounded-full bg-primary shadow-sm"
        >
          <Repeat2 size={21} color="#FFFFFF" />
        </TouchableOpacity>

        <AirportBox
          title="To"
          airport={searchData.toDest}
          onPress={() => onOpenAirport("to")}
        />
      </View>

      <View className="mb-5 flex-row gap-3">
        <DateBox
          title="Departure"
          date={searchData.departureDate}
          onPress={onOpenDepartureDate}
        />

        {searchData.tripType === "round_way" ? (
          <DateBox
            title="Return"
            date={searchData.returnDate}
            onPress={onOpenReturnDate}
          />
        ) : null}
      </View>
    </View>
  );
};

export default FlightRouteFields;