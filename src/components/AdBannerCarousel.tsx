import { useRef, useState } from "react";
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, ChevronRight } from "lucide-react-native";

const { width } = Dimensions.get("window");

const CARD_WIDTH = width - 32;

type AdItem = {
  id: number;
  title: string;
  highlight: string;
  subtitle: string;
  email: string;
};

const ads: AdItem[] = [
  {
    id: 1,
    title: "Built By",
    highlight: "Eshrak",
    subtitle: "Nusuki app is developed with care by Eshrak.",
    email: "eshrakg62@gmail.com",
  },
  {
    id: 2,
    title: "Nusuki",
    highlight: "App",
    subtitle:
      "A smart travel platform for flights, visa, hotels, hajj, umrah and holidays.",
    email: "eshrakg62@gmail.com",
  },
  {
    id: 3,
    title: "Need",
    highlight: "Support?",
    subtitle: "For app support, feedback, or business inquiry, contact Eshrak.",
    email: "eshrakg62@gmail.com",
  },
  {
    id: 4,
    title: "Developed",
    highlight: "With Care",
    subtitle:
      "Nusuki is designed to make travel services simple, fast and user-friendly.",
    email: "eshrakg62@gmail.com",
  },
  {
    id: 5,
    title: "Powered By",
    highlight: "Nusuki",
    subtitle:
      "Explore travel, education, shop, visa, hajj, umrah and more in one app.",
    email: "eshrakg62@gmail.com",
  },
];

const AdBannerCarousel = () => {
  const scrollRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentIndex = Math.round(
      event.nativeEvent.contentOffset.x / CARD_WIDTH,
    );

    setActiveIndex(currentIndex);
  };

  const goToSlide = (direction: "prev" | "next") => {
    let nextIndex = activeIndex;

    if (direction === "next") {
      nextIndex = activeIndex === ads.length - 1 ? 0 : activeIndex + 1;
    } else {
      nextIndex = activeIndex === 0 ? ads.length - 1 : activeIndex - 1;
    }

    scrollRef.current?.scrollTo({
      x: nextIndex * CARD_WIDTH,
      animated: true,
    });

    setActiveIndex(nextIndex);
  };

  return (
    <View className="mt-8 px-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-base font-extrabold text-slate-900">
          Sponsored
        </Text>

        <Text className="text-xs font-semibold text-slate-400">
          {activeIndex + 1}/{ads.length}
        </Text>
      </View>

      <View className="relative">
        <ScrollView
          ref={scrollRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          onMomentumScrollEnd={handleScroll}
          className="rounded-2xl"
        >
          {ads.map((ad) => (
            <TouchableOpacity
              key={ad.id}
              activeOpacity={0.9}
              className="overflow-hidden rounded-2xl"
              style={{ width: CARD_WIDTH }}
            >
              <LinearGradient
                colors={["#070B4F", "#151B75", "#080B46"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="relative min-h-32 justify-center overflow-hidden rounded-2xl px-6 py-6"
              >
                <View className="absolute -left-10 -top-8 h-32 w-32 rounded-full border border-white/10" />
                <View className="absolute left-10 top-4 h-24 w-24 rounded-full border border-white/10" />
                <View className="absolute -bottom-10 right-10 h-36 w-36 rounded-full border border-white/10" />

                <View className="absolute right-3 top-3 rounded-md bg-white px-2 py-1">
                  <Text className="text-[10px] font-extrabold text-primary">
                    AD
                  </Text>
                </View>

                <View className="flex-row flex-wrap items-center gap-2">
                  <Text className="text-4xl font-light text-white">
                    {ad.title}
                  </Text>

                  <View className="rounded-xl bg-orange-500 px-4 py-2">
                    <Text className="text-4xl font-extrabold text-white">
                      {ad.highlight}
                    </Text>
                  </View>
                </View>

                <Text className="mt-3 text-sm font-medium text-white/70">
                  {ad.subtitle}
                </Text>
                <Text className="mt-1 text-xs font-semibold text-white/60">
                  {ad.email}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => goToSlide("prev")}
          activeOpacity={0.8}
          className="absolute left-3 top-1/2 h-9 w-9 -translate-y-5 items-center justify-center rounded-full bg-black/25"
        >
          <ChevronLeft size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goToSlide("next")}
          activeOpacity={0.8}
          className="absolute right-3 top-1/2 h-9 w-9 -translate-y-5 items-center justify-center rounded-full bg-black/25"
        >
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="mt-3 flex-row justify-center gap-2">
        {ads.map((item, index) => (
          <View
            key={item.id}
            className={`h-2 rounded-full ${
              activeIndex === index ? "w-6 bg-primary" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default AdBannerCarousel;
