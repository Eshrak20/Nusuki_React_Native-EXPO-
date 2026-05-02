import { Filter, Search, X } from "lucide-react-native";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

type SearchFilterBarProps = {
  keyword: string;
  onChangeKeyword: (text: string) => void;
  onClearKeyword: () => void;
  placeholder?: string;

  onOpenFilter: () => void;
  selectedFilter?: string;
  selectedFilterLabel?: string;
  onClearFilter?: () => void;
};

const SearchFilterBar = ({
  keyword,
  onChangeKeyword,
  onClearKeyword,
  placeholder = "Search...",
  onOpenFilter,
  selectedFilter,
  selectedFilterLabel = "Filter",
  onClearFilter,
}: SearchFilterBarProps) => {
  return (
    <View className="border-b border-gray-100 bg-white px-4 py-4">
      <View className="flex-row items-center">
        <View className="mr-3 flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4">
          <Search size={19} color="#6B7280" />

          <TextInput
            value={keyword}
            onChangeText={onChangeKeyword}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            className="ml-2 h-12 flex-1 text-sm font-medium text-gray-900"
          />

          {keyword ? (
            <TouchableOpacity onPress={onClearKeyword}>
              <X size={18} color="#6B7280" />
            </TouchableOpacity>
          ) : null}
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onOpenFilter}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-primary"
        >
          <Filter size={21} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {selectedFilter ? (
        <View className="mt-3 flex-row items-center self-start rounded-full bg-primary/10 px-3 py-1.5">
          <Text className="text-xs font-bold text-primary">
            {selectedFilterLabel}: {selectedFilter}
          </Text>

          {onClearFilter ? (
            <TouchableOpacity onPress={onClearFilter} className="ml-2">
              <X size={14} color="#13275F" />
            </TouchableOpacity>
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

export default SearchFilterBar;