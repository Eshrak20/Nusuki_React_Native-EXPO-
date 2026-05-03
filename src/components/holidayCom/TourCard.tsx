import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { MapPin, PlaneTakeoff } from "lucide-react-native";
import type { TourItem } from "../../types/holiday/types.tour";

type TourCardProps = {
  item: TourItem;
  onViewPackages: (item: TourItem) => void;
};

const TourCard = ({ item, onViewPackages }: TourCardProps) => {
  const typeNames = item.tour_types.map((type) => type.name).join(", ");
  const regionNames = item.regions.map((region) => region.name).join(", ");

  return (
    <View className="mb-5 overflow-hidden rounded-3xl bg-white shadow-sm">
      <ImageBackground
        source={{ uri: item.bg_image_url }}
        resizeMode="cover"
        className="h-52 justify-end"
      >
        <View className="flex-1 justify-end bg-black/35 p-4">
          <View className="self-start rounded-full bg-white/20 px-3 py-1 backdrop-blur">
            <Text className="text-xs font-bold text-white">
              {regionNames || "Holiday"}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            className="mt-3 text-2xl font-extrabold text-white"
          >
            {item.display_name}
          </Text>

          <View className="mt-2 flex-row items-center">
            <MapPin size={16} color="#FFFFFF" />
            <Text className="ml-2 text-sm font-medium text-white/85">
              {item.country_name}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View className="p-4">
        <Text
          numberOfLines={2}
          className="text-sm font-semibold text-gray-500"
        >
          {typeNames || "Explore holiday packages"}
        </Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onViewPackages(item)}
          className="mt-4 flex-row items-center justify-center rounded-2xl bg-primary py-3.5"
        >
          <PlaneTakeoff size={17} color="#FFFFFF" />
          <Text className="ml-2 font-extrabold text-white">
            View Packages
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TourCard;