import { Image, Text, View } from "react-native";
import { Clock3, MapPin } from "lucide-react-native";
import DetailSection from "./DetailSection";
import type { PackageItinerary } from "../../types/pilgrimage/types.packageDetails";

type PackageItinerariesProps = {
  data: PackageItinerary[];
};

const PackageItineraries = ({ data }: PackageItinerariesProps) => {
  if (!data.length) return null;

  return (
    <DetailSection title="Itinerary">
      {data.map((item, index) => {
        const image = item.itinerary.images?.[0]?.image_url;

        return (
          <View
            key={item.id}
            className="mb-4 overflow-hidden rounded-3xl bg-gray-50 last:mb-0"
          >
            {image ? (
              <Image
                source={{ uri: image }}
                className="h-40 w-full"
                resizeMode="cover"
              />
            ) : null}

            <View className="p-4">
              <View className="mb-3 self-start rounded-full bg-primary px-3 py-1">
                <Text className="text-xs font-extrabold text-white">
                  Day {index + 1}
                </Text>
              </View>

              <Text className="text-base font-extrabold text-gray-900">
                {item.itinerary.name}
              </Text>

              <View className="mt-2 flex-row items-center">
                <MapPin size={15} color="#6B7280" />
                <Text className="ml-2 text-sm font-medium text-gray-500">
                  {item.itinerary.location}
                </Text>
              </View>

              <View className="mt-2 flex-row items-center">
                <Clock3 size={15} color="#6B7280" />
                <Text className="ml-2 text-sm font-medium text-gray-500">
                  Duration: {item.duration}
                </Text>
              </View>

              <Text className="mt-3 text-sm leading-5 text-gray-600">
                {item.itinerary.short_description}
              </Text>
            </View>
          </View>
        );
      })}
    </DetailSection>
  );
};

export default PackageItineraries;