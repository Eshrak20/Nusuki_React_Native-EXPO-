import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { MessageCircle } from "lucide-react-native";

import AppHeader from "../components/AppHeader";
import ServiceCard from "../components/ServiceCard";
import AdBannerCarousel from "../components/AdBannerCarousel";
import { services } from "../data/services";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
  const handleOpenSupportChat = () => {
    router.push("/support-chat");
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" backgroundColor="#13275F" />

      <SafeAreaView edges={["top"]} className="bg-primary">
        <AppHeader />
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pt-6 pb-28"
      >
        <View className="flex-row flex-wrap px-4 pt-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              icon={service.icon}
              index={index}
              route={service.route}
            />
          ))}
        </View>

        <View className="px-4 pt-6">
          <TouchableOpacity
            onPress={handleOpenSupportChat}
            activeOpacity={0.85}
            className="flex-row items-center rounded-2xl bg-primary px-4 py-4"
          >
            <View className="mr-3 h-11 w-11 items-center justify-center rounded-full bg-white/15">
              <MessageCircle size={22} color="#FFFFFF" />
            </View>

            <View className="flex-1">
              <Text className="text-base font-extrabold text-white">
                Chat with Nusuki Team
              </Text>
              <Text className="mt-1 text-xs font-medium text-white/70">
                Need help? Send us a message anytime.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <AdBannerCarousel />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;