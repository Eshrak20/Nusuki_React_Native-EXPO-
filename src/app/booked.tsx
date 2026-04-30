import { View, Text } from "react-native";

const BookedPage = () => {
  return (
    <View className="flex-1 bg-white p-4 items-center justify-center">
      <View className="w-full rounded-2xl border border-primary-light/30 bg-primary-light/20 p-5">
        <Text className="text-primary text-xl font-bold">Booked</Text>
        <Text className="text-gray-600 mt-2">Booked feature is upcoming.</Text>
      </View>
    </View>
  );
};

export default BookedPage;