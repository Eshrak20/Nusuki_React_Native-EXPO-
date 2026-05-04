import { Image, Text, View } from "react-native";
import { MapPin, Moon, Star } from "lucide-react-native";
import DetailSection from "./DetailSection";
import type { PackageAccommodation } from "../../types/pilgrimage/types.packageDetails";

type PackageAccommodationsProps = {
  data: PackageAccommodation[];
};

const PackageAccommodations = ({ data }: PackageAccommodationsProps) => {
  if (!data.length) return null;

  return (
    <DetailSection title="Accommodations">
      {data.map((item) => {
        const image = item.accommodation.images?.[0]?.image_url;

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
              <Text className="text-base font-extrabold text-gray-900">
                {item.accommodation.name}
              </Text>

              <View className="mt-2 flex-row items-center">
                <MapPin size={15} color="#6B7280" />
                <Text className="ml-2 text-sm font-medium text-gray-500">
                  {item.accommodation.location}
                </Text>
              </View>

              <View className="mt-3 flex-row gap-2">
                <View className="flex-row items-center rounded-full bg-white px-3 py-1.5">
                  <Moon size={14} color="#13275F" />
                  <Text className="ml-1 text-xs font-bold text-primary">
                    {item.nights} Nights
                  </Text>
                </View>

                <View className="flex-row items-center rounded-full bg-white px-3 py-1.5">
                  <Star size={14} color="#F59E0B" />
                  <Text className="ml-1 text-xs font-bold text-gray-700">
                    {item.accommodation.rating} Star
                  </Text>
                </View>
              </View>

              <Text className="mt-3 text-sm leading-5 text-gray-600">
                {item.accommodation.short_description}
              </Text>
            </View>
          </View>
        );
      })}
    </DetailSection>
  );
};

export default PackageAccommodations;