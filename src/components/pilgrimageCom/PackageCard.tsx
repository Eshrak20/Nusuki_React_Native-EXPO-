import { Link, router } from "expo-router";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import { PackageItem } from "../../types/hajj/types.package";

type PackageCardProps = {
  item: PackageItem;
  type: "hajj" | "umrah";
};

const PackageCard = ({ item, type }: PackageCardProps) => {
  const price = Number(item.price || 0).toLocaleString("en-BD");

  const handleCallNow = () => {
    Linking.openURL("tel:09600000000");
  };


  return (
    <View className="mb-5 overflow-hidden rounded-3xl bg-white shadow-sm">
      <Image
        source={{ uri: item.card_image }}
        className="h-48 w-full"
        resizeMode="cover"
      />

      <View className="p-4">
        <Text className="text-lg font-bold text-gray-900">{item.name}</Text>

        <Text className="mt-1 text-sm text-gray-500">{item.tagline}</Text>

        <Text className="mt-3 text-xl font-extrabold text-primary">
          ৳ {price}
        </Text>

        <View className="mt-5 flex-row gap-3">
          <Link
            href={{
              pathname: "/pilgrimage/package-detail",
              params: {
                id: String(item.id),
                type: type,
              },
            }}
            asChild
          >
            <TouchableOpacity
              activeOpacity={0.85}
              className="flex-1 rounded-2xl bg-primary py-3"
            >
              <Text className="text-center font-bold text-white">
                View Details
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleCallNow}
            className="flex-1 rounded-2xl border border-primary py-3"
          >
            <Text className="text-center font-bold text-primary">Call Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PackageCard;
