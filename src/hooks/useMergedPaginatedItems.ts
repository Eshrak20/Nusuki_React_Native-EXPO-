import { useEffect, useState } from "react";

type ItemWithId = {
  id: string | number;
};

type UseMergedPaginatedItemsParams<T extends ItemWithId> = {
  page: number;
  resetKey?: string | number;
  currentItems: T[];
};

export function useMergedPaginatedItems<T extends ItemWithId>({
  page,
  resetKey,
  currentItems,
}: UseMergedPaginatedItemsParams<T>) {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    setItems([]);
  }, [resetKey]);

  useEffect(() => {
    if (!currentItems.length) return;

    setItems((prev) => {
      if (page === 1) {
        return currentItems;
      }

      const existingIds = new Set(prev.map((item) => String(item.id)));

      const newItems = currentItems.filter(
        (item) => !existingIds.has(String(item.id)),
      );

      return [...prev, ...newItems];
    });
  }, [currentItems, page]);

  return items;
}