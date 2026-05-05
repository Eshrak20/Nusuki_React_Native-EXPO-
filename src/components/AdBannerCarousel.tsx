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
import { ChevronLeft, ChevronRight, Mail } from "lucide-react-native";

const { width } = Dimensions.get("window");

const SECTION_PADDING = 16;
const CARD_WIDTH = width - SECTION_PADDING * 2;
const CARD_HEIGHT = 170;

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
    highlight: "Eshrak",
    subtitle:
      "Nusuki is designed to make travel services simple, fast and user-friendly.",
    email: "eshrakg62@gmail.com",
  },
  {
    id: 5,
    title: "Powered By",
    highlight: "ilabs",
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
        <View>
          <Text className="text-base font-extrabold text-slate-900">
            Sponsored
          </Text>
          <Text className="mt-0.5 text-xs font-medium text-slate-500">
            Featured Nusuki updates
          </Text>
        </View>

        <View className="rounded-full bg-slate-100 px-3 py-1">
          <Text className="text-xs font-extrabold text-slate-500">
            {activeIndex + 1}/{ads.length}
          </Text>
        </View>
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
          scrollEventThrottle={16}
          className="rounded-3xl"
        >
          {ads.map((ad) => (
            <TouchableOpacity
              key={ad.id}
              activeOpacity={0.92}
              className="overflow-hidden rounded-3xl"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
              }}
            >
              <LinearGradient
                colors={["#13275F", "#1C367A", "#0E1D48"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="relative h-full overflow-hidden rounded-3xl px-5 py-5"
              >
                <View className="absolute -left-12 -top-10 h-36 w-36 rounded-full border border-white/10" />
                <View className="absolute right-8 top-6 h-20 w-20 rounded-full border border-white/10" />
                <View className="absolute -bottom-16 right-0 h-44 w-44 rounded-full border border-white/10" />

                <View className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1">
                  <Text className="text-[10px] font-extrabold text-[#13275F]">
                    AD
                  </Text>
                </View>

                <View className="flex-1 justify-between">
                  <View className="pr-12">
                    <View className="flex-row flex-wrap items-center gap-2">
                      <Text
                        numberOfLines={1}
                        className="text-2xl font-light text-white"
                      >
                        {ad.title}
                      </Text>

                      <View className="rounded-xl bg-orange-500 px-4 py-2">
                        <Text className="text-4xl font-extrabold text-white">
                          {ad.highlight}
                        </Text>
                      </View>
                    </View>

                    <Text
                      numberOfLines={2}
                      className="mt-3 text-sm font-medium leading-5 text-white/75"
                    >
                      {ad.subtitle}
                    </Text>
                  </View>

                  <View className="flex-row items-center rounded-2xl bg-white/10 px-3 py-2">
                    <Mail size={14} color="rgba(255,255,255,0.75)" />
                    <Text
                      numberOfLines={1}
                      className="ml-2 flex-1 text-xs font-semibold text-white/75"
                    >
                      {ad.email}
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <TouchableOpacity
          onPress={() => goToSlide("prev")}
          activeOpacity={0.8}
          className="absolute left-3 top-1/2 h-9 w-9 -translate-y-5 items-center justify-center rounded-full bg-white/20"
        >
          <ChevronLeft size={18} color="#FFFFFF" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => goToSlide("next")}
          activeOpacity={0.8}
          className="absolute right-3 top-1/2 h-9 w-9 -translate-y-5 items-center justify-center rounded-full bg-white/20"
        >
          <ChevronRight size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View className="mt-4 flex-row justify-center gap-2">
        {ads.map((item, index) => (
          <View
            key={item.id}
            className={`h-2 rounded-full ${
              activeIndex === index ? "w-7 bg-primary" : "w-2 bg-slate-300"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default AdBannerCarousel;
