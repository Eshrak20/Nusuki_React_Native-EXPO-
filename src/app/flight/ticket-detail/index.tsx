import { useEffect } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { ActivityIndicator } from "react-native";
import FlightTicketHeader from "../../../components/flightTickets/FlightTicketHeader";
import FlightTimer from "../../../components/flightTickets/FlightTimer";
import FlightDetailCard from "../../../components/flightTickets/FlightDetailCard";
import { useLazyFlightDetailTicketQuery } from "../../../redux/api/flightApi";
import useSharedFlightTimer from "../../../hooks/useSharedFlightTimer";

export default function FlightTicketDetailScreen() {
  const { flight_id, search_id } = useLocalSearchParams<{
    flight_id: string;
    search_id: string;
  }>();

  const { isExpired } = useSharedFlightTimer();

  const [fetchDetail, detailState] = useLazyFlightDetailTicketQuery();

  useEffect(() => {
    if (!flight_id || !search_id) return;

    fetchDetail({
      flight_id,
      search_id,
    });
  }, [flight_id, search_id, fetchDetail]);

  useEffect(() => {
    if (!isExpired) return;

    Alert.alert("Session expired", "Please search again to get latest fares.", [
      {
        text: "Search Again",
        onPress: () => router.replace("/flight"),
      },
    ]);
  }, [isExpired]);

  const flight = detailState.data?.data?.flight;

  return (
    <View className="flex-1 bg-gray-100">
      <FlightTicketHeader title="Flight Details" subtitle="Review your fare" />

     

      {detailState.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#13275F" />
          <Text className="mt-3 text-gray-500">Loading flight details...</Text>
        </View>
      ) : detailState.isError || !flight ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-bold text-red-500">
            Failed to load flight details.
          </Text>

          <TouchableOpacity
            onPress={() => {
              if (!flight_id || !search_id) return;
              fetchDetail({ flight_id, search_id });
            }}
            className="mt-4 rounded-2xl bg-primary px-6 py-3"
          >
            <Text className="font-extrabold text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlightDetailCard flight={flight} />
      )}
    </View>
  );
}