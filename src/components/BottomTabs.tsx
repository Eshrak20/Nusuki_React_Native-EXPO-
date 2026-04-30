import { View, Text, Pressable } from "react-native";
import { router, usePathname } from "expo-router";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Booked", path: "/booked" },
  { label: "Payment", path: "/payment" },
  { label: "Account", path: "/account" },
];

const BottomTabs = () => {
  const pathname = usePathname();

  return (
    <View className="absolute bottom-4 left-4 right-4 bg-white border border-primary-light/30 rounded-2xl p-2 flex-row justify-between">
      {tabs.map((tab) => {
        const active = pathname === tab.path;

        return (
          <Pressable
            key={tab.path}
            onPress={() => router.push(tab.path as never)}
            className={`flex-1 mx-1 py-2 rounded-xl items-center ${
              active ? "bg-primary-light/20" : ""
            }`}
          >
            <Text
              className={`${
                active ? "text-primary font-semibold" : "text-gray-500"
              }`}
            >
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default BottomTabs;