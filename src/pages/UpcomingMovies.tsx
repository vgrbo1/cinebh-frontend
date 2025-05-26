import { useState } from "react";
import { useDebounce } from "use-debounce";
import { UpcomingMovieCard } from "../components/Card/UpcomingMovieCard";
import { Layout } from "../components/Layout/Layout";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { CardSkeleton } from "../components/skeleton/CardSkeleton/CardSkeleton";
import { SearchFormSkeleton } from "../components/skeleton/SearchFormSkeleton/SearchFormSkeleton";
import { UpcomingMoviesGridSkeleton } from "../components/skeleton/UpcomingMoviesGridSkeleton/UpcomingMoviesGridSkeleton";
import { useFilterOptions } from "../hooks/useFilterOptions";
import { useUpcomingMovies } from "../hooks/useUpcomingMovies";
import { Movie } from "../types/model/Movie";

const PAGE_SIZE = 12;

export function UpcomingMovies() {
  const [title, setTitle] = useState<string>("");
  const [debouncedTitle] = useDebounce(title, 500);
  const [genreIds, setGenreIds] = useState<number[]>([]);
  const [locationIds, setLocationIds] = useState<number[]>([]);
  const [venueIds, setVenueIds] = useState<number[]>([]);

  const { data: filterOptions, status: filterOptionsStatus } =
    useFilterOptions();

  const {
    movies,
    fetchNextPage,
    hasNextPage,
    status: upcomingMoviesStatus,
    isFetchingNextPage,
  } = useUpcomingMovies(
    debouncedTitle,
    locationIds,
    genreIds,
    venueIds,
    PAGE_SIZE
  );

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {upcomingMoviesStatus === "pending" || movies.length === 0
            ? "Upcoming Movies"
            : `Upcoming Movies (${movies.length})`}
        </h1>

        {filterOptionsStatus === "pending" ? (
          <SearchFormSkeleton selectCount={3} showDateSelector={false} />
        ) : (
          filterOptions && (
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
          )
        )}

        {upcomingMoviesStatus === "error" && (
          <div className="text-customLightRed mt-4">
            Error loading upcoming movies
          </div>
        )}
      </div>

      {upcomingMoviesStatus === "pending" ? (
        <UpcomingMoviesGridSkeleton pageSize={PAGE_SIZE} />
      ) : (
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
                    disabled={isFetchingNextPage}
                    className="hover:underline text-secondary font-primary py-2 px-4 text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isFetchingNextPage ? "Loading..." : "Load more"}
                  </button>
                </div>
              )}

              {isFetchingNextPage && (
                <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <CardSkeleton key={`loading-${i}`} />
                  ))}
                </div>
              )}
            </>
          )}
        </>
      )}
    </Layout>
  );
}
