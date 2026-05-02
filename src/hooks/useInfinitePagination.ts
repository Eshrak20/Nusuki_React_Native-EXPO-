import { useCallback, useEffect, useState } from "react";

type UseInfinitePaginationParams = {
  resetKey?: string | number;
};

export function useInfinitePagination({ resetKey }: UseInfinitePaginationParams = {}) {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  const loadNextPage = useCallback(
    (canLoad: boolean) => {
      if (!canLoad) return;

      setPage((prev) => prev + 1);
    },
    [],
  );

  const resetPage = useCallback(() => {
    setPage(1);
  }, []);

  return {
    page,
    setPage,
    loadNextPage,
    resetPage,
  };
}