import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { getUpcomingMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { Movie } from "../types/model/Movie";

export function useUpcomingMovies(
  debouncedTitle: string,
  locationIds: number[],
  genreIds: number[],
  venueIds: number[],
  pageSize: number
) {
  const {
    data: rawMovies,
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [
      "upcoming-movies",
      debouncedTitle,
      locationIds,
      genreIds,
      venueIds,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getUpcomingMovies(
        pageParam,
        pageSize,
        debouncedTitle,
        locationIds,
        genreIds,
        venueIds
      ),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.last ? undefined : lastPage.number + 2;
    },
    placeholderData: keepPreviousData,
    select: (data) =>
      data.pages.flatMap((page: PaginatedResponse<Movie>) => page.content),
  });

  return {
    movies: rawMovies ?? [],
    fetchNextPage,
    hasNextPage,
    status,
    isFetchingNextPage,
  };
}
