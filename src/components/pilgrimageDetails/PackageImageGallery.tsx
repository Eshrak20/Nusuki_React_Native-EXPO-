import { Image, ScrollView, Text, View } from "react-native";
import DetailSection from "./DetailSection";
import type { PackageImage } from "../../types/pilgrimage/types.packageDetails";

type PackageImageGalleryProps = {
  images: PackageImage[];
};

const PackageImageGallery = ({ images }: PackageImageGalleryProps) => {
  if (!images.length) return null;

  return (
    <DetailSection title="Gallery">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex-row gap-3">
          {images.map((image) => (
            <Image
              key={image.id}
              source={{ uri: image.image_url }}
              className="h-32 w-48 rounded-3xl bg-gray-100"
              resizeMode="cover"
            />
          ))}
        </View>
      </ScrollView>

      <Text className="mt-3 text-xs font-medium text-gray-500">
        Swipe to see more images
      </Text>
    </DetailSection>
  );
};

export default PackageImageGallery;