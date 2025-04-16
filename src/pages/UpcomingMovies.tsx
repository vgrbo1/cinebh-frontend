import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { UpcomingMovieCard } from "../components/Card/UpcomingMovieCard";
import { Layout } from "../components/Layout/Layout";
import { NoMoviesCard } from "../components/NoMoviesCard/NoMoviesCard";
import { SearchForm } from "../components/SearchForm/SearchForm";
import { getUpcomingMovies } from "../services/movieService";
import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { Movie } from "../types/model/Movie";

const PAGE_SIZE = 8;
export function UpcomingMovies() {
  const [title, setTitle] = useState<string>("");

  const [debouncedTitle] = useDebounce(title, 500);
  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["upcoming-movies", debouncedTitle],
      queryFn: (pageParam) =>
        getUpcomingMovies(pageParam.pageParam, PAGE_SIZE, debouncedTitle),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.last) {
          return undefined;
        }
        return lastPage.number + 2;
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
    (page: PaginatedResponse<Movie>) => page.content
  );

  return (
    <Layout>
      <div className="px-24">
        <h1 className="font-bold font-primary text-primary text-3xl pt-10">
          {movies.length === 0
            ? "Upcoming Movies"
            : `Upcoming Movies (${movies.length})`}
        </h1>
        <SearchForm title={title} setTitle={setTitle} />
      </div>

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
