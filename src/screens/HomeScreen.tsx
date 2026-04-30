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
        <View className="flex-row flex-wrap justify-between gap-4">
          {services.map((item) => (
            <ServiceCard
              key={item.id}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          ))}
        </View>
      </ScrollView>


    </View>
  );
};

export default HomeScreen;