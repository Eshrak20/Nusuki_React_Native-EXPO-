import { router, useNavigation } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { ArrowLeft, Pencil } from "lucide-react-native";
import FlightTimer from "./FlightTimer";

type FlightTicketHeaderProps = {
  title: string;
  subtitle?: string;
};

const FlightTicketHeader = ({ title, subtitle }: FlightTicketHeaderProps) => {
  const navigation = useNavigation();

  const handleGoBackToSearch = () => {
    if (navigation.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/flight");
  };

  return (
    <View className="bg-primary pt-11">
      <View className="flex-row items-center px-4 pb-4">
        <TouchableOpacity onPress={handleGoBackToSearch} className="mr-3">
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View className="flex-1">
          <Text className="text-lg font-extrabold text-white">{title}</Text>

          {subtitle ? (
            <Text className="mt-0.5 text-xs font-medium text-white/80">
              {subtitle}
            </Text>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleGoBackToSearch}
          className="h-11 w-11 items-center justify-center rounded-2xl bg-white/10"
        >
          <Pencil size={19} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <FlightTimer />
    </View>
  );
};

export default FlightTicketHeader;