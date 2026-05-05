import {
  Dimensions,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowRight,
  MapPin,
  PlaneTakeoff,
  Sparkles,
} from "lucide-react-native";
import type { TourItem } from "../../types/holiday/types.tour";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

type TourCardProps = {
  item: TourItem;
  onViewPackages: (item: TourItem) => void;
};

const TourCard = ({ item, onViewPackages }: TourCardProps) => {
  const regionNames = item.regions.map((region) => region.name).join(", ");
  const firstRegion = regionNames.split(",")[0] || "Holiday";

  const visibleTourTypes = item.tour_types.slice(0, 2);
  const extraTourTypesCount = Math.max(item.tour_types.length - 2, 0);

  return (
    <View
      style={{ width: CARD_WIDTH }}
      className="mb-4 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm shadow-black/5"
    >
      <ImageBackground
        source={{ uri: item.bg_image_url }}
        resizeMode="cover"
        className="h-40 w-full"
        imageStyle={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
      >
        <View className="flex-1 justify-between bg-black/35 p-3">
          <View className="self-start rounded-full bg-white px-3 py-1.5 shadow-sm">
            <Text
              numberOfLines={1}
              className="max-w-[120px] text-[10px] font-extrabold uppercase tracking-tight text-primary"
            >
              {firstRegion}
            </Text>
          </View>

          <View className="self-start flex-row items-center rounded-full bg-primary/90 px-3 py-1.5">
            <Sparkles size={11} color="#FFFFFF" />
            <Text className="ml-1 text-[10px] font-extrabold text-white">
              Premium Tour
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View className="p-3.5">
        <View className="min-h-[60px]">
          <Text
            numberOfLines={2}
            className="text-[15px] font-extrabold leading-5 text-primary"
          >
            {item.display_name}
          </Text>

          <View className="mt-2 flex-row items-center">
            <View className="h-6 w-6 items-center justify-center rounded-full bg-primary/5">
              <MapPin size={12} color="#13275F" />
            </View>

            <Text
              numberOfLines={1}
              className="ml-1.5 flex-1 text-[11px] font-semibold text-gray-500"
            >
              {item.country_name}
            </Text>
          </View>
        </View>

        <View className="my-3 border-t border-dashed border-gray-300" />

        <View className="min-h-[54px]">
          <Text className="mb-2 text-[11px] font-extrabold text-primary">
            Tour Types
          </Text>

          <View className="flex-row flex-wrap gap-1.5">
            {visibleTourTypes.length > 0 ? (
              <>
                {visibleTourTypes.map((type) => (
                  <View
                    key={type.id}
                    className="rounded-full border border-primary/10 bg-primary/5 px-2.5 py-1"
                  >
                    <Text
                      numberOfLines={1}
                      className="max-w-[82px] text-[10px] font-bold text-primary"
                    >
                      {type.name}
                    </Text>
                  </View>
                ))}

                {extraTourTypesCount > 0 ? (
                  <View className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
                    <Text className="text-[10px] font-extrabold text-gray-500">
                      +{extraTourTypesCount}
                    </Text>
                  </View>
                ) : null}
              </>
            ) : (
              <View className="rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1">
                <Text className="text-[10px] font-bold text-gray-500">
                  Premium Collection
                </Text>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => onViewPackages(item)}
          className="mt-4 h-11 flex-row items-center justify-between rounded-2xl border border-primary bg-white px-3.5"
        >
          <View className="flex-row items-center">
            <View className="h-7 w-7 items-center justify-center rounded-full bg-primary">
              <PlaneTakeoff size={14} color="#FFFFFF" />
            </View>

            <Text className="ml-2 text-xs font-extrabold text-primary">
              View Packages
            </Text>
          </View>

          <ArrowRight size={15} color="#13275F" strokeWidth={2.7} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TourCard;