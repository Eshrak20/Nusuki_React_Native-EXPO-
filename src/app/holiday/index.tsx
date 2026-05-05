import { router } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";

import PageHeader from "../../components/common/PageHeader";
import PageLoader from "../../components/common/PageLoader";
import PageError from "../../components/common/PageError";
import FilterDrawer from "../../components/common/FilterDrawer";
import TourCard from "../../components/holidayCom/TourCard";

import { useInfinitePagination } from "../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../hooks/useMergedPaginatedItems";
import type { TourItem } from "../../types/holiday/types.tour";
import { useGetToursQuery } from "@/redux/api/packagesApi";
import HolidayTourFilterBar from "@/components/holidayCom/HolidayTourFilterBar";

export default function HolidayToursScreen() {
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [selectedTypeName, setSelectedTypeName] = useState("");
  const [selectedRegionId, setSelectedRegionId] = useState("");
  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [drawerType, setDrawerType] = useState<"type" | "region" | null>(null);

  const resetKey = `${selectedTypeId}-${selectedRegionId}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const toursQuery = useGetToursQuery({
    page,
    tour_type_id: selectedTypeId,
    tour_region_id: selectedRegionId,
  });

  const currentItems = toursQuery.data?.data?.tours ?? [];
  const currentPage = toursQuery.data?.data?.current_page ?? page;
  const lastPage = toursQuery.data?.data?.last_page ?? 1;
  const total = toursQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const tours = useMergedPaginatedItems<TourItem>({
    page,
    resetKey,
    currentItems,
  });

  const tourTypes = toursQuery.data?.data?.tour_types ?? [];
  const regions = toursQuery.data?.data?.regions ?? [];

  const typeOptions = tourTypes.map((item) => item.name);
  const regionOptions = regions.map((item) => item.name);

  const handleLoadMore = () => {
    if (toursQuery.isFetching || !hasMore) return;
    loadNextPage(true);
  };

  const handleSelectType = (name: string) => {
    const selected = tourTypes.find((item) => item.name === name);

    setSelectedTypeName(selected?.name ?? "");
    setSelectedTypeId(selected ? String(selected.id) : "");

    setSelectedRegionName("");
    setSelectedRegionId("");
    setDrawerType(null);
  };

  const handleSelectRegion = (name: string) => {
    const selected = regions.find((item) => item.name === name);

    setSelectedRegionName(selected?.name ?? "");
    setSelectedRegionId(selected ? String(selected.id) : "");
    setDrawerType(null);
  };

  const handleClearType = () => {
    setSelectedTypeName("");
    setSelectedTypeId("");
    setSelectedRegionName("");
    setSelectedRegionId("");
    setDrawerType(null);
  };

  const handleClearRegion = () => {
    setSelectedRegionName("");
    setSelectedRegionId("");
    setDrawerType(null);
  };

  const handleViewPackages = (item: TourItem) => {
    router.push({
      pathname: "/holiday/packages",
      params: {
        tourId: String(item.id),
        tourName: item.display_name,
      },
    });
  };

  const renderFooter = () => {
    if (!toursQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more tours...
        </Text>
      </View>
    );
  };

  const isInitialLoading = toursQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(toursQuery.data) && currentItems.length > 0 && tours.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(toursQuery.data) &&
    !toursQuery.isLoading &&
    !toursQuery.isFetching &&
    currentItems.length === 0 &&
    tours.length === 0;

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title="Holiday"
        total={total}
        totalLabel="destinations available"
      />

      <HolidayTourFilterBar
        selectedTypeName={selectedTypeName}
        selectedRegionName={selectedRegionName}
        showRegion={selectedTypeName !== "" && regions.length > 0}
        onOpenType={() => setDrawerType("type")}
        onOpenRegion={() => setDrawerType("region")}
        onClearType={handleClearType}
        onClearRegion={handleClearRegion}
      />

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading holiday destinations..." />
      ) : toursQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load holiday destinations."
          onRetry={() => toursQuery.refetch()}
        />
      ) : (
        <FlatList
          data={tours}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TourCard item={item} onViewPackages={handleViewPackages} />
          )}
          // numColumns requires specific horizontal management
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 24,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            shouldShowEmpty ? (
              <View className="mt-20 items-center">
                <Text className="text-gray-400 uppercase tracking-widest font-bold">
                  No Results Found
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <FilterDrawer
        visible={drawerType === "type"}
        title="Filter Tour Type"
        subtitle="Select tour type"
        options={typeOptions}
        selectedValue={selectedTypeName}
        allLabel="All Tour Types"
        onClose={() => setDrawerType(null)}
        onSelect={handleSelectType}
        onClear={handleClearType}
      />

      <FilterDrawer
        visible={drawerType === "region"}
        title="Filter Region"
        subtitle="Select tour region"
        options={regionOptions}
        selectedValue={selectedRegionName}
        allLabel="All Regions"
        onClose={() => setDrawerType(null)}
        onSelect={handleSelectRegion}
        onClear={handleClearRegion}
      />
    </View>
  );
}
