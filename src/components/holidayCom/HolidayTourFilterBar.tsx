import { Filter, X } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

type HolidayTourFilterBarProps = {
  selectedTypeName?: string;
  selectedRegionName?: string;
  showRegion?: boolean;

  onOpenType: () => void;
  onOpenRegion: () => void;

  onClearType?: () => void;
  onClearRegion?: () => void;
};

const HolidayTourFilterBar = ({
  selectedTypeName,
  selectedRegionName,
  showRegion = false,
  onOpenType,
  onOpenRegion,
  onClearType,
  onClearRegion,
}: HolidayTourFilterBarProps) => {
  return (
    <View className="border-b border-gray-100 bg-white px-4 py-4">
      <View className="flex-row gap-3">
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenType}
          className="min-h-12 flex-1 flex-row items-center justify-center rounded-2xl bg-primary px-3 py-3"
        >
          <Filter size={18} color="#FFFFFF" />

          <Text
            numberOfLines={1}
            className="ml-2 flex-1 text-center text-sm font-extrabold text-white"
          >
            {selectedTypeName || "Tour Type"}
          </Text>

          {selectedTypeName && onClearType ? (
            <TouchableOpacity
              onPress={onClearType}
              className="ml-1 h-6 w-6 items-center justify-center rounded-full bg-white/15"
            >
              <X size={14} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
        </TouchableOpacity>

        {showRegion ? (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={onOpenRegion}
            className="min-h-12 flex-1 flex-row items-center justify-center rounded-2xl border border-primary bg-primary/10 px-3 py-3"
          >
            <Filter size={18} color="#13275F" />

            <Text
              numberOfLines={1}
              className="ml-2 flex-1 text-center text-sm font-extrabold text-primary"
            >
              {selectedRegionName || "Region"}
            </Text>

            {selectedRegionName && onClearRegion ? (
              <TouchableOpacity
                onPress={onClearRegion}
                className="ml-1 h-6 w-6 items-center justify-center rounded-full bg-primary/10"
              >
                <X size={14} color="#13275F" />
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        ) : null}
      </View>

      {(selectedTypeName || selectedRegionName) ? (
        <View className="mt-3 flex-row flex-wrap gap-2">
          {selectedTypeName ? (
            <View className="flex-row items-center rounded-full bg-primary/10 px-3 py-1.5">
              <Text className="text-xs font-bold text-primary">
                Type: {selectedTypeName}
              </Text>
            </View>
          ) : null}

          {selectedRegionName ? (
            <View className="flex-row items-center rounded-full bg-primary/10 px-3 py-1.5">
              <Text className="text-xs font-bold text-primary">
                Region: {selectedRegionName}
              </Text>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default HolidayTourFilterBar;