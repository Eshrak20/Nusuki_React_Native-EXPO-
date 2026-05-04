import { Text, View } from "react-native";
import { Clock3, MapPin } from "lucide-react-native";
import DetailSection from "./DetailSection";
import type { PackageSightSeeingGroup } from "../../types/pilgrimage/types.packageDetails";

type PackageSightSeeingProps = {
  data: PackageSightSeeingGroup[];
};

const PackageSightSeeing = ({ data }: PackageSightSeeingProps) => {
  if (!data.length) return null;

  return (
    <DetailSection title="Sightseeing">
      {data.map((group) => (
        <View key={group.category} className="mb-4 last:mb-0">
          <Text className="mb-3 text-sm font-extrabold text-primary">
            {group.category}
          </Text>

          {group.activities.map((activity) => (
            <View
              key={activity.id}
              className="mb-3 rounded-2xl bg-gray-50 p-3"
            >
              <View className="flex-row items-center">
                <MapPin size={17} color="#13275F" />

                <Text className="ml-2 flex-1 font-bold text-gray-800">
                  {activity.name}
                </Text>
              </View>

              <View className="mt-2 flex-row items-center">
                <Clock3 size={15} color="#6B7280" />

                <Text className="ml-2 text-xs font-medium text-gray-500">
                  Duration: {activity.activity_duration}
                </Text>

                {activity.additional_fees ? (
                  <Text className="ml-2 text-xs font-bold text-orange-500">
                    • Extra fees
                  </Text>
                ) : null}
              </View>
            </View>
          ))}
        </View>
      ))}
    </DetailSection>
  );
};

export default PackageSightSeeing;