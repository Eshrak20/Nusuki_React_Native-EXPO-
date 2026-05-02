import { ActivityIndicator, Text, View } from "react-native";

type PageLoaderProps = {
  message?: string;
};

const PageLoader = ({ message = "Loading..." }: PageLoaderProps) => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <ActivityIndicator size="large" color="#13275F" />

      <Text className="mt-3 text-center text-sm font-medium text-gray-500">
        {message}
      </Text>
    </View>
  );
};

export default PageLoader;