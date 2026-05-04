import { Image, Text, View } from "react-native";
import {
  BadgeCheck,
  Clock3,
  CreditCard,
  FileText,
  Plane,
} from "lucide-react-native";
import type { VisaDetails } from "../../types/visa/types.visaDetails";

type VisaDetailHeroProps = {
  item: VisaDetails;
};

const VisaDetailHero = ({ item }: VisaDetailHeroProps) => {
  const fee = Number(item.service_fee || 0).toLocaleString("en-BD");

  return (
    <View className="mb-5 rounded-b-[32px] bg-primary px-4 pb-5 pt-5">
      <View className="rounded-3xl bg-white/10 p-4">
        <View className="flex-row items-center">
          <View className="h-20 w-20 items-center justify-center overflow-hidden rounded-3xl bg-white">
            <Image
              source={{ uri: item.country_flag_url }}
              className="h-14 w-14"
              resizeMode="contain"
            />
          </View>

          <View className="ml-4 flex-1">
            <Text
              numberOfLines={2}
              className="text-2xl font-extrabold leading-8 text-white"
            >
              {item.country}
            </Text>

            <View className="mt-2 self-start rounded-full bg-white/15 px-3 py-1">
              <Text className="text-xs font-extrabold text-white">
                {item.visa_category}
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-5 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <CreditCard size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Service Fee
            </Text>
            <Text className="text-base font-extrabold text-white">
              ৳ {fee}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <Clock3 size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Processing
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.processing_time}
            </Text>
          </View>
        </View>

        <View className="mt-3 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <Plane size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Entry
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.entry_type}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <FileText size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Visa Type
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.visa_type}
            </Text>
          </View>
        </View>

        <View className="mt-3 flex-row gap-3">
          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <BadgeCheck size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Validity
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.visa_validity}
            </Text>
          </View>

          <View className="flex-1 rounded-2xl bg-white/10 p-3">
            <BadgeCheck size={18} color="#FFFFFF" />
            <Text className="mt-2 text-xs font-medium text-white/70">
              Stay
            </Text>
            <Text numberOfLines={1} className="text-base font-extrabold text-white">
              {item.staying_validity} Days
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default VisaDetailHero;