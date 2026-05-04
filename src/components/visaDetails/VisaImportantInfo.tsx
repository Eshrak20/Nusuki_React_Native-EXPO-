import { Text, View } from "react-native";
import { AlertCircle } from "lucide-react-native";
import VisaDetailSection from "./VisaDetailSection";
import type { VisaDetails } from "../../types/visa/types.visaDetails";

type VisaImportantInfoProps = {
  item: VisaDetails;
};

const VisaImportantInfo = ({ item }: VisaImportantInfoProps) => {
  if (!item.imp_info) return null;

  return (
    <VisaDetailSection title="Important Information">
      <View className="flex-row rounded-2xl bg-amber-50 p-4">
        <AlertCircle size={20} color="#D97706" />

        <Text className="ml-3 flex-1 text-sm font-semibold leading-6 text-amber-700">
          {item.imp_info}
        </Text>
      </View>
    </VisaDetailSection>
  );
};

export default VisaImportantInfo;