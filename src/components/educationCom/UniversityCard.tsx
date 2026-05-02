import { useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import {
  ExternalLink,
  GraduationCap,
  MapPin,
  Globe2,
} from "lucide-react-native";
import type { UniversityItem } from "../../types/education/types.university";

type UniversityCardProps = {
  item: UniversityItem;
};

const UniversityCard = ({ item }: UniversityCardProps) => {
  const [imageError, setImageError] = useState(false);

  const logoUrl = item.uni_logo?.trim();
  const shouldShowLogo = Boolean(logoUrl) && !imageError;

  const handleOpenWebsite = () => {
    if (!item.universityUrl) return;

    const url = item.universityUrl.startsWith("http")
      ? item.universityUrl
      : `https://${item.universityUrl}`;

    Linking.openURL(url);
  };

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
      <View className="flex-row gap-3">
        {/* Left Logo Area */}
        <View className="h-40 w-[42%] items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-3">
          {shouldShowLogo ? (
            <Image
              source={{ uri: logoUrl }}
              className="h-full w-full"
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View className="h-full w-full items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap size={42} color="#13275F" />
              <Text className="mt-2 text-center text-xs font-bold text-primary">
                University
              </Text>
            </View>
          )}
        </View>

        {/* Right Info Area */}
        <View className="min-h-40 flex-1 rounded-3xl border border-gray-100 bg-white p-3">
          <View className="flex-1">
            <Text
              numberOfLines={3}
              className="text-[14px] font-extrabold leading-5 text-gray-900"
            >
              {item.name}
            </Text>

            <View className="mt-3 flex-row items-center">
              <MapPin size={14} color="#6B7280" />

              <Text
                numberOfLines={2}
                className="ml-1 flex-1 text-xs font-medium leading-4 text-gray-500"
              >
                {item.location || item.country}
              </Text>
            </View>

            <View className="mt-3 flex-row items-center">
              <Globe2 size={14} color="#13275F" />

              <Text
                numberOfLines={1}
                className="ml-1 text-xs font-bold text-primary"
              >
                {item.country}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenWebsite}
            className="mt-3 flex-row items-center justify-center rounded-2xl bg-primary py-3"
          >
            <ExternalLink size={15} color="#FFFFFF" />

            <Text className="ml-2 text-xs font-extrabold text-white">
              Visit Website
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UniversityCard;