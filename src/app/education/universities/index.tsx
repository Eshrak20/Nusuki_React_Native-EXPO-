import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Filter, Search, X } from "lucide-react-native";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";
import UniversityCard from "../../../components/educationCom/UniversityCard";
import CountryFilterDrawer from "../../../components/educationCom/CountryFilterDrawer";

import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../../hooks/useMergedPaginatedItems";
import { useGetUniversitiesQuery } from "../../../redux/api/packagesApi";
import type { UniversityItem } from "../../../types/education/types.university";

const PAGE_SIZE = 12;

export default function UniversityListScreen() {
  const [keyword, setKeyword] = useState("");
  const [country, setCountry] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetKey = `${keyword}-${country}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const universityQuery = useGetUniversitiesQuery({
    page,
    size: PAGE_SIZE,
    keyword,
    country,
  });

  const currentItems = universityQuery.data?.data?.data ?? [];

  const currentPage = universityQuery.data?.data?.current_page ?? page;
  const lastPage = universityQuery.data?.data?.last_page ?? 1;
  const total = universityQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const universities = useMergedPaginatedItems<UniversityItem>({
    page,
    resetKey,
    currentItems,
    getId: (item) => item.id,
  });

  const handleLoadMore = () => {
    if (universityQuery.isFetching || !hasMore) return;

    loadNextPage(true);
  };

  const handleSelectCountry = (selectedCountry: string) => {
    setCountry(selectedCountry);
    setIsFilterOpen(false);
  };

  const handleClearCountry = () => {
    setCountry("");
    setIsFilterOpen(false);
  };

  const handleClearSearch = () => {
    setKeyword("");
  };

  const renderFooter = () => {
    if (!universityQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more universities...
        </Text>
      </View>
    );
  };

  const isInitialLoading = universityQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(universityQuery.data) &&
    currentItems.length > 0 &&
    universities.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(universityQuery.data) &&
    !universityQuery.isLoading &&
    !universityQuery.isFetching &&
    currentItems.length === 0 &&
    universities.length === 0;

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title="Universities"
        total={total}
        totalLabel="universities available"
      />

      <View className="border-b border-gray-100 bg-white px-4 py-4">
        <View className="flex-row items-center">
          <View className="mr-3 flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4">
            <Search size={19} color="#6B7280" />

            <TextInput
              value={keyword}
              onChangeText={setKeyword}
              placeholder="Search university..."
              placeholderTextColor="#9CA3AF"
              className="ml-2 h-12 flex-1 text-sm font-medium text-gray-900"
            />

            {keyword ? (
              <TouchableOpacity onPress={handleClearSearch}>
                <X size={18} color="#6B7280" />
              </TouchableOpacity>
            ) : null}
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setIsFilterOpen(true)}
            className="h-12 w-12 items-center justify-center rounded-2xl bg-primary"
          >
            <Filter size={21} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {country ? (
          <View className="mt-3 flex-row items-center self-start rounded-full bg-primary/10 px-3 py-1.5">
            <Text className="text-xs font-bold text-primary">
              Country: {country}
            </Text>

            <TouchableOpacity onPress={handleClearCountry} className="ml-2">
              <X size={14} color="#13275F" />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading universities..." />
      ) : universityQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load universities."
          onRetry={() => universityQuery.refetch()}
        />
      ) : (
        <FlatList
          data={universities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <UniversityCard item={item} />}
          contentContainerClassName="px-4 py-6 pb-28"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            shouldShowEmpty ? (
              <View className="mt-20 items-center px-6">
                <Text className="text-center text-gray-500">
                  No universities found.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <CountryFilterDrawer
        visible={isFilterOpen}
        selectedCountry={country}
        onClose={() => setIsFilterOpen(false)}
        onSelectCountry={handleSelectCountry}
        onClear={handleClearCountry}
      />
    </View>
  );
}