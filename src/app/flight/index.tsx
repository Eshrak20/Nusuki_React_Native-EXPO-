import { View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../components/common/PageHeader";
import FlightSearchForm from "../../components/flightSearch/FlightSearchForm";

export default function FlightSearchScreen() {
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title="Flight Search" />

      <FlightSearchForm />
    </View>
  );
}