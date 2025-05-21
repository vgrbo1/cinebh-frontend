import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Layout } from "../components/Layout/Layout";
import { MovieDetailCard } from "../components/MovieDetailCard/MovieDetailCard";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { getDetailedMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { MovieWithProjections } from "../types/model/MovieWithProjections";

const PAGE_SIZE = 10;
export function CurrentlyShowing() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [locationIds, setLocationIds] = useState<number[]>([]);
  const [venueIds, setVenueIds] = useState<number[]>([]);
  const [fromTime, setFromTime] = useState<string | undefined>(undefined);
  const [toTime, setToTime] = useState<string | undefined>(undefined);

  const { data: filterOptions } = useFilterOptions();

  const [debouncedTitle] = useDebounce(title, 500);
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
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
      queryFn: (pageParam) =>
        getDetailedMovies(
          debouncedTitle,
          date,
          pageParam.pageParam,
          PAGE_SIZE,
          locationIds,
          genreIds,
          venueIds,
          fromTime,
          toTime
        ),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) return undefined;
        return lastPage.number + 1;
      },
      placeholderData: keepPreviousData,
    });

  const movies =
    data?.pages.flatMap(
      (page: PaginatedResponse<MovieWithProjections>) => page.content
    ) ?? [];

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {movies.length === 0
            ? "Currently Showing"
            : `Currently Showing (${movies.length})`}
        </h1>
        {filterOptions && (
          <SearchForm
            title={title}
            setTitle={setTitle}
            date={date}
            setDate={setDate}
            hasDateSelector={true}
            genres={filterOptions.genres}
            locations={filterOptions.locations}
            venues={filterOptions.venues}
            onGenreIdsChange={setGenreIds}
            onLocationIdsChange={setLocationIds}
            onVenueIdsChange={setVenueIds}
            fromTime={fromTime}
            toTime={toTime}
            setFromTime={setFromTime}
            setToTime={setToTime}
          />
        )}
        <p className="text-sm text-customDarkGray italic">
          Quick reminder that our cinema schedule is on a ten-day update cycle
        </p>

        {error && <div>Error loading current movies</div>}

        {isLoading && <div>Loading current movies...</div>}
      </div>

      {!isLoading && !error && (
        <div className="my-10">
          {movies.length === 0 ? (
            <NoMoviesCard text="Current" />
          ) : (
            <>
              <div className="flex flex-col space-y-6">
                {movies.map((movie: MovieWithProjections) => (
                  <MovieDetailCard movie={movie} key={movie.id} />
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
        </div>
      )}
    </Layout>
  );
}
