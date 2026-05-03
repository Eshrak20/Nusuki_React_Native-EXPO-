import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { ChevronRight, Gem, Plane } from "lucide-react-native";
import type { FlightResultItem } from "../../types/flight/types.flightResults";
import {
  formatFlightDate,
  formatFlightTime,
  formatMoney,
} from "../../utils/flightFormatters";

type FlightTicketCardProps = {
  item: FlightResultItem;
};

const FlightTicketCard = ({ item }: FlightTicketCardProps) => {
  const firstJourney = item.journeys?.[0];
  const secondJourney = item.journeys?.[1];

  const renderJourney = (journeyIndex: number) => {
    const journey = item.journeys?.[journeyIndex];

    const source = journey?.summary ?? item.summary;

    return (
      <View className={journeyIndex === 0 ? "" : "mt-5"}>
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-lg font-extrabold text-gray-900">
              {formatFlightTime(source.departure_at)}
            </Text>
            <Text className="text-sm font-bold text-gray-700">
              {source.origin?.airport}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatFlightDate(source.departure_at)}
            </Text>
          </View>

          <View className="mx-4 flex-1 items-center">
            <Text className="text-sm font-extrabold text-gray-900">
              {source.duration_text}
            </Text>

            <View className="my-2 h-px w-full bg-gray-200" />

            <Plane size={18} color="#EF4444" />

            <Text className="mt-1 text-xs text-gray-500">
              {source.stops === 0 ? "NonStop" : `${source.stops} Stop`}
            </Text>
          </View>

          <View className="items-end">
            <Text className="text-lg font-extrabold text-gray-900">
              {formatFlightTime(source.arrival_at)}
            </Text>
            <Text className="text-sm font-bold text-gray-700">
              {source.destination?.airport}
            </Text>
            <Text className="text-xs text-gray-500">
              {formatFlightDate(source.arrival_at)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleSelect = () => {
    router.push({
      pathname: "/flight/ticket-detail",
      params: {
        flight_id: item.flight_id,
        search_id: item.search_id,
      },
    });
  };

  return (
    <View className="mb-4 rounded-3xl bg-white p-4 shadow-sm">
      <View className="mb-3 flex-row items-center">
        {item.fare?.refundable ? (
          <View className="mr-3 flex-row items-center">
            <Gem size={14} color="#16A34A" />
            <Text className="ml-1 text-[11px] font-bold text-gray-600">
              Partially Refundable
            </Text>
          </View>
        ) : null}

        <Text className="text-[11px] font-bold text-orange-500">BEST</Text>
      </View>

      <View className="rounded-2xl bg-gray-50 p-4">
        {renderJourney(0)}
        {secondJourney || firstJourney ? renderJourney(1) : null}
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center">
          {item.airline?.logo ? (
            <Image
              source={{ uri: item.airline.logo }}
              className="mr-2 h-6 w-6"
              resizeMode="contain"
            />
          ) : null}

          <View>
            <Text className="text-xs font-bold text-gray-500">
              {item.airline?.name}
            </Text>

            <Text className="text-lg font-extrabold text-primary">
              ৳ {formatMoney(item.pricing?.total)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleSelect}
          className="flex-row items-center rounded-2xl bg-orange-500 px-5 py-3"
        >
          <Text className="font-extrabold text-white">Select</Text>
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FlightTicketCard;