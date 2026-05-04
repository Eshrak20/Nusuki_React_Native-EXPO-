import { Image, ScrollView, Text, View } from "react-native";
import type { HolidayPackageImage } from "../../types/holiday/types.tourPackageDetails";

type HolidayImageGalleryProps = {
  images: HolidayPackageImage[];
};

const HolidayImageGallery = ({ images }: HolidayImageGalleryProps) => {
  if (!images.length) return null;

  return (
    <View className="mb-5 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
      <Text className="mb-4 text-lg font-extrabold text-gray-900">
        Gallery
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3">
          {images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.image_url }}
              className="h-36 w-56 rounded-3xl bg-gray-100"
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>

      <Text className="mt-3 text-xs font-medium text-gray-500">
        Swipe to view more images
      </Text>
    </View>
  );
};

export default HolidayImageGallery;