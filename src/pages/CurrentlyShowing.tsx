import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Layout } from "../components/Layout/Layout";
import { MovieDetailCard } from "../components/MovieDetailCard/MovieDetailCard";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { MovieDetailCardSkeleton } from "../components/skeleton/MovieDetailCardSkeleton/MovieDetailCardSkeleton";
import { MovieDetailListSkeleton } from "../components/skeleton/MovieDetailListSkeleton/MovieDetailListSkeleton";
import { SearchFormSkeleton } from "../components/skeleton/SearchFormSkeleton/SearchFormSkeleton";
import { useCurrentlyShowingMovies } from "../hooks/useCurrentlyShowingMovies";
import { useFilterOptions } from "../hooks/useFilterOptions";
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

  const { data: filterOptions, status: filterOptionsStatus } =
    useFilterOptions();

  const [debouncedTitle] = useDebounce(title, 500);
  const {
    movies,
    fetchNextPage,
    hasNextPage,
    status: currentlyShowingMoviesStatus,
    isFetchingNextPage,
  } = useCurrentlyShowingMovies(
    debouncedTitle,
    date,
    locationIds,
    genreIds,
    venueIds,
    PAGE_SIZE,
    fromTime,
    toTime
  );

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {currentlyShowingMoviesStatus === "pending" || movies.length === 0
            ? "Currently Showing"
            : `Currently Showing (${movies.length})`}
        </h1>

        {filterOptionsStatus === "pending" ? (
          <SearchFormSkeleton />
        ) : (
          filterOptions && (
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
          )
        )}

        {currentlyShowingMoviesStatus === "success" && (
          <p className="text-sm text-customDarkGray italic">
            Quick reminder that our cinema schedule is on a ten-day update cycle
          </p>
        )}

        {currentlyShowingMoviesStatus === "error" && (
          <div className="text-customLightRed mt-4">
            Error loading current movies
          </div>
        )}
      </div>

      {currentlyShowingMoviesStatus === "pending" ? (
        <MovieDetailListSkeleton pageSize={PAGE_SIZE} />
      ) : (
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
                    disabled={isFetchingNextPage}
                    className="hover:underline text-secondary font-primary py-2 px-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}

              {isFetchingNextPage && (
                <div className="flex flex-col space-y-6 mb-6">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <MovieDetailCardSkeleton key={`loading-${i}`} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </Layout>
  );
}
