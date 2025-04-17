import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { UpcomingMovieCard } from "../components/Card/UpcomingMovieCard";
import { Layout } from "../components/Layout/Layout";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { getFormOptions } from "../services/filterService";
import { getUpcomingMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { FilterOptionsResponse } from "../types/model/FilterOptionsResponse";
import { Movie } from "../types/model/Movie";

const PAGE_SIZE = 8;
export function UpcomingMovies() {
  const [title, setTitle] = useState<string>("");
  const [debouncedTitle] = useDebounce(title, 500);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [locationIds, setLocationIds] = useState<number[]>([]);
  const [venueIds, setVenueIds] = useState<number[]>([]);

  const { data: filterOptions } = useQuery<FilterOptionsResponse>({
    queryKey: ["filter-options"],
    queryFn: () => getFormOptions(),
    placeholderData: keepPreviousData,
  });

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [
        "upcoming-movies",
        debouncedTitle,
        locationIds,
        genreIds,
        venueIds,
      ],
      queryFn: (pageParam) =>
        getUpcomingMovies(
          pageParam.pageParam,
          PAGE_SIZE,
          debouncedTitle,
          locationIds,
          genreIds,
          venueIds
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined;
        return lastPage.number + 2;
      },
      placeholderData: keepPreviousData,
    });

  const movies =
    data?.pages.flatMap((page: PaginatedResponse<Movie>) => page.content) ?? [];

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {movies.length === 0
            ? "Upcoming Movies"
            : `Upcoming Movies (${movies.length})`}
        </h1>
        {filterOptions && (
          <SearchForm
            title={title}
            setTitle={setTitle}
            genres={filterOptions.genres}
            locations={filterOptions.locations}
            venues={filterOptions.venues}
            onGenreIdsChange={setGenreIds}
            onLocationIdsChange={setLocationIds}
            onVenueIdsChange={setVenueIds}
          />
        )}

        {error && (
          <div className="text-red-500 mt-4">Error loading upcoming movies</div>
        )}

        {isLoading && <div className="mt-4">Loading upcoming movies...</div>}
      </div>

      {!isLoading && !error && (
        <>
          {movies.length === 0 ? (
            <NoMoviesCard text="Upcoming" />
          ) : (
            <>
              <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
                {movies.map((movie: Movie) => (
                  <UpcomingMovieCard {...movie} key={movie.id} />
                ))}
              </div>
              {hasNextPage && (
                <div className="flex justify-center my-6">
                  <button
                    onClick={() => fetchNextPage()}
                    className="hover:underline text-secondary font-primary py-2 px-4 text-base"
                  >
                    Load more
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
}
