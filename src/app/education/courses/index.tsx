import { useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import PageHeader from "../../../components/common/PageHeader";
import PageLoader from "../../../components/common/PageLoader";
import PageError from "../../../components/common/PageError";
import SearchFilterBar from "../../../components/common/SearchFilterBar";
import FilterDrawer from "../../../components/common/FilterDrawer";

import CourseCard from "../../../components/educationCom/CourseCard";

import { degrees } from "../../../data/degrees";
import { useInfinitePagination } from "../../../hooks/useInfinitePagination";
import { useMergedPaginatedItems } from "../../../hooks/useMergedPaginatedItems";
import { useGetCoursesQuery } from "../../../redux/api/packagesApi";
import type { CourseItem } from "../../../types/education/types.course";
import BottomCallCTA from "@/components/common/BottomCallCTA/BottomCallCTA";

const PAGE_SIZE = 12;

export default function CourseListScreen() {
  const [keyword, setKeyword] = useState("");
  const [studyLevel, setStudyLevel] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const resetKey = `${keyword}-${studyLevel}`;

  const { page, loadNextPage } = useInfinitePagination({
    resetKey,
  });

  const courseQuery = useGetCoursesQuery({
    page,
    size: PAGE_SIZE,
    keyword,
    study_level: studyLevel,
  });

  const currentItems = courseQuery.data?.data?.data ?? [];

  const currentPage = courseQuery.data?.data?.current_page ?? page;
  const lastPage = courseQuery.data?.data?.last_page ?? 1;
  const total = courseQuery.data?.data?.total ?? 0;

  const hasMore = currentPage < lastPage;

  const courses = useMergedPaginatedItems<CourseItem>({
    page,
    resetKey,
    currentItems,
  });

  const handleLoadMore = () => {
    if (courseQuery.isFetching || !hasMore) return;

    loadNextPage(true);
  };

  const handleSelectStudyLevel = (selectedStudyLevel: string) => {
    setStudyLevel(selectedStudyLevel);
    setIsFilterOpen(false);
  };

  const handleClearStudyLevel = () => {
    setStudyLevel("");
    setIsFilterOpen(false);
  };

  const renderFooter = () => {
    if (!courseQuery.isFetching || page === 1) return null;

    return (
      <View className="items-center py-5">
        <ActivityIndicator size="small" color="#13275F" />
        <Text className="mt-2 text-sm text-gray-500">
          Loading more courses...
        </Text>
      </View>
    );
  };

  const isInitialLoading = courseQuery.isLoading && page === 1;

  const isWaitingForMergedItems =
    Boolean(courseQuery.data) &&
    currentItems.length > 0 &&
    courses.length === 0;

  const shouldShowFullPageLoader = isInitialLoading || isWaitingForMergedItems;

  const shouldShowEmpty =
    Boolean(courseQuery.data) &&
    !courseQuery.isLoading &&
    !courseQuery.isFetching &&
    currentItems.length === 0 &&
    courses.length === 0;

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="light" backgroundColor="#13275F" />

      <PageHeader
        title="Courses"
        total={total}
        totalLabel="courses available"
      />

      <SearchFilterBar
        keyword={keyword}
        onChangeKeyword={setKeyword}
        onClearKeyword={() => setKeyword("")}
        placeholder="Search course..."
        onOpenFilter={() => setIsFilterOpen(true)}
        selectedFilter={studyLevel}
        selectedFilterLabel="Study Level"
        onClearFilter={handleClearStudyLevel}
      />

      {shouldShowFullPageLoader ? (
        <PageLoader message="Loading courses..." />
      ) : courseQuery.isError && page === 1 ? (
        <PageError
          message="Failed to load courses."
          onRetry={() => courseQuery.refetch()}
        />
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <CourseCard item={item} />}
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
                  No courses found.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      <FilterDrawer
        visible={isFilterOpen}
        title="Filter Course Type"
        subtitle="Select study level"
        options={degrees}
        selectedValue={studyLevel}
        allLabel="All Courses"
        onClose={() => setIsFilterOpen(false)}
        onSelect={handleSelectStudyLevel}
        onClear={handleClearStudyLevel}
      />
      <BottomCallCTA amount="7000" />
    </View>
  );
}
