import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { setFareType } from "../../redux/features/flightSearchSlice";
import { fares } from "../../data/flightConfig";

const FareTypeSelector = () => {
  const dispatch = useDispatch();
  const fareType = useSelector((state: RootState) => state.flightSearch.fareType);

  return (
    <View className="mb-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <Text className="mb-3 text-xs font-bold uppercase text-gray-400">
        Fare Type
      </Text>

      <View className="flex-row flex-wrap gap-2">
        {fares.map((fare) => {
          const isActive = fareType === fare.value;

          return (
            <TouchableOpacity
              key={fare.value}
              onPress={() => dispatch(setFareType(fare.value))}
              className={`rounded-full px-4 py-2 ${
                isActive ? "bg-primary" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-xs font-extrabold ${
                  isActive ? "text-white" : "text-gray-600"
                }`}
              >
                {fare.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default FareTypeSelector;