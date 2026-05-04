import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import {
  BadgeCheck,
  CalendarDays,
  Clock3,
  Globe2,
  Info,
  PlaneTakeoff,
} from "lucide-react-native";
import type { VisaItem } from "../../types/visa/types.visaPackage";
import { router } from "expo-router";

type VisaCardProps = {
  item: VisaItem;
};

const VisaCard = ({ item }: VisaCardProps) => {
  const serviceFee = Number(item.service_fee || 0).toLocaleString("en-BD");

  const handleCallNow = () => {
    Linking.openURL("tel:09600000000");
  };

  const handleViewDetails = () => {
    router.push({
      pathname: "/visa/details",
      params: {
        id: String(item.id),
      },
    });
  };

  return (
    <View className="mb-5 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <View className="p-4">
        <View className="flex-row items-start">
          <View className="h-16 w-16 overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <Image
              source={{ uri: item.country_flag_url }}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>

          <View className="ml-4 flex-1">
            <Text
              numberOfLines={2}
              className="text-lg font-extrabold text-gray-900"
            >
              {item.country}
            </Text>

            <View className="mt-2 self-start rounded-full bg-primary/10 px-3 py-1">
              <Text className="text-xs font-bold text-primary">
                {item.visa_category}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5 rounded-3xl bg-gray-50 p-4">
          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <CalendarDays size={17} color="#13275F" />
              <Text className="ml-2 text-sm font-semibold text-gray-600">
                Visa Validity
              </Text>
            </View>

            <Text className="text-sm font-bold text-gray-900">
              {item.visa_validity}
            </Text>
          </View>

          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Clock3 size={17} color="#13275F" />
              <Text className="ml-2 text-sm font-semibold text-gray-600">
                Processing
              </Text>
            </View>

            <Text className="max-w-[48%] text-right text-sm font-bold text-gray-900">
              {item.processing_time}
            </Text>
          </View>

          <View className="mb-3 flex-row items-center justify-between">
            <View className="flex-row items-center">
              <PlaneTakeoff size={17} color="#13275F" />
              <Text className="ml-2 text-sm font-semibold text-gray-600">
                Entry Type
              </Text>
            </View>

            <Text className="text-sm font-bold text-gray-900">
              {item.entry_type}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Globe2 size={17} color="#13275F" />
              <Text className="ml-2 text-sm font-semibold text-gray-600">
                Visa Type
              </Text>
            </View>

            <Text className="text-sm font-bold text-gray-900">
              {item.visa_type}
            </Text>
          </View>
        </View>

        <View className="mt-4 flex-row items-center justify-between rounded-2xl bg-primary px-4 py-4">
          <View>
            <Text className="text-xs font-medium text-white/70">
              Service Fee
            </Text>
            <Text className="text-xl font-extrabold text-white">
              ৳ {serviceFee}
            </Text>
          </View>

          <View className="rounded-full bg-white/15 px-3 py-1">
            <Text className="text-xs font-bold text-white">
              Stay {item.staying_validity} Days
            </Text>
          </View>
        </View>

        {item.imp_info ? (
          <View className="mt-4 flex-row rounded-2xl bg-amber-50 p-3">
            <Info size={17} color="#D97706" />
            <Text className="ml-2 flex-1 text-xs font-medium text-amber-700">
              {item.imp_info}
            </Text>
          </View>
        ) : null}

        <View className="mt-5 flex-row gap-3">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleViewDetails}
            className="flex-1 rounded-2xl bg-primary py-3"
          >
            <View className="flex-row items-center justify-center">
              <BadgeCheck size={17} color="#FFFFFF" />
              <Text className="ml-2 font-bold text-white">View Details</Text>
            </View>
          </TouchableOpacity>

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

export default VisaCard;
