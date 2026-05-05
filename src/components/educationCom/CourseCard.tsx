import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  BookOpen,
  GraduationCap,
  MapPin,
  School,
} from "lucide-react-native";
import type { CourseItem } from "../../types/education/types.course";

type CourseCardProps = {
  item: CourseItem;
};

const CourseCard = ({ item }: CourseCardProps) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = item.logo?.trim();
  const shouldShowImage = Boolean(imageUrl) && !imageError;

  const locationText = item.city
    ? `${item.city}, ${item.country}`
    : item.country;

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
      <View className="flex-row gap-3">
        {/* Left Image Area */}
        <View className="h-36 w-[38%] items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-3">
          {shouldShowImage ? (
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full"
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View className="h-full w-full items-center justify-center rounded-2xl bg-primary/10">
              <BookOpen size={38} color="#13275F" />
              <Text className="mt-2 text-center text-[11px] font-bold text-primary">
                Course
              </Text>
            </View>
          )}
        </View>

        {/* Right Info Area */}
        <View className="flex-1 rounded-3xl border border-gray-100 bg-white p-3">
          <Text
            numberOfLines={2}
            className="text-[14px] font-extrabold leading-5 text-gray-900"
          >
            {item.name}
          </Text>

          {item.study_level ? (
            <View className="mt-2 self-start rounded-full bg-primary/10 px-3 py-1">
              <Text
                numberOfLines={1}
                className="max-w-40 text-[10px] font-extrabold text-primary"
              >
                {item.study_level}
              </Text>
            </View>
          ) : null}

          <View className="mt-3 flex-row items-start">
            <School size={14} color="#6B7280" />

            <Text
              numberOfLines={2}
              className="ml-2 flex-1 text-[11px] font-semibold leading-4 text-gray-600"
            >
              {item.university}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <MapPin size={14} color="#6B7280" />

            <Text
              numberOfLines={1}
              className="ml-2 flex-1 text-[11px] font-medium text-gray-500"
            >
              {locationText}
            </Text>
          </View>

          {/* <TouchableOpacity
            activeOpacity={0.85}
            className="mt-4 flex-row items-center justify-center rounded-2xl bg-primary py-3"
          >
            <GraduationCap size={15} color="#FFFFFF" />

            <Text className="ml-2 text-xs font-extrabold text-white">
              View Details
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default CourseCard;