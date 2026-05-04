import { Text, View } from "react-native";
import { CheckCircle2, CircleDollarSign } from "lucide-react-native";
import DetailSection from "./DetailSection";
import type { PackageServiceGroup } from "../../types/pilgrimage/types.packageDetails";

type PackageServicesProps = {
  data: PackageServiceGroup[];
};

const PackageServices = ({ data }: PackageServicesProps) => {
  if (!data.length) return null;

  return (
    <DetailSection title="Included Services">
      {data.map((group) => (
        <View key={group.category} className="mb-4 last:mb-0">
          <Text className="mb-3 text-sm font-extrabold text-primary">
            {group.category}
          </Text>

          {group.services.map((service) => (
            <View
              key={service.id}
              className="mb-3 flex-row items-center rounded-2xl bg-gray-50 p-3"
            >
              {service.additional_fees ? (
                <CircleDollarSign size={18} color="#F59E0B" />
              ) : (
                <CheckCircle2 size={18} color="#16A34A" />
              )}

              <View className="ml-3 flex-1">
                <Text className="font-bold text-gray-800">{service.name}</Text>

                <Text className="mt-0.5 text-xs text-gray-500">
                  {service.additional_fees
                    ? "Additional fees may apply"
                    : "Included with package"}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </DetailSection>
  );
};

export default PackageServices;