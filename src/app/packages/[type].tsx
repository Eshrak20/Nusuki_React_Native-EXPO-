import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import {
  useGetHajjPackagesQuery,
  useGetUmrahPackagesQuery,
} from "../../redux/api/packagesApi";
import PackageCard from "../../components/pilgrimageCom/PackageCard";
import { useInfinitePagination } from "../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../hooks/useMergedPaginatedItems";
import type { PackageItem } from "../../types/hajj/types.package";
import PageHeader from "../../components/common/PageHeader";
import PageLoader from "../../components/common/PageLoader";
import PageError from "../../components/common/PageError";

const PAGE_SIZE = 10;

export default function PackageListScreen() {
  const { type } = useLocalSearchParams<{ type: string }>();

  const isHajj = type === "hajj";
  const isUmrah = type === "umrah";

  const title = isHajj ? "Hajj Packages" : "Umrah Packages";

  const { page, loadNextPage } = useInfinitePagination({
    resetKey: type,
  });

  const hajjQuery = useGetHajjPackagesQuery(
    { page, size: PAGE_SIZE },
    { skip: !isHajj },
  );

  const umrahQuery = useGetUmrahPackagesQuery(
    { page, size: PAGE_SIZE },
    { skip: !isUmrah },
  );

  const activeQuery = isHajj ? hajjQuery : umrahQuery;

  const currentItems = activeQuery.data?.data?.data ?? [];

  const currentPage = activeQuery.data?.data?.current_page ?? page;
  const lastPage = activeQuery.data?.data?.last_page ?? 1;
  const total = activeQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const packages = useMergedPaginatedItems<PackageItem>({
    page,
    resetKey: type,
    currentItems,
  });

  const handleLoadMore = () => {
    if (activeQuery.isFetching || !hasMore) return;

    loadNextPage(true);
  };

  const renderFooter = () => {
    if (!activeQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">Loading more...</Text>
      </View>
    );
  };

  const isInitialLoading = activeQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(activeQuery.data) &&
    currentItems.length > 0 &&
    packages.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(activeQuery.data) &&
    !activeQuery.isLoading &&
    !activeQuery.isFetching &&
    currentItems.length === 0 &&
    packages.length === 0;

  const errorMessage = isHajj
    ? "Failed to load Hajj packages."
    : "Failed to load Umrah packages.";

  const loadingMessage = isHajj
    ? "Loading Hajj packages..."
    : "Loading Umrah packages...";

  const emptyMessage = isHajj
    ? "No Hajj packages found."
    : "No Umrah packages found.";

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader title={title} total={total} totalLabel="packages available" />

      {shouldShowFullPageLoader ? (
        <PageLoader message={loadingMessage} />
      ) : activeQuery.isError && page === 1 ? (
        <PageError
          message={errorMessage}
          onRetry={() => activeQuery.refetch()}
        />
      ) : (
        <FlatList
          data={packages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PackageCard item={item} />}
          contentContainerClassName="px-4 py-6 pb-28"
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            shouldShowEmpty ? (
              <View className="mt-20 items-center">
                <Text className="text-gray-500">{emptyMessage}</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
