import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { Layout } from "../components/Layout/Layout";
import { MovieDetailCard } from "../components/MovieDetailCard/MovieDetailCard";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { getDetailedMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { MovieWithProjections } from "../types/model/MovieWithProjections";

const PAGE_SIZE = 10;
export function CurrentlyShowing() {
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>(
    () => new Date().toISOString().split("T")[0]
  );
  const [debouncedTitle] = useDebounce(title, 500);
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["currently-showing", debouncedTitle, date],
      queryFn: (pageParam) =>
        getDetailedMovies(debouncedTitle, date, pageParam.pageParam, PAGE_SIZE),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) {
          return undefined;
        }
        return lastPage.number + 1;
      },
      placeholderData: keepPreviousData,
    });

  if (!data || isLoading) {
    return <div>Loading current movies...</div>;
  }

  if (error) {
    return <div>Error loading current movies</div>;
  }
  const movies = data.pages.flatMap(
    (page: PaginatedResponse<MovieWithProjections>) => page.content
  );

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {movies.length === 0
            ? "Currently Showing"
            : `Currently Showing (${movies.length})`}
        </h1>
        <SearchForm
          title={title}
          setTitle={setTitle}
          date={date}
          setDate={setDate}
          hasDateSelector={true}
        />
        <p className="text-sm text-gray-500 italic">
          Quick reminder that our cinema schedule is on a ten-day update cycle
        </p>
      </div>
      {movies.length === 0 ? (
        <NoMoviesCard />
      ) : (
        <>
          <div className="flex flex-col space-y-3">
            {movies.map((movie: MovieWithProjections) => (
              <MovieDetailCard movie={movie} key={movie.id} />
            ))}
          </div>
          {hasNextPage && (
            <div className="flex justify-center my-6">
              <button
                onClick={() => fetchNextPage()}
                className=" hover:underline text-secondary font-primary py-2 px-4 text-base"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </Layout>
  );
}
