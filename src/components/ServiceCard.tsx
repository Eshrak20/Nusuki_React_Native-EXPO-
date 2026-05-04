import { Pressable, Text, View } from "react-native";
import { Link, router } from "expo-router";
import {
  Plane,
  Hotel,
  BadgeCheck,
  Palmtree,
  Landmark,
  CircleDollarSign,
  GraduationCap,
  ClipboardList,
  School,
  ShoppingBag,
  HelpCircle,
} from "lucide-react-native";

import type { ServiceIconName } from "../types/service.types";

type Props = {
  title: string;
  icon: ServiceIconName;
  index?: number;
  route?: string;
};

const iconMap = {
  flight: Plane,
  hotel: Hotel,
  visa: BadgeCheck,
  holiday: Palmtree,
  hajj: Landmark,
  umrah: CircleDollarSign,
  course: GraduationCap,
  test: ClipboardList,
  university: School,
  shop: ShoppingBag,
} as const;

const colors = [
  "#EF6C73",
  "#4CAF50",
  "#14B8A6",
  "#F59E0B",
  "#9C27B0",
  "#607D8B",
  "#EC4899",
  "#F472B6",
  "#38BDF8",
  "#22C55E",
];

const ServiceCard = ({ title, icon, index = 0, route }: Props) => {
  const Icon = iconMap[icon] ?? HelpCircle;
  const color = colors[index % colors.length];
  return (
    <View className="mb-6 w-1/4 items-center">
      {route ? (
        <Link href={route} asChild>
          <Pressable className="items-center active:scale-95">
            <View className="mb-2 h-11 w-11 items-center justify-center">
              <Icon size={34} color={color} strokeWidth={1.8} />
            </View>

            <Text
              numberOfLines={2}
              className="text-center text-[11px] font-medium text-gray-700"
            >
              {title}
            </Text>
          </Pressable>
        </Link>
      ) : (
        /* Fallback view if there is no route */
        <View className="items-center opacity-50">
          <View className="mb-2 h-11 w-11 items-center justify-center">
            <Icon size={34} color={color} strokeWidth={1.8} />
          </View>
          <Text className="text-center text-[11px] font-medium text-gray-700">
            {title}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ServiceCard;
