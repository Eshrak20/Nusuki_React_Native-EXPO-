import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";

import VisaDetailHero from "../../../components/visaDetails/VisaDetailHero";
import VisaImportantInfo from "../../../components/visaDetails/VisaImportantInfo";
import VisaRequirements from "../../../components/visaDetails/VisaRequirements";
import VisaProcessTimeline from "../../../components/visaDetails/VisaProcessTimeline";
import { useGetVisaDetailsQuery } from "@/redux/api/packageDetApi";
import BottomCallCTA from "@/components/common/BottomCallCTA/BottomCallCTA";

export default function VisaDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const visaId = Number(id);

  const visaQuery = useGetVisaDetailsQuery(visaId, {
    skip: !visaId,
  });

  const item = visaQuery.data?.data;

  if (!visaId) {
    return (
      <View className="flex-1 bg-gray-50">
        <StatusBar style="light" backgroundColor="#13275F" />
        <PageHeader title="Visa Details" />

        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-bold text-red-500">
            Invalid visa details route.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title="Visa Details" />

      {visaQuery.isLoading ? (
        <PageLoader message="Loading visa details..." />
      ) : visaQuery.isError || !item ? (
        <PageError
          message="Failed to load visa details."
          onRetry={() => visaQuery.refetch()}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32"
          >
            <VisaDetailHero item={item} />

            <View className="px-4">
              <VisaImportantInfo item={item} />

              <VisaRequirements requirements={item.requirements ?? []} />

              <VisaProcessTimeline processes={item.processes ?? []} />
            </View>
          </ScrollView>

          <BottomCallCTA
            label="Service Fee"
            amount={item.service_fee}
            buttonText="Call Now"
          />
        </>
      )}
    </View>
  );
}
