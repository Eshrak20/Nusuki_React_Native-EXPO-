import { useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";
import SearchFilterBar from "../../../components/common/SearchFilterBar";
import FilterDrawer from "../../../components/common/FilterDrawer";
import TestCard from "../../../components/educationCom/TestCard";

import { exams } from "../../../data/exams";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../../hooks/useMergedPaginatedItems";
import type { TestPreparationItem } from "../../../types/education/types.test";
import { useGetTestsQuery } from "../../../redux/api/packagesApi";
import BottomCallCTA from "@/components/common/BottomCallCTA/BottomCallCTA";

export default function TestListScreen() {
  const [keyword, setKeyword] = useState("");
  const [examType, setExamType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetKey = `${examType}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const testQuery = useGetTestsQuery({
    page,
    examType,
  });

  const currentItems = testQuery.data?.data?.data ?? [];

  const currentPage = testQuery.data?.data?.current_page ?? page;
  const lastPage = testQuery.data?.data?.last_page ?? 1;
  const total = testQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const tests = useMergedPaginatedItems<TestPreparationItem>({
    page,
    resetKey,
    currentItems,
  });

  const visibleTests = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();

    if (!normalizedKeyword) return tests;

    return tests.filter((item) => {
      const combinedText = [
        item.testDesc,
        item.examType,
        item.batch,
        item.duration,
        item.time,
        item.date,
      ]
        .join(" ")
        .toLowerCase();

      return combinedText.includes(normalizedKeyword);
    });
  }, [keyword, tests]);

  const handleLoadMore = () => {
    if (testQuery.isFetching || !hasMore) return;

    loadNextPage(true);
  };

  const handleSelectExam = (selectedExam: string) => {
    setExamType(selectedExam);
    setIsFilterOpen(false);
  };

  const handleClearExam = () => {
    setExamType("");
    setIsFilterOpen(false);
  };

  const renderFooter = () => {
    if (!testQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more tests...
        </Text>
      </View>
    );
  };

  const isInitialLoading = testQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(testQuery.data) && currentItems.length > 0 && tests.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(testQuery.data) &&
    !testQuery.isLoading &&
    !testQuery.isFetching &&
    visibleTests.length === 0;

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title="Test Preparation"
        total={total}
        totalLabel="tests available"
      />

      <SearchFilterBar
        keyword={keyword}
        onChangeKeyword={setKeyword}
        onClearKeyword={() => setKeyword("")}
        placeholder="Search test..."
        onOpenFilter={() => setIsFilterOpen(true)}
        selectedFilter={examType}
        selectedFilterLabel="Exam"
        onClearFilter={handleClearExam}
      />

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading test preparations..." />
      ) : testQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load test preparations."
          onRetry={() => testQuery.refetch()}
        />
      ) : (
        <FlatList
          data={visibleTests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <TestCard item={item} />}
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
                  No test preparations found.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <FilterDrawer
        visible={isFilterOpen}
        title="Filter Exam"
        subtitle="Select exam type"
        options={exams}
        selectedValue={examType}
        allLabel="All Tests"
        onClose={() => setIsFilterOpen(false)}
        onSelect={handleSelectExam}
        onClear={handleClearExam}
      />
      <BottomCallCTA amount="5000" />
    </View>
  );
}
