import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";
import SearchFilterBar from "../../../components/common/SearchFilterBar";
import TourPackageCard from "../../../components/holidayCom/TourPackageCard";
import HolidayPackageFilterDrawer from "../../../components/holidayCom/HolidayPackageFilterDrawer";

import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../../hooks/useMergedPaginatedItems";
import { useGetTourPackagesListQuery } from "../../../redux/api/packagesApi";
import type { TourPackageItem } from "../../../types/holiday/types.tourPackageLists";

export default function HolidayPackagesScreen() {
  const { tourId, tourName } = useLocalSearchParams<{
    tourId: string;
    tourName?: string;
  }>();

  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [selectedDuration, setSelectedDuration] = useState("");
  const [appliedDuration, setAppliedDuration] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [appliedMinPrice, setAppliedMinPrice] = useState("");
  const [appliedMaxPrice, setAppliedMaxPrice] = useState("");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetKey = `${tourId}-${appliedSearch}-${appliedDuration}-${appliedMinPrice}-${appliedMaxPrice}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const packagesQuery = useGetTourPackagesListQuery(
    {
      tour_id: tourId,
      page,
      search: appliedSearch,
      duration_days: appliedDuration,
      min_price: appliedMinPrice,
      max_price: appliedMaxPrice,
    },
    { skip: !tourId },
  );

  const currentItems = packagesQuery.data?.data?.data ?? [];
  const pagination = packagesQuery.data?.data?.pagination;

  const currentPage = pagination?.current_page ?? page;
  const lastPage = pagination?.last_page ?? 1;
  const total = pagination?.total ?? 0;
  const filters = packagesQuery.data?.data?.filters;

  const hasMore = currentPage < lastPage;

  const packages = useMergedPaginatedItems<TourPackageItem>({
    page,
    resetKey,
    currentItems,
  });

  const handleLoadMore = () => {
    if (packagesQuery.isFetching || !hasMore) return;
    loadNextPage(true);
  };

  const handleApplySearch = (value: string) => {
    setSearch(value);
    setAppliedSearch(value);
  };

  const handleClearSearch = () => {
    setSearch("");
    setAppliedSearch("");
  };

  const handleApplyFilters = () => {
    setAppliedDuration(selectedDuration);
    setAppliedMinPrice(minPrice);
    setAppliedMaxPrice(maxPrice);
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    setSelectedDuration("");
    setAppliedDuration("");
    setMinPrice("");
    setMaxPrice("");
    setAppliedMinPrice("");
    setAppliedMaxPrice("");
    setIsFilterOpen(false);
  };

  const renderFooter = () => {
    if (!packagesQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more packages...
        </Text>
      </View>
    );
  };

  const isInitialLoading = packagesQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(packagesQuery.data) &&
    currentItems.length > 0 &&
    packages.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(packagesQuery.data) &&
    !packagesQuery.isLoading &&
    !packagesQuery.isFetching &&
    currentItems.length === 0 &&
    packages.length === 0;

  const selectedFilterText = appliedDuration
    ? `${appliedDuration} Days`
    : appliedMinPrice || appliedMaxPrice
      ? "Price Filter"
      : "";

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title={tourName || "Tour Packages"}
        total={total}
        totalLabel="packages available"
      />

      <SearchFilterBar
        keyword={search}
        onChangeKeyword={handleApplySearch}
        onClearKeyword={handleClearSearch}
        placeholder="Search package..."
        onOpenFilter={() => setIsFilterOpen(true)}
        selectedFilter={selectedFilterText}
        selectedFilterLabel="Filter"
        onClearFilter={handleClearFilters}
      />

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading tour packages..." />
      ) : packagesQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load tour packages."
          onRetry={() => packagesQuery.refetch()}
        />
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TourPackageCard item={item} />}
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
                  No tour packages found.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <HolidayPackageFilterDrawer
        visible={isFilterOpen}
        filters={filters}
        selectedDuration={selectedDuration}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onChangeMinPrice={setMinPrice}
        onChangeMaxPrice={setMaxPrice}
        onSelectDuration={setSelectedDuration}
        onClear={handleClearFilters}
        onApply={handleApplyFilters}
        onClose={() => setIsFilterOpen(false)}
      />
    </View>
  );
}