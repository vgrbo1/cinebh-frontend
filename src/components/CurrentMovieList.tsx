import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CardList } from "../components/CardList";
import { getCurrentMovies } from "../services/movieService";
import {MovieCard} from "./MovieCard";

const PAGE_SIZE = 4;

export function CurrentMovieList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "current", page],
    queryFn: () => getCurrentMovies(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return <div>Loading current movies...</div>;
  }

  if (isError) {
    return <div>Error loading current movies</div>;
  }

  return (
    <CardList
      title="Currently Showing"
      seeAllUrl="/movies/current"
      items={data.content}
      total={data.totalElements}
      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}
      renderItem={(movie) => <MovieCard key={movie.id} {...movie} />}
    />
  );
}
