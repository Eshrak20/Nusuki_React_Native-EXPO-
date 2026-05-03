import React from "react";
import { Text, TouchableOpacity, View, Dimensions } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setSort } from "../../redux/features/flightTicketSlice";
import type { SortBy } from "../../types/flight/types.flightResults";
// Install lucide-react-native if you haven't: npm install lucide-react-native
import { Clock, Tag, Zap } from "lucide-react-native";

const { width } = Dimensions.get("window");

const sortItems: { label: string; value: SortBy; icon: any }[] = [
  { label: "Cheapest", value: "price", icon: Tag },
  { label: "Fastest", value: "duration", icon: Zap },
  { label: "Earliest", value: "departure_at", icon: Clock },
];

const FlightSortBar = () => {
  const dispatch = useDispatch();
  const { sortBy } = useSelector((state: RootState) => state.flightTicket);

  return (
    <View className="absolute bottom-8 left-0 right-0 items-center justify-center px-4">
      <View 
        style={{ elevation: 10 }}
        className="flex-row items-center justify-between rounded-3xl bg-white/95 p-1.5 shadow-xl shadow-black/20 border border-gray-100"
      >
        {sortItems.map((item) => {
          const isActive = sortBy === item.value;
          const Icon = item.icon;

          return (
            <TouchableOpacity
              key={item.value}
              activeOpacity={0.7}
              onPress={() =>
                dispatch(
                  setSort({
                    sortBy: item.value,
                    sortOrder: "asc",
                  }),
                )
              }
              // Responsive width calculation: (Total Width - padding) / 3
              style={{ width: (width - 60) / 3 }}
              className={`flex-row items-center justify-center space-x-2 rounded-2xl py-3 transition-all ${
                isActive ? "bg-primary shadow-sm" : "bg-transparent"
              }`}
            >
              <Icon 
                size={16} 
                color={isActive ? "white" : "#6b7280"} 
                strokeWidth={2.5} 
              />
              <Text
                numberOfLines={1}
                className={`text-[13px] font-bold ${
                  isActive ? "text-white" : "text-gray-500"
                }`}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FlightSortBar;