import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";

import PackageDetailHero from "../../../components/pilgrimageDetails/PackageDetailHero";
import PackageOverview from "../../../components/pilgrimageDetails/PackageOverview";
import PackageServices from "../../../components/pilgrimageDetails/PackageServices";
import PackageSightSeeing from "../../../components/pilgrimageDetails/PackageSightSeeing";
import PackageImageGallery from "../../../components/pilgrimageDetails/PackageImageGallery";
import PackageAccommodations from "../../../components/pilgrimageDetails/PackageAccommodations";
import PackageItineraries from "../../../components/pilgrimageDetails/PackageItineraries";
import {
  useGetHajjPackageDetailsQuery,
  useGetUmrahPackageDetailsQuery,
} from "@/redux/api/packageDetApi";
import BottomCallCTA from "@/components/common/BottomCallCTA/BottomCallCTA";

export default function PilgrimagePackageDetailScreen() {
  const { id, type } = useLocalSearchParams<{
    id?: string;
    type?: "hajj" | "umrah";
  }>();

  const packageId = Number(id);
  const isHajj = type === "hajj";
  const isUmrah = type === "umrah";

  const hajjQuery = useGetHajjPackageDetailsQuery(packageId, {
    skip: !packageId || !isHajj,
  });

  const umrahQuery = useGetUmrahPackageDetailsQuery(packageId, {
    skip: !packageId || !isUmrah,
  });

  const activeQuery = isHajj ? hajjQuery : umrahQuery;

  const item = activeQuery.data?.data;

  if (!packageId || (!isHajj && !isUmrah)) {
    return (
      <View className="flex-1 bg-gray-50">
        <StatusBar style="light" backgroundColor="#13275F" />
        <PageHeader title="Package Details" />

        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-bold text-red-500">
            Invalid package details route.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title={isHajj ? "Hajj Details" : "Umrah Details"} />

      {activeQuery.isLoading ? (
        <PageLoader message="Loading package details..." />
      ) : activeQuery.isError || !item ? (
        <PageError
          message="Failed to load package details."
          onRetry={() => activeQuery.refetch()}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32"
          >
            <PackageDetailHero item={item} type={isHajj ? "hajj" : "umrah"} />

            <View className="px-4">
              <PackageOverview item={item} />

              <PackageImageGallery images={item.images ?? []} />

              <PackageServices data={item.package_services ?? []} />

              <PackageSightSeeing data={item.package_sight_seeings ?? []} />

              <PackageAccommodations data={item.package_accommodations ?? []} />

              <PackageItineraries data={item.package_itineraries ?? []} />
            </View>
          </ScrollView>

          <BottomCallCTA
            label="Starting from"
            amount={item.price}
            buttonText="Call Now"
          />
        </>
      )}
    </View>
  );
}
