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
  const baseFare = Number(flight.pricing?.base || 0);
  const tax = Number(flight.pricing?.tax || 0);
  const ait = Number((flight.pricing as any)?.ait || 0);
  const totalPrice = Number(flight.pricing?.total || 0);
  const discount = Number((flight.pricing as any)?.discount || 0);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerClassName="px-4 py-5 pb-28"
    >
      {/* Price Details Card */}
      <View className="rounded-[18px] border border-gray-200 bg-white p-6 shadow-sm shadow-black/5">
        <Text className="text-[22px] font-extrabold text-primary">
          Price Details
        </Text>

        <Text className="mt-5 text-base font-medium text-gray-800">
          All prices are in{" "}
          <Text className="font-extrabold text-green-600">
            Bangladeshi taka
          </Text>
        </Text>

        <Text className="mt-8 text-lg font-extrabold text-primary">
          Fare Summary
        </Text>

        <View className="mt-5 gap-y-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-black">
              Base Fare
            </Text>
            <Text className="text-base font-extrabold text-black">
              {formatMoney(baseFare)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-black">Tax</Text>
            <Text className="text-base font-extrabold text-black">
              {formatMoney(tax)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-black">AIT</Text>
            <Text className="text-base font-extrabold text-black">
              {formatMoney(ait)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-black">
              Total Price
            </Text>
            <Text className="text-base font-extrabold text-black">
              {formatMoney(totalPrice)}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <Text className="text-base font-extrabold text-black">
              Discount
            </Text>
            <Text className="text-base font-extrabold text-black">
              {formatMoney(discount)}
            </Text>
          </View>
        </View>

        <View className="mt-5 border-t border-dashed border-primary pt-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-extrabold text-primary">
              Payable Amount
            </Text>

            <View className="rounded-lg border-2 border-blue-700 px-4 py-3">
              <Text className="text-xl font-extrabold text-blue-700">
                ৳ {formatMoney(totalPrice)}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Flight Segment Cards */}
      {flight.segments.map((segment, index) => {
        const departureAirport = segment.origin?.airport || "";
        const destinationAirport = segment.destination?.airport || "";
        const departureDate = segment.departure_at?.split("T")[0] || "";

        return (
          <View
            key={`${segment.flight_number}-${index}`}
            className="mt-5 overflow-hidden rounded-[18px] border border-gray-200 bg-white shadow-sm shadow-black/5"
          >
            {/* Segment Header */}
            <View className="border-b border-gray-200 px-4 py-4">
              <Text className="text-center text-base font-extrabold text-primary">
                {departureAirport}-{destinationAirport}
                <Text className="font-medium text-gray-800">
                  {"  |  Date : "}
                </Text>
                {departureDate}
              </Text>
            </View>

            <View className="p-4">
              {/* Airline Row */}
              <View className="flex-row items-center">
                {segment.airline.logo ? (
                  <Image
                    source={{ uri: segment.airline.logo }}
                    className="mr-3 h-9 w-9 rounded-full"
                    resizeMode="contain"
                  />
                ) : (
                  <View className="mr-3 h-9 w-9 rounded-full bg-red-500" />
                )}

                <View className="flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-sm font-semibold text-black"
                  >
                    {segment.airline.name}
                  </Text>

                  <Text className="mt-0.5 text-sm font-medium text-gray-500">
                    {segment.flight_number}
                  </Text>
                </View>

                <Text
                  numberOfLines={1}
                  className="ml-2 text-xs font-medium text-gray-800"
                >
                  {flight.fare?.refundable ? "Refundable" : "Non Refundable"}
                </Text>
              </View>

              <View className="mt-4 border-t border-gray-200" />

              {/* Route Timeline */}
              <View className="mt-6 flex-row items-start justify-between">
                {/* Departure */}
                <View className="w-[32%]">
                  <Text className="text-lg font-extrabold text-primary">
                    {departureAirport} - {formatFlightTime(segment.departure_at)}
                  </Text>

                  <Text className="mt-1 text-sm font-medium text-gray-800">
                    {formatFlightDate(segment.departure_at)}
                  </Text>

                  <Text
                    numberOfLines={2}
                    className="mt-1 text-xs font-medium leading-4 text-gray-700"
                  >
                    {segment.origin?.airport_name}
                  </Text>
                </View>

                {/* Middle Duration */}
                <View className="w-[34%] items-center pt-4">
                  <Text className="mb-2 text-sm font-medium text-gray-800">
                    {segment.elapsed_time_text}
                  </Text>

                  <View className="w-full flex-row items-center justify-center">
                    <View className="h-2 w-2 rounded-full bg-amber-500" />
                    <View className="h-px flex-1 bg-gray-300" />
                    <View className="h-2 w-2 rounded-full bg-amber-500" />
                  </View>

                  <Text className="mt-2 text-xs font-semibold text-gray-500">
                    {segment.stop_count === 0
                      ? "NonStop"
                      : `${segment.stop_count} Stop`}
                  </Text>
                </View>

                {/* Arrival */}
                <View className="w-[32%] items-end">
                  <Text className="text-right text-lg font-extrabold text-primary">
                    {destinationAirport} - {formatFlightTime(segment.arrival_at)}
                  </Text>

                  <Text className="mt-1 text-right text-sm font-medium text-gray-800">
                    {formatFlightDate(segment.arrival_at)}
                  </Text>

                  <Text
                    numberOfLines={2}
                    className="mt-1 text-right text-xs font-medium leading-4 text-gray-700"
                  >
                    {segment.origin?.airport_name}
                  </Text>
                </View>
              </View>

              {flight.baggage?.label ? (
                <View className="mt-5 rounded-xl bg-gray-50 px-4 py-3">
                  <Text className="text-sm font-extrabold text-gray-800">
                    Baggage:{" "}
                    <Text className="font-semibold text-gray-600">
                      {flight.baggage.label}
                    </Text>
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default FlightDetailCard;