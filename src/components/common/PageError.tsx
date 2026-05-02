import { Text, TouchableOpacity, View } from "react-native";
import { AlertCircle } from "lucide-react-native";

type PageErrorProps = {
  message?: string;
  buttonText?: string;
  onRetry?: () => void;
};

const PageError = ({
  message = "Something went wrong.",
  buttonText = "Try Again",
  onRetry,
}: PageErrorProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <View className="mb-4 h-14 w-14 items-center justify-center rounded-full bg-red-50">
        <AlertCircle size={30} color="#EF4444" strokeWidth={2} />
      </View>

      <Text className="text-center text-base font-semibold text-red-500">
        {message}
      </Text>

      {onRetry ? (
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onRetry}
          className="mt-5 rounded-2xl bg-primary px-6 py-3"
        >
          <Text className="font-bold text-white">{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PageError;