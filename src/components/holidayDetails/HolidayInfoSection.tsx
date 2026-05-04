import { Text, View } from "react-native";
import { htmlToText } from "../../utils/htmlToText";

type HolidayInfoSectionProps = {
  title: string;
  html?: string | null;
};

const HolidayInfoSection = ({ title, html }: HolidayInfoSectionProps) => {
  const text = htmlToText(html);

  if (!text) return null;

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-lg font-extrabold text-gray-900">
        {title}
      </Text>

      <Text className="text-sm font-medium leading-6 text-gray-600">
        {text}
      </Text>
    </View>
  );
};

export default HolidayInfoSection;