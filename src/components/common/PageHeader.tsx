import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";

type PageHeaderProps = {
  title: string;
  total?: number;
  totalLabel?: string;
  showBackButton?: boolean;
  fallbackRoute?: string;
};

const PageHeader = ({
  title,
  total,
  totalLabel = "items available",
  showBackButton = true,
  fallbackRoute = "/",
}: PageHeaderProps) => {
  const shouldShowTotal = typeof total === "number";

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace(fallbackRoute as never);
  };

  return (
    <SafeAreaView edges={["top"]} className="bg-primary">
      <View className="flex-row items-center px-4 py-4">
        {showBackButton ? (
          <TouchableOpacity
            onPress={handleBack}
            className="h-10 w-10 items-center justify-center rounded-full bg-white/10"
          >
            <ArrowLeft size={22} color="#FFFFFF" />
          </TouchableOpacity>
        ) : null}

        <View className={showBackButton ? "ml-4 flex-1" : "flex-1"}>
          <Text className="text-xl font-extrabold text-white">{title}</Text>

          {shouldShowTotal ? (
            <Text className="mt-0.5 text-xs font-medium text-white/70">
              {total} {totalLabel}
            </Text>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageHeader;