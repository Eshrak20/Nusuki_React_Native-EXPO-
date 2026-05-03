import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setSort } from "../../redux/features/flightTicketSlice";
import type { SortBy } from "../../types/flight/types.flightResults";

const sortItems: { label: string; value: SortBy; sub: string }[] = [
  { label: "Earliest", value: "departure_at", sub: "Departure" },
  { label: "Cheapest", value: "price", sub: "Best Price" },
  { label: "Fastest", value: "duration", sub: "Duration" },
];

const FlightSortBar = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.flightTicket);

  return (
    <View className="absolute bottom-3 left-4 right-4 flex-row rounded-full bg-white p-2 shadow-lg">
      {sortItems.map((item) => {
        const isActive = sortBy === item.value;

        return (
          <TouchableOpacity
            key={item.value}
            activeOpacity={0.85}
            onPress={() =>
              dispatch(
                setSort({
                  sortBy: item.value,
                  sortOrder: "asc",
                }),
              )
            }
            className={`flex-1 rounded-full py-2 ${
              isActive ? "bg-primary" : "bg-transparent"
            }`}
          >
            <Text
              className={`text-center text-sm font-extrabold ${
                isActive ? "text-white" : "text-gray-800"
              }`}
            >
              {item.label}
            </Text>

            <Text
              className={`text-center text-[10px] ${
                isActive ? "text-white/80" : "text-gray-500"
              }`}
            >
              {item.sub}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default FlightSortBar;