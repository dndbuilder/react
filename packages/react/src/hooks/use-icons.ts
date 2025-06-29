import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IconifyJSON } from "iconify-icon/dist/iconify-icon.js";

/**
 * Interface for useIcons hook parameters
 */
export interface UseIconsParams {
  /** The selected icon collection */
  collection: string;
  /** Number of icons to fetch per page */
  pageSize?: number;
  /** Optional search text to filter icons by name */
  searchText?: string;
}

/**
 * Custom hook for fetching icon collections and icons
 * @param params Object containing hook parameters
 * @returns Object containing collection data, icon data, and loading/error states
 */
export function useIcons({ collection, pageSize = 50, searchText = "" }: UseIconsParams) {
  // Fetch collection data
  const {
    data: collectionData,
    isLoading: isCollectionLoading,
    isError: collectionError,
  } = useQuery({
    queryKey: ["icon-collection", collection],
    queryFn: () =>
      axios
        .get(`https://api.iconify.design/collection?prefix=${collection}`)
        .then((res) => res.data as { prefix: string; uncategorized: string[] }),
    enabled: !!collection,
    staleTime: Infinity, // Icons don't change often, so we can cache them indefinitely
    gcTime: 1000 * 60 * 60, // Keep unused data in cache for 1 hour
  });

  // Filter icons based on searchText if provided
  const filteredIcons =
    searchText && collectionData?.uncategorized
      ? collectionData.uncategorized.filter((icon) =>
          icon.toLowerCase().includes(searchText.toLowerCase())
        )
      : collectionData?.uncategorized;

  // Fetch icon data based on collection data using infinite query for pagination
  const {
    data: iconData,
    isLoading: isIconLoading,
    isError: iconError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["collection-icon-data", { collection, icons: filteredIcons, searchText }],
    queryFn: ({ pageParam = 0 }: { pageParam?: number }) => {
      const start = (pageParam ?? 0) * pageSize;
      const end = start + pageSize;

      return axios
        .get(`https://api.iconify.design/${collection}.json`, {
          params: {
            icons: filteredIcons?.slice(start, end).join(","),
          },
        })
        .then((res) => res.data as IconifyJSON);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const loadedIconsCount = allPages.length * pageSize;

      // Check if there are more icons to load
      if (filteredIcons && loadedIconsCount < filteredIcons.length) {
        return allPages.length; // Return the next page index
      }

      return undefined; // No more pages to load
    },
    enabled: !!filteredIcons && filteredIcons.length > 0,
    staleTime: Infinity, // Icons don't change often, so we can cache them indefinitely
    gcTime: 1000 * 60 * 60, // Keep unused data in cache for 1 hour
  });

  return {
    data: iconData,
    isLoading: isCollectionLoading || isIconLoading,
    isError: collectionError || iconError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
