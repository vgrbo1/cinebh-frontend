import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getDetailedMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { MovieWithProjections } from "../types/model/MovieWithProjections";

export function useCurrentlyShowingMovies(
  debouncedTitle: string,
  date: string,
  locationIds: number[],
  genreIds: number[],
  venueIds: number[],
  pageSize: number,
  fromTime?: string,
  toTime?: string
) {
  const {
    data: rawMovies,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [
      "currently-showing",
      debouncedTitle,
      date,
      genreIds,
      locationIds,
      venueIds,
      fromTime,
      toTime,
    ],
    queryFn: ({ pageParam = 0 }) =>
      getDetailedMovies(
        debouncedTitle,
        date,
        pageParam,
        pageSize,
        locationIds,
        genreIds,
        venueIds,
        fromTime,
        toTime
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.last ? undefined : lastPage.number + 1,
    placeholderData: keepPreviousData,
    select: (data) =>
      data.pages.flatMap(
        (page: PaginatedResponse<MovieWithProjections>) => page.content
      ),
  });

  return {
    movies: rawMovies ?? [],
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
}
