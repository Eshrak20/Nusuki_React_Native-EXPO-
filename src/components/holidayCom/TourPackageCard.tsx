import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CalendarDays, MapPin, PlaneTakeoff } from "lucide-react-native";
import type { TourPackageItem } from "../../types/holiday/types.tourPackageLists";

type TourPackageCardProps = {
  item: TourPackageItem;
};

const TourPackageCard = ({ item }: TourPackageCardProps) => {
  const [imageError, setImageError] = useState(false);

  const price = Number(item.price || 0).toLocaleString("en-BD");
  const shouldShowImage = Boolean(item.image) && !imageError;

  return (
    <View className="mb-5 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <View className="h-48 bg-gray-100">
        {shouldShowImage ? (
          <Image
            source={{ uri: item.image }}
            className="h-full w-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-primary/10">
            <PlaneTakeoff size={42} color="#13275F" />
            <Text className="mt-2 text-sm font-bold text-primary">
              Holiday Package
            </Text>
          </View>
        )}
      </View>

      <View className="p-4">
        <Text
          numberOfLines={2}
          className="text-lg font-extrabold leading-6 text-gray-900"
        >
          {item.name}
        </Text>

        <View className="mt-3 flex-row items-start">
          <MapPin size={16} color="#6B7280" />
          <Text
            numberOfLines={2}
            className="ml-2 flex-1 text-sm font-medium leading-5 text-gray-500"
          >
            {item.address}
          </Text>
        </View>

        <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-gray-50 px-4 py-3">
          <View className="flex-row items-center">
            <CalendarDays size={17} color="#13275F" />
            <Text className="ml-2 text-sm font-bold text-gray-700">
              {item.duration_days} Days
            </Text>
          </View>

          <Text className="text-lg font-extrabold text-primary">
            ৳ {price}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          className="mt-4 flex-row items-center justify-center rounded-2xl bg-primary py-3.5"
        >
          <Text className="font-extrabold text-white">View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TourPackageCard;