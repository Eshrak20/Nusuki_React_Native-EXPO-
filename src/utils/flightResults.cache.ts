import type { FlightResultItem } from "../types/flight/types.flightResults";

export type CacheState = {
  searchKey: string;
  serverPage: number;
  serverTotalPages: number;
  serverTotalFlights: number;
  pageCache: Record<number, FlightResultItem[]>;
};

export type CacheAction =
  | {
      type: "SET_SERVER_PAGE";
      payload: {
        searchKey: string;
        page: number;
      };
    }
  | {
      type: "MERGE_RESPONSE";
      payload: {
        searchKey: string;
        page: number;
        flights: FlightResultItem[];
        totalPages: number;
        totalFlights: number;
      };
    }
  | {
      type: "RESET";
      payload: {
        searchKey: string;
      };
    };

export const createInitialCacheState = (searchKey: string): CacheState => ({
  searchKey,
  serverPage: 1,
  serverTotalPages: 1,
  serverTotalFlights: 0,
  pageCache: {},
});

export const cacheReducer = (
  state: CacheState,
  action: CacheAction,
): CacheState => {
  switch (action.type) {
    case "SET_SERVER_PAGE": {
      const { searchKey, page } = action.payload;

      if (state.searchKey !== searchKey) {
        return createInitialCacheState(searchKey);
      }

      if (state.serverPage === page) return state;

      return {
        ...state,
        serverPage: page,
      };
    }

    case "MERGE_RESPONSE": {
      const { searchKey, page, flights, totalPages, totalFlights } =
        action.payload;

      const baseState =
        state.searchKey === searchKey
          ? state
          : createInitialCacheState(searchKey);

      return {
        ...baseState,
        searchKey,
        serverPage: page,
        serverTotalPages: totalPages,
        serverTotalFlights: totalFlights,
        pageCache: {
          ...baseState.pageCache,
          [page]: flights,
        },
      };
    }

    case "RESET": {
      return createInitialCacheState(action.payload.searchKey);
    }

    default:
      return state;
  }
};

export const getCachedFlights = (pageCache: Record<number, FlightResultItem[]>) => {
  return Object.keys(pageCache)
    .map(Number)
    .sort((a, b) => a - b)
    .flatMap((page) => pageCache[page] ?? []);
};