import { Pressable, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
  icon: string;
};

const ServiceCard = ({ title, subtitle, icon }: Props) => {
  return (
    <Pressable className="w-[48%] md:w-[31%] min-h-28 rounded-2xl border border-primary-light/30 bg-white p-4 flex-row items-center active:scale-95">
      <View className="h-12 w-12 rounded-xl bg-primary-light/30 items-center justify-center mr-3">
        <Text className="text-xl">{icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-primary font-semibold text-sm">{title}</Text>
        <Text className="text-gray-500 text-xs mt-1">{subtitle}</Text>
      </View>
    </Pressable>
  );
};

export default ServiceCard;
