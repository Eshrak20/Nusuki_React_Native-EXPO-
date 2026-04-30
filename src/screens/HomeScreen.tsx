import { ScrollView, View } from "react-native";
import AppHeader from "../components/AppHeader";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <AppHeader />

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
