import { Image, ScrollView, Text, View } from "react-native";
import type { FlightResultItem } from "../../types/flight/types.flightResults";
import {
  formatFlightDate,
  formatFlightTime,
  formatMoney,
} from "../../utils/flightFormatters";

type FlightDetailCardProps = {
  flight: FlightResultItem;
};

const FlightDetailCard = ({ flight }: FlightDetailCardProps) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-4 py-5 pb-28"
    >
      <View className="rounded-3xl bg-white p-5 shadow-sm">
        <Text className="mb-5 text-xl font-extrabold text-primary">
          Price Details
        </Text>

        <View className="mb-3 flex-row justify-between">
          <Text className="font-bold text-gray-800">Base Fare</Text>
          <Text className="font-extrabold text-gray-900">
            ৳ {formatMoney(flight.pricing?.base)}
          </Text>
        </View>

        <View className="mb-3 flex-row justify-between">
          <Text className="font-bold text-gray-800">Tax</Text>
          <Text className="font-extrabold text-gray-900">
            ৳ {formatMoney(flight.pricing?.tax)}
          </Text>
        </View>

        <View className="mt-3 border-t border-dashed border-gray-300 pt-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-extrabold text-primary">
              Payable Amount
            </Text>

            <View className="rounded-2xl border border-primary px-4 py-2">
              <Text className="text-xl font-extrabold text-primary">
                ৳ {formatMoney(flight.pricing?.total)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {flight.segments.map((segment, index) => (
        <View
          key={`${segment.flight_number}-${index}`}
          className="mt-5 overflow-hidden rounded-3xl bg-white shadow-sm"
        >
          <View className="border-b border-gray-100 px-4 py-4">
            <Text className="text-center font-extrabold text-primary">
              {segment.origin?.airport}-{segment.destination?.airport} | Date :{" "}
              {segment.departure_at?.split("T")[0]}
            </Text>
          </View>

          <View className="p-4">
            <View className="flex-row items-center">
              {segment.airline.logo ? (
                <Image
                  source={{ uri: segment.airline.logo }}
                  className="mr-3 h-10 w-10"
                  resizeMode="contain"
                />
              ) : null}

              <View className="flex-1">
                <Text className="font-extrabold text-gray-900">
                  {segment.airline.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {segment.flight_number}
                </Text>
              </View>

              <Text className="text-xs font-bold text-green-600">
                {flight.fare?.refundable ? "Refundable" : "Non Refundable"}
              </Text>
            </View>

            <View className="mt-5 flex-row justify-between">
              <View>
                <Text className="text-lg font-extrabold text-gray-900">
                  {formatFlightTime(segment.departure_at)}
                </Text>
                <Text className="text-sm font-bold text-gray-600">
                  {segment.origin?.airport}
                </Text>
                <Text className="text-xs text-gray-500">
                  {formatFlightDate(segment.departure_at)}
                </Text>
              </View>

              <View className="items-center">
                <Text className="text-sm font-extrabold text-gray-800">
                  {segment.elapsed_time_text}
                </Text>
                <View className="my-2 h-px w-24 bg-gray-200" />
                <Text className="text-xs text-gray-500">
                  {segment.stop_count === 0 ? "NonStop" : `${segment.stop_count} Stop`}
                </Text>
              </View>

              <View className="items-end">
                <Text className="text-lg font-extrabold text-gray-900">
                  {formatFlightTime(segment.arrival_at)}
                </Text>
                <Text className="text-sm font-bold text-gray-600">
                  {segment.destination?.airport}
                </Text>
                <Text className="text-xs text-gray-500">
                  {formatFlightDate(segment.arrival_at)}
                </Text>
              </View>
            </View>

            {flight.baggage?.label ? (
              <View className="mt-5 rounded-2xl bg-gray-50 p-3">
                <Text className="text-sm font-bold text-gray-700">
                  Baggage: {flight.baggage.label}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default FlightDetailCard;