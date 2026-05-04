import { ImageBackground, Text, View } from "react-native";
import { CalendarDays, MapPin } from "lucide-react-native";
import type { HolidayPackageDetails } from "../../types/holiday/types.tourPackageDetails";

type HolidayDetailsHeroProps = {
  item: HolidayPackageDetails;
};

const HolidayDetailsHero = ({ item }: HolidayDetailsHeroProps) => {
  const image = item.images?.[0]?.image_url;

  return (
    <View className="mb-5 overflow-hidden rounded-b-[0px] bg-primary">
      <ImageBackground
        source={image ? { uri: image } : undefined}
        resizeMode="cover"
        className="h-80 justify-end bg-primary"
      >
        <View className="flex-1 justify-end bg-black/45 p-5">
          <View className="mb-3 self-start rounded-full bg-white/20 px-3 py-1.5">
            <Text className="text-xs font-extrabold uppercase text-white">
              Holiday Package
            </Text>
          </View>

          <Text
            numberOfLines={3}
            className="text-3xl font-extrabold leading-9 text-white"
          >
            {item.name}
          </Text>

          <View className="mt-3 flex-row items-center">
            <MapPin size={17} color="#FFFFFF" />
            <Text numberOfLines={2} className="ml-2 flex-1 text-sm font-semibold text-white/90">
              {item.address}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View className="p-4">
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <CalendarDays size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Duration
            </Text>
            <Text className="text-base font-extrabold text-white">
              {item.duration_days} Days
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <MapPin size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Destination
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.tour?.display_name || item.country_name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HolidayDetailsHero;