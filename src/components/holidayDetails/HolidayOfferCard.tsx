import { Text, TouchableOpacity, View } from "react-native";
import { CalendarDays, PlaneTakeoff } from "lucide-react-native";
import type { HolidayPackageOffer } from "../../types/holiday/types.tourPackageDetails";
import { htmlToText } from "../../utils/htmlToText";

type HolidayOfferCardProps = {
  offer: HolidayPackageOffer;
};

const formatPrice = (value: string | null) => {
  if (!value) return null;

  return Number(value).toLocaleString("en-BD");
};

const PriceRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  const price = formatPrice(value);

  if (!price) return null;

  return (
    <View className="mb-2 flex-row justify-between">
      <Text className="text-sm font-medium text-gray-500">{label}</Text>
      <Text className="text-sm font-extrabold text-primary">৳ {price}</Text>
    </View>
  );
};

const HolidayOfferCard = ({ offer }: HolidayOfferCardProps) => {
  const description = htmlToText(offer.description);

  return (
    <View className="mb-4 rounded-3xl bg-gray-50 p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <View className="rounded-full bg-primary px-3 py-1.5">
          <Text className="text-xs font-extrabold text-white">
            {offer.name}
          </Text>
        </View>

        <View className="flex-row items-center">
          <CalendarDays size={14} color="#6B7280" />
          <Text className="ml-1 text-xs font-bold text-gray-500">
            {offer.departs}
          </Text>
        </View>
      </View>

      <Text className="mb-3 text-xs font-medium text-gray-500">
        Valid: {offer.valid_from} to {offer.valid_until}
      </Text>

      <View className="rounded-2xl bg-white p-3">
        <PriceRow label="Single" value={offer.price_per_person_single} />
        <PriceRow label="Double" value={offer.price_per_person_double} />
        <PriceRow label="Twin" value={offer.price_per_person_twin} />
        <PriceRow label="Triple" value={offer.price_per_person_triple} />
        <PriceRow label="Child 3-6" value={offer.price_per_person_child_3_to_6} />
        <PriceRow label="Child 7-12" value={offer.price_per_person_child_7_to_12} />
      </View>

      {description ? (
        <Text className="mt-3 text-sm leading-5 text-gray-600">
          {description}
        </Text>
      ) : null}

      {/* <TouchableOpacity
        activeOpacity={0.85}
        className="mt-4 flex-row items-center justify-center rounded-2xl bg-primary py-3.5"
      >
        <PlaneTakeoff size={16} color="#FFFFFF" />
        <Text className="ml-2 font-extrabold text-white">Request Offer</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default HolidayOfferCard;