import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import PageHeader from "../../../components/common/PageHeader";

export default function FlightTicketsScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title="Flight Tickets" />

      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-base font-bold text-gray-700">
          Flight search response is now logging in console.
        </Text>

        <Text className="mt-2 text-center text-sm text-gray-500">
          Next step: we will design ticket list, filters, sorting and pagination.
        </Text>
      </View>
    </View>
  );
}