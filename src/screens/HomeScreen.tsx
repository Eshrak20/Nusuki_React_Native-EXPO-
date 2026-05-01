import { ScrollView, View } from "react-native";
import AppHeader from "../components/AppHeader";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const HomeScreen = () => {
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
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
