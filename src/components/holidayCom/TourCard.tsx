import {
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import {
  ArrowRight,
  MapPin,
} from "lucide-react-native";
import type { TourItem } from "../../types/holiday/types.tour";

const { width } = Dimensions.get("window");
// Increased gap logic: (Screen - (Horizontal Padding * 2) - Middle Gap) / 2
const CARD_WIDTH = (width - 32 - 12) / 2; 

type TourCardProps = {
  item: TourItem;
  onViewPackages: (item: TourItem) => void;
};

const TourCard = ({ item, onViewPackages }: TourCardProps) => {
  const regionName = item.regions[0]?.name || "Destination";

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onViewPackages(item)}
      style={{ width: CARD_WIDTH }}
      className="mb-8" // Increased vertical gap
    >
      {/* Cinematic Image Container - Sharp Edges */}
      <View className="h-60 w-full bg-gray-200"> 
        <ImageBackground
          source={{ uri: item.bg_image_url }}
          resizeMode="cover"
          className="flex-1"
        >
          {/* Subtle Gradient Overlay for depth */}
          <View className="flex-1 bg-black/10 p-3 justify-between">
            <View className="self-start bg-white px-2 py-1">
              <Text className="text-[9px] font-black uppercase tracking-widest text-black">
                {regionName}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      {/* Content Section - Minimalist */}
      <View className="mt-3">
        <View className="flex-row items-center opacity-60">
          <MapPin size={10} color="#000" strokeWidth={3} />
          <Text className="ml-1 text-[10px] font-bold uppercase tracking-tighter text-black">
            {item.country_name}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          className="mt-1 text-lg font-light leading-6 text-black tracking-tight"
          style={{ fontFamily: 'System' }} // Using thin/light weights feels more premium
        >
          {item.display_name.toUpperCase()}
        </Text>

        <View className="mt-3 h-[1px] w-8 bg-primary" />

        <View className="mt-3 flex-row items-center justify-between">
            <Text className="text-[11px] font-bold text-gray-400">
                EXPLORE NOW
            </Text>
            <ArrowRight size={14} color="#13275F" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TourCard;