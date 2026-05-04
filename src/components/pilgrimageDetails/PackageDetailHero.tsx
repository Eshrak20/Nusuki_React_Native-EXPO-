import { ImageBackground, Text, View } from "react-native";
import { CalendarDays, Moon, Plane, Star } from "lucide-react-native";
import type { PilgrimagePackageDetails } from "../../types/pilgrimage/types.packageDetails";

type PackageDetailHeroProps = {
  item: PilgrimagePackageDetails;
  type: "hajj" | "umrah";
};

const PackageDetailHero = ({ item, type }: PackageDetailHeroProps) => {
  const price = Number(item.price || 0).toLocaleString("en-BD");

  return (
    <View className="mb-5 overflow-hidden rounded-b-[32px] bg-primary">
      <ImageBackground
        source={{ uri: item.card_image }}
        resizeMode="cover"
        className="h-80 justify-end"
      >
        <View className="flex-1 justify-end bg-black/45 p-5">
          <View className="mb-3 self-start rounded-full bg-white/20 px-3 py-1.5">
            <Text className="text-xs font-extrabold uppercase text-white">
              {type === "hajj" ? "Hajj Package" : "Umrah Package"}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            className="text-3xl font-extrabold leading-9 text-white"
          >
            {item.name}
          </Text>

          <Text className="mt-1 text-sm font-semibold text-white/85">
            {item.tagline}
          </Text>

          <Text className="mt-4 text-2xl font-extrabold text-white">
            ৳ {price}
          </Text>
        </View>
      </ImageBackground>

      <View className="grid gap-3 p-4">
        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <CalendarDays size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">Date</Text>
            <Text numberOfLines={2} className="text-sm font-bold text-white">
              {item.date}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <Moon size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Nights
            </Text>
            <Text className="text-sm font-bold text-white">
              {item.num_of_nights} Nights
            </Text>
          </View>
        </View>

        <View className="flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <Plane size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Flight
            </Text>
            <Text numberOfLines={1} className="text-sm font-bold text-white">
              {item.flight_type}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <Star size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Type
            </Text>
            <Text numberOfLines={1} className="text-sm font-bold text-white">
              {item.package_type}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PackageDetailHero;