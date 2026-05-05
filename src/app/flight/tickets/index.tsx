import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { SlidersHorizontal, X } from "lucide-react-native";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

import FlightTicketHeader from "../../../components/flightTickets/FlightTicketHeader";
import FlightTicketCard from "../../../components/flightTickets/FlightTicketCard";
import FlightTicketSkeleton from "../../../components/flightTickets/FlightTicketSkeleton";
import FlightSortBar from "../../../components/flightTickets/FlightSortBar";
import FlightFilterDrawer from "../../../components/flightTickets/FlightFilterDrawer";

import { useLazyFlightSearchTicketListsQuery } from "../../../redux/api/flightApi";
import { buildFlightSearchPayload } from "../../../utils/buildFlightSearchPayload";
import {
  buildSearchResetKey,
  getClientFilteredFlights,
  sortFlightsClientSide,
} from "../../../utils/flightResults.helpers";
import {
  cacheReducer,
  createInitialCacheState,
  getCachedFlights,
} from "../../../utils/flightResults.cache";
import { useRateLimitRetry } from "../../../hooks/useRateLimitRetry";
import { startFlightSession } from "../../../redux/features/flightSessionSlice";
import useSharedFlightTimer from "../../../hooks/useSharedFlightTimer";
import {
  resetFlightTicketFilters,
  removeFlightTicketFilter,
} from "../../../redux/features/flightTicketSlice";

const PAGE_SIZE = 10;
type AppliedFilterBadge = {
  id: string;
  label: string;
  removePayload:
    | { type: "refundability"; value: string }
    | { type: "stops"; value: number }
    | { type: "airlines"; value: string }
    | { type: "layover_cities"; value: string }
    | { type: "aircraft"; value: string }
    | { type: "departure_schedule"; value: string }
    | { type: "arrival_schedule"; value: string }
    | { type: "price" }
    | { type: "layover_duration" };
};
export default function FlightTicketsScreen() {
  const dispatch = useDispatch();

  const searchData = useSelector((state: RootState) => state.flightSearch);
  const ticketState = useSelector((state: RootState) => state.flightTicket);

  const { isExpired } = useSharedFlightTimer();

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const basePayload = useMemo(() => {
    return buildFlightSearchPayload({
      searchData,
      page: 1,
      size: PAGE_SIZE,
    });
  }, [searchData]);

  const searchKey = useMemo(() => {
    return buildSearchResetKey(basePayload);
  }, [basePayload]);

  const [cacheState, cacheDispatch] = useReducer(
    cacheReducer,
    createInitialCacheState(searchKey),
  );

  const [fetchFlights, fetchState] = useLazyFlightSearchTicketListsQuery();

  const latestResponse = fetchState.data;

  const allCachedFlights = useMemo(() => {
    return getCachedFlights(cacheState.pageCache);
  }, [cacheState.pageCache]);

  const appliedFilterBadges = useMemo<AppliedFilterBadge[]>(() => {
    const filters = ticketState.filters;
    const badges: AppliedFilterBadge[] = [];

    filters.refundability.forEach((item) => {
      badges.push({
        id: `refundability-${item}`,
        label: item === "refundable" ? "Refundable" : item,
        removePayload: {
          type: "refundability",
          value: item,
        },
      });
    });

    filters.stops.forEach((item) => {
      badges.push({
        id: `stops-${item}`,
        label: item === 0 ? "Non Stop" : `${item} Stop`,
        removePayload: {
          type: "stops",
          value: item,
        },
      });
    });

    filters.airlines.forEach((item) => {
      badges.push({
        id: `airlines-${item}`,
        label: `Airline: ${item}`,
        removePayload: {
          type: "airlines",
          value: item,
        },
      });
    });

    filters.layover_cities.forEach((item) => {
      badges.push({
        id: `layover-city-${item}`,
        label: `Layover: ${item}`,
        removePayload: {
          type: "layover_cities",
          value: item,
        },
      });
    });

    filters.aircraft.forEach((item) => {
      badges.push({
        id: `aircraft-${item}`,
        label: `Aircraft: ${item}`,
        removePayload: {
          type: "aircraft",
          value: item,
        },
      });
    });

    filters.flight_schedules.departure.forEach((item) => {
      badges.push({
        id: `departure-${item}`,
        label: `Departure: ${item}`,
        removePayload: {
          type: "departure_schedule",
          value: item,
        },
      });
    });

    filters.flight_schedules.arrival.forEach((item) => {
      badges.push({
        id: `arrival-${item}`,
        label: `Arrival: ${item}`,
        removePayload: {
          type: "arrival_schedule",
          value: item,
        },
      });
    });

    if (filters.price_min !== null || filters.price_max !== null) {
      badges.push({
        id: "price-range",
        label: `Price: ${filters.price_min ?? "Min"} - ${
          filters.price_max ?? "Max"
        }`,
        removePayload: {
          type: "price",
        },
      });
    }

    if (
      filters.layover_duration_min !== null ||
      filters.layover_duration_max !== null
    ) {
      badges.push({
        id: "layover-duration",
        label: `Layover Time: ${filters.layover_duration_min ?? "Min"} - ${
          filters.layover_duration_max ?? "Max"
        } min`,
        removePayload: {
          type: "layover_duration",
        },
      });
    }

    return badges;
  }, [ticketState.filters]);

  const hasAppliedFilters = appliedFilterBadges.length > 0;

  const filteredFlights = useMemo(() => {
    return getClientFilteredFlights({
      flights: allCachedFlights,
      filters: ticketState.filters,
      selectedAirlineCode: ticketState.selectedAirlineCode,
    });
  }, [allCachedFlights, ticketState.filters, ticketState.selectedAirlineCode]);

  const sortedFlights = useMemo(() => {
    return sortFlightsClientSide({
      flights: filteredFlights,
      sortBy: ticketState.sortBy,
      sortOrder: ticketState.sortOrder,
    });
  }, [filteredFlights, ticketState.sortBy, ticketState.sortOrder]);

  const routeLabel =
    latestResponse?.data?.route?.label ||
    latestResponse?.data?.filters?.route?.label ||
    `${basePayload.origin ?? ""} → ${basePayload.destination ?? ""}`;

  const totalAvailable =
    latestResponse?.data?.statistics?.available_flights ??
    latestResponse?.data?.pagination?.total ??
    cacheState.serverTotalFlights;

  const isRateLimitError =
    Boolean(fetchState.isError) &&
    "status" in ((fetchState.error ?? {}) as { status?: number }) &&
    (fetchState.error as { status?: number }).status === 429;

  const loadPage = useCallback(
    async (page: number) => {
      const payload = {
        ...basePayload,
        page,
        size: PAGE_SIZE,
      };

      const response = await fetchFlights(payload).unwrap();

      cacheDispatch({
        type: "MERGE_RESPONSE",
        payload: {
          searchKey,
          page,
          flights: response.data.flights ?? [],
          totalPages: response.data.pagination?.total_pages ?? 1,
          totalFlights:
            response.data.statistics?.available_flights ??
            response.data.pagination?.total ??
            0,
        },
      });
    },
    [basePayload, fetchFlights, searchKey],
  );

  const { retryCount, maxRetryCount, isRetrying } = useRateLimitRetry({
    isRateLimitError,
    onRetry: () => {
      loadPage(cacheState.serverPage).catch(() => {});
    },
  });

  useEffect(() => {
    dispatch(startFlightSession());
  }, [dispatch, searchKey]);

  useEffect(() => {
    cacheDispatch({
      type: "RESET",
      payload: {
        searchKey,
      },
    });

    loadPage(1).catch(() => {});
  }, [searchKey, loadPage]);

  useEffect(() => {
    if (!isExpired) return;

    Alert.alert("Session expired", "Please search again to get latest fares.", [
      {
        text: "Search Again",
        onPress: () => router.replace("/flight"),
      },
    ]);
  }, [isExpired]);

  const handleLoadMore = () => {
    if (fetchState.isFetching) return;
    if (cacheState.serverPage >= cacheState.serverTotalPages) return;

    const nextPage = cacheState.serverPage + 1;

    cacheDispatch({
      type: "SET_SERVER_PAGE",
      payload: {
        searchKey,
        page: nextPage,
      },
    });

    loadPage(nextPage).catch(() => {});
  };

  const handleClearFilters = () => {
    dispatch(resetFlightTicketFilters());
  };
  const handleRemoveFilterBadge = (badge: AppliedFilterBadge) => {
    dispatch(removeFlightTicketFilter(badge.removePayload));
  };
  const isInitialLoading =
    fetchState.isLoading &&
    cacheState.serverPage === 1 &&
    sortedFlights.length === 0;

  return (
    <View className="flex-1 bg-gray-100">
      <FlightTicketHeader title={routeLabel} subtitle="Flight results" />

      <View className="px-4 py-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-base font-extrabold text-gray-900">
              {totalAvailable} Available Flights
            </Text>

            {hasAppliedFilters ? (
              <Text className="mt-1 text-xs font-medium text-gray-500">
                Showing {sortedFlights.length} after filters
              </Text>
            ) : null}
          </View>

          <View className="flex-row items-center gap-2">
            {hasAppliedFilters ? (
              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleClearFilters}
                className="flex-row items-center rounded-full bg-red-50 px-3 py-3"
              >
                <X size={15} color="#EF4444" />
                <Text className="ml-1 text-xs font-extrabold text-red-500">
                  Clear
                </Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              activeOpacity={0.85}
              onPress={() => setIsFilterOpen(true)}
              className="flex-row items-center rounded-full bg-white px-4 py-3 shadow-sm"
            >
              <SlidersHorizontal size={17} color="#13275F" />
              <Text className="ml-2 font-extrabold text-gray-800">Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        {hasAppliedFilters ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-3"
            contentContainerClassName="gap-2 pr-4"
          >
            {appliedFilterBadges.map((badge) => (
              <View
                key={badge.id}
                className="relative mt-3 flex-row items-center rounded-full border border-primary/10 bg-primary/10 px-3 py-2 pr-7"
              >
                <Text className="text-xs font-bold text-primary">
                  {badge.label}
                </Text>

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => handleRemoveFilterBadge(badge)}
                  className="absolute -right-1 -top-1 h-5 w-5 items-center justify-center rounded-full bg-red-500"
                >
                  <X size={12} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        ) : null}
      </View>

      {isInitialLoading ? (
        <View className="px-4">
          <FlightTicketSkeleton />
          <FlightTicketSkeleton />
          <FlightTicketSkeleton />
        </View>
      ) : fetchState.isError &&
        !isRateLimitError &&
        sortedFlights.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text className="text-center text-base font-bold text-red-500">
            Something went wrong while loading flights.
          </Text>

          <TouchableOpacity
            onPress={() => loadPage(cacheState.serverPage).catch(() => {})}
            className="mt-4 rounded-2xl bg-primary px-6 py-3"
          >
            <Text className="font-extrabold text-white">Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={sortedFlights}
          keyExtractor={(item) => item.flight_id}
          renderItem={({ item }) => <FlightTicketCard item={item} />}
          contentContainerClassName="px-4 pb-28"
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.45}
          ListFooterComponent={
            fetchState.isFetching || isRetrying ? (
              <View className="items-center py-5">
                <ActivityIndicator size="small" color="#13275F" />

                <Text className="mt-2 text-sm text-gray-500">
                  {isRetrying
                    ? `Server busy, retrying ${retryCount}/${maxRetryCount}...`
                    : "Loading more flights..."}
                </Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            !fetchState.isFetching ? (
              <View className="mt-20 items-center px-6">
                <Text className="text-center text-gray-500">
                  No flights found.
                </Text>
              </View>
            ) : null
          }
        />
      )}

      {/* <FlightSortBar /> */}

      <FlightFilterDrawer
        visible={isFilterOpen}
        filters={latestResponse?.data?.filters}
        onClose={() => setIsFilterOpen(false)}
      />
    </View>
  );
}
