import { Text, View } from "react-native";
import { CheckCircle2 } from "lucide-react-native";
import VisaDetailSection from "./VisaDetailSection";
import type { VisaRequirement } from "../../types/visa/types.visaDetails";

type VisaRequirementsProps = {
  requirements: VisaRequirement[];
};

const labelMap: Record<string, string> = {
  basic: "Basic Requirements",
  for_student: "For Students",
  for_job_holder: "For Job Holders",
  for_service_holder: "For Business / Service Holders",
  for_house_wife: "For Housewife",
};

const formatTypeLabel = (type: string) => {
  return labelMap[type] || type.replace(/_/g, " ");
};

const groupRequirements = (requirements: VisaRequirement[]) => {
  return requirements.reduce<Record<string, VisaRequirement[]>>((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }

    acc[item.type].push(item);

    return acc;
  }, {});
};

const VisaRequirements = ({ requirements }: VisaRequirementsProps) => {
  if (!requirements.length) return null;

  const groupedRequirements = groupRequirements(requirements);

  return (
    <VisaDetailSection title="Required Documents">
      {Object.entries(groupedRequirements).map(([type, items]) => (
        <View key={type} className="mb-5 last:mb-0">
          <View className="mb-3 self-start rounded-full bg-primary/10 px-3 py-1.5">
            <Text className="text-xs font-extrabold capitalize text-primary">
              {formatTypeLabel(type)}
            </Text>
          </View>

          {items.map((requirement) => (
            <View
              key={requirement.id}
              className="mb-3 flex-row rounded-2xl bg-gray-50 p-3"
            >
              <CheckCircle2 size={18} color="#16A34A" />

              <Text className="ml-3 flex-1 text-sm font-semibold leading-5 text-gray-700">
                {requirement.requirement_name}
              </Text>
            </View>
          ))}
        </View>
      ))}
    </VisaDetailSection>
  );
};

export default VisaRequirements;