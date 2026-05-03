import { View } from "react-native";

const FlightTicketSkeleton = () => {
  return (
    <View className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
      <View className="mb-4 h-4 w-40 rounded-full bg-gray-200" />

      <View className="rounded-2xl bg-gray-50 p-4">
        <View className="flex-row justify-between">
          <View className="h-12 w-20 rounded-2xl bg-gray-200" />
          <View className="h-12 w-24 rounded-2xl bg-gray-200" />
          <View className="h-12 w-20 rounded-2xl bg-gray-200" />
        </View>

        <View className="mt-5 flex-row justify-between">
          <View className="h-12 w-20 rounded-2xl bg-gray-200" />
          <View className="h-12 w-24 rounded-2xl bg-gray-200" />
          <View className="h-12 w-20 rounded-2xl bg-gray-200" />
        </View>
      </View>

      <View className="mt-4 h-10 rounded-2xl bg-gray-200" />
    </View>
  );
};

export default FlightTicketSkeleton;