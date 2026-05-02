import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

import VisaCard from "../../components/visaCom/VisaCard";
import type { VisaItem } from "../../types/visa/types.visaPackage";

import { useInfinitePagination } from "../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../hooks/useMergedPaginatedItems";
import { useGetVisasQuery } from "../../redux/api/packagesApi";
import PageHeader from "../../components/common/PageHeader";
import PageLoader from "../../components/common/PageLoader";
import PageError from "../../components/common/PageError";

export default function VisaListScreen() {
  const visaCategory = "";
  const country = "";

  const resetKey = `${visaCategory}-${country}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const visaQuery = useGetVisasQuery({
    page,
    visa_category: visaCategory,
    country,
  });

  const currentItems = visaQuery.data?.data?.data ?? [];

  const currentPage = visaQuery.data?.data?.current_page ?? page;
  const lastPage = visaQuery.data?.data?.last_page ?? 1;
  const total = visaQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const visas = useMergedPaginatedItems<VisaItem>({
    page,
    resetKey,
    currentItems,
  });

  const handleLoadMore = () => {
    if (visaQuery.isFetching || !hasMore) return;

    loadNextPage(true);
  };

  const renderFooter = () => {
    if (!visaQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more visas...
        </Text>
      </View>
    );
  };

  const isInitialLoading = visaQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(visaQuery.data) && currentItems.length > 0 && visas.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(visaQuery.data) &&
    !visaQuery.isLoading &&
    !visaQuery.isFetching &&
    currentItems.length === 0 &&
    visas.length === 0;

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title="Visa Packages"
        total={total}
        totalLabel="visa services available"
      />

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading visa packages..." />
      ) : visaQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load visa packages."
          onRetry={() => visaQuery.refetch()}
        />
      ) : (
        <FlatList
          data={visas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <VisaCard item={item} />}
          contentContainerClassName="px-4 py-6 pb-28"
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            shouldShowEmpty ? (
              <View className="mt-20 items-center">
                <Text className="text-gray-500">No visa packages found.</Text>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
