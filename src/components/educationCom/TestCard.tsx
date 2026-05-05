import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {
  CalendarDays,
  Clock3,
  GraduationCap,
  Monitor,
  Timer,
} from "lucide-react-native";
import type { TestPreparationItem } from "../../types/education/types.test";

type TestCardProps = {
  item: TestPreparationItem;
};

const TestCard = ({ item }: TestCardProps) => {
  const [imageError, setImageError] = useState(false);

  const imageUrl = item.image?.trim();
  const shouldShowImage = Boolean(imageUrl) && !imageError;

  const examName = item.examType?.toUpperCase();

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
      <View className="flex-row gap-3">
        <View className="h-40 w-[38%] items-center justify-center overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-3">
          {shouldShowImage ? (
            <Image
              source={{ uri: imageUrl }}
              className="h-full w-full"
              resizeMode="contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <View className="h-full w-full items-center justify-center rounded-2xl bg-primary/10">
              <GraduationCap size={40} color="#13275F" />
              <Text className="mt-2 text-center text-xs font-bold text-primary">
                {examName || "Test"}
              </Text>
            </View>
          )}
        </View>

        <View className="flex-1 rounded-3xl border border-gray-100 bg-white p-3">
          <Text
            numberOfLines={2}
            className="text-[15px] font-extrabold leading-5 text-gray-900"
          >
            {examName} Preparation
          </Text>

          <View className="mt-2 self-start rounded-full bg-primary/10 px-3 py-1">
            <Text
              numberOfLines={1}
              className="text-[11px] font-extrabold text-primary"
            >
              {item.testDesc}
            </Text>
          </View>

          <View className="mt-3 flex-row items-center">
            <CalendarDays size={14} color="#6B7280" />
            <Text className="ml-2 flex-1 text-[11px] font-semibold text-gray-600">
              {item.date}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <Clock3 size={14} color="#6B7280" />
            <Text
              numberOfLines={1}
              className="ml-2 flex-1 text-[11px] font-medium text-gray-500"
            >
              {item.time}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <Timer size={14} color="#6B7280" />
            <Text className="ml-2 flex-1 text-[11px] font-medium text-gray-500">
              {item.duration}
            </Text>
          </View>

          <View className="mt-2 flex-row items-center">
            <Monitor size={14} color="#6B7280" />
            <Text className="ml-2 flex-1 text-[11px] font-medium text-gray-500">
              {item.batch}
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

export default TestCard;