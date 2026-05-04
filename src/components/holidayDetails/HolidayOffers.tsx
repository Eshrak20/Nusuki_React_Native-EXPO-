import { Text, View } from "react-native";
import type { HolidayPackageOffer } from "../../types/holiday/types.tourPackageDetails";
import HolidayOfferCard from "./HolidayOfferCard";

type HolidayOffersProps = {
  offers: HolidayPackageOffer[];
};

const HolidayOffers = ({ offers }: HolidayOffersProps) => {
  if (!offers.length) return null;

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-lg font-extrabold text-gray-900">
        Available Offers
      </Text>

      {offers.map((offer) => (
        <HolidayOfferCard key={offer.id} offer={offer} />
      ))}
    </View>
  );
};

export default HolidayOffers;