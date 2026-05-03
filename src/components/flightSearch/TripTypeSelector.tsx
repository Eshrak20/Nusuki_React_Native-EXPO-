import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { tripTypes } from "../../data/flightConfig";
import type { RootState } from "../../redux/store";
import { setTripType } from "../../redux/features/flightSearchSlice";

const TripTypeSelector = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.flightSearch.tripType);

  return (
    <View className="mb-4 flex-row gap-2">
      {tripTypes.map((type) => {
        const isActive = value === type.value;

        return (
          <TouchableOpacity
            key={type.value}
            activeOpacity={0.85}
            onPress={() => dispatch(setTripType(type.value))}
            className={`flex-1 flex-row items-center justify-center rounded-2xl border px-3 py-3 ${
              isActive
                ? "border-primary bg-primary"
                : "border-gray-200 bg-white"
            }`}
          >
            <View
              className={`mr-2 h-4 w-4 items-center justify-center rounded-full border ${
                isActive ? "border-white" : "border-gray-400"
              }`}
            >
              {isActive ? (
                <View className="h-2 w-2 rounded-full bg-white" />
              ) : null}
            </View>

            <Text
              className={`text-xs font-extrabold ${
                isActive ? "text-white" : "text-gray-600"
              }`}
            >
              {type.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TripTypeSelector;