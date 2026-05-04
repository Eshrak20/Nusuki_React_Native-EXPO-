import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";

import HolidayDetailsHero from "../../../components/holidayDetails/HolidayDetailsHero";
import HolidayImageGallery from "../../../components/holidayDetails/HolidayImageGallery";
import HolidayInfoSection from "../../../components/holidayDetails/HolidayInfoSection";
import HolidayOffers from "../../../components/holidayDetails/HolidayOffers";
import { useGetTourPackageDetailsQuery } from "@/redux/api/packageDetApi";
import BottomCallCTA from "@/components/common/BottomCallCTA/BottomCallCTA";


export default function HolidayPackageDetailsScreen() {
  const { id } = useLocalSearchParams<{
    id?: string;
  }>();

  const packageId = Number(id);

  const detailsQuery = useGetTourPackageDetailsQuery(packageId, {
    skip: !packageId,
  });

  const item = detailsQuery.data?.data;

  const lowestPrice = item?.offers
    ?.map((offer) => [
      offer.price_per_person_single,
      offer.price_per_person_double,
      offer.price_per_person_twin,
      offer.price_per_person_triple,
      offer.price_per_person_child_3_to_6,
      offer.price_per_person_child_7_to_12,
    ])
    .flat()
    .filter(Boolean)
    .map((value) => Number(value))
    .filter((value) => !Number.isNaN(value))
    .sort((a, b) => a - b)[0];

  if (!packageId) {
    return (
      <View className="flex-1 bg-gray-50">
        <StatusBar style="light" backgroundColor="#13275F" />
        <PageHeader title="Holiday Details" />

        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-bold text-red-500">
            Invalid holiday package route.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title="Holiday Details" />

      {detailsQuery.isLoading ? (
        <PageLoader message="Loading holiday details..." />
      ) : detailsQuery.isError || !item ? (
        <PageError
          message="Failed to load holiday details."
          onRetry={() => detailsQuery.refetch()}
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-32"
          >
            <HolidayDetailsHero item={item} />

            <View className="px-4">
              <HolidayImageGallery images={item.images ?? []} />

              <HolidayOffers offers={item.offers ?? []} />

              <HolidayInfoSection title="Highlights" html={item.highlights} />

              <HolidayInfoSection title="Itinerary" html={item.itinerary} />

              <HolidayInfoSection title="Included Services" html={item.included_service} />

              <HolidayInfoSection title="Pickup Note" html={item.pickup_note} />

              <HolidayInfoSection title="Tax" html={item.tax} />

              <HolidayInfoSection
                title="Cancellation Policy"
                html={item.cancelation_policy}
              />

              <HolidayInfoSection
                title="General Conditions"
                html={item.general_condition}
              />

              <HolidayInfoSection
                title="EMI Facility"
                html={item.equated_monthly_installment}
              />
            </View>
          </ScrollView>

          <BottomCallCTA
            label="Starting from"
            amount={lowestPrice}
            buttonText="Call Now"
          />
        </>
      )}
    </View>
  );
}