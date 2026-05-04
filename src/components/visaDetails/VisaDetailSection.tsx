import { Text, View } from "react-native";

type VisaDetailSectionProps = {
  title: string;
  children: React.ReactNode;
};

const VisaDetailSection = ({ title, children }: VisaDetailSectionProps) => {
  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-lg font-extrabold text-gray-900">
        {title}
      </Text>

      {children}
    </View>
  );
};

export default VisaDetailSection;