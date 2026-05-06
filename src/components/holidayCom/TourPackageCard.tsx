import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { CalendarDays, MapPin, PlaneTakeoff, ArrowRight } from "lucide-react-native";
import type { TourPackageItem } from "../../types/holiday/types.tourPackageLists";
import { Link } from "expo-router";

type TourPackageCardProps = {
  item: TourPackageItem;
};

const TourPackageCard = ({ item }: TourPackageCardProps) => {
  const [imageError, setImageError] = useState(false);

  // Formatting price with a clean look
  const price = Number(item.price || 0).toLocaleString("en-BD");
  const shouldShowImage = Boolean(item.image) && !imageError;

  return (
    <View className="mb-10 bg-white"> {/* Increased bottom margin for "breathing" space */}
      {/* 1. Cinematic Image Section - Zero Rounding */}
      <View className="h-64 w-full bg-gray-100">
        {shouldShowImage ? (
          <Image
            source={{ uri: item.image }}
            className="h-full w-full"
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <View className="h-full w-full items-center justify-center bg-gray-50">
            <PlaneTakeoff size={32} color="#13275F" strokeWidth={1} />
          </View>
        )}
        
        {/* Floating Duration Badge - Sharp Design */}
        <View className="absolute bottom-0 left-0 bg-white px-4 py-2">
          <View className="flex-row items-center">
            <CalendarDays size={12} color="#000" />
            <Text className="ml-2 text-[10px] font-black uppercase tracking-widest text-black">
              {item.duration_days} Days / {Number(item.duration_days) - 1} Nights
            </Text>
          </View>
        </View>
      </View>

      {/* 2. Content Section */}
      <View className="mt-4 px-1">
        {/* Location Label */}
        <View className="flex-row items-center opacity-60">
          <MapPin size={10} color="#000" strokeWidth={3} />
          <Text className="ml-1 text-[10px] font-bold uppercase tracking-tighter text-black">
            {item.address}
          </Text>
        </View>

        {/* Title - Light & Sophisticated */}
        <Text
          numberOfLines={2}
          className="mt-2 text-xl font-light leading-7 tracking-tight text-black"
        >
          {item.name.toUpperCase()}
        </Text>

        {/* Price & Action Row */}
        <View className="mt-4 h-[1px] w-full bg-gray-100" />
        
        <View className="mt-4 flex-row items-center justify-between">
          <View>
            <Text className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Starting From
            </Text>
            <Text className="text-xl font-black text-primary">
              ৳{price}
            </Text>
          </View>

          <Link
            href={{
              pathname: "/holiday/details",
              params: { id: String(item.id) },
            }}
            asChild
          >
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center bg-primary px-6 py-3"
            >
              <Text className="mr-2 text-[11px] font-bold text-white uppercase tracking-widest">
                Explore
              </Text>
              <ArrowRight size={14} color="#FFF" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default TourPackageCard;