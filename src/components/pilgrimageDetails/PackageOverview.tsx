import { Text, View } from "react-native";
import DetailSection from "./DetailSection";
import type { PilgrimagePackageDetails } from "../../types/pilgrimage/types.packageDetails";

type PackageOverviewProps = {
  item: PilgrimagePackageDetails;
};

const PackageOverview = ({ item }: PackageOverviewProps) => {
  return (
    <DetailSection title="Package Overview">
      <View className="mb-4 flex-row flex-wrap gap-2">
        <View className="rounded-full bg-primary/10 px-3 py-1.5">
          <Text className="text-xs font-extrabold text-primary">
            {item.company_name}
          </Text>
        </View>

        <View className="rounded-full bg-primary/10 px-3 py-1.5">
          <Text className="text-xs font-extrabold text-primary">
            {item.package_type}
          </Text>
        </View>

        <View className="rounded-full bg-primary/10 px-3 py-1.5">
          <Text className="text-xs font-extrabold text-primary">
            {item.flight_type}
          </Text>
        </View>
      </View>

      <Text className="text-sm font-medium leading-6 text-gray-600">
        {item.overview || "Package overview is not available right now."}
      </Text>
    </DetailSection>
  );
};

export default PackageOverview;