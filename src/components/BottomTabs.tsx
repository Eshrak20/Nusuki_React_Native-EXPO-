import { View, Text, Pressable } from "react-native";
import { router, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const tabs = [
  { label: "Home", path: "/" },
  { label: "Booked", path: "/booked" },
  { label: "Payment", path: "/payment" },
  { label: "Account", path: "/account" },
];

const BottomTabs = () => {
  const pathname = usePathname();

  return (
    <SafeAreaView
      edges={["bottom"]}
      className="absolute bottom-0 left-0 right-0"
    >
      <View className="px-4 pb-3">
        <View className="bg-white/95 backdrop-blur-md border border-primary-light/20 rounded-3xl px-2 py-2 flex-row justify-between shadow-lg">
          
          {tabs.map((tab) => {
            const active = pathname === tab.path;

            return (
              <Pressable
                key={tab.path}
                onPress={() => router.push(tab.path as never)}
                className="flex-1 items-center justify-center"
              >
                <View
                  className={`px-4 py-2 rounded-2xl ${
                    active ? "bg-primary/10" : ""
                  }`}
                >
                  <Text
                    className={`text-sm ${
                      active
                        ? "text-primary font-semibold"
                        : "text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}

        </View>
      </View>
    </SafeAreaView>
  );
};

export default BottomTabs;