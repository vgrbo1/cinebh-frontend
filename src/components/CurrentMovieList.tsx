import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardList from "../components/CardList";
import { getCurrentMovies } from "../services/movieService";
import MovieCard from "./MovieCard";

function CurrentMovieListSection() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "current", page],
    queryFn: () => getCurrentMovies(page, pageSize),
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
      seeAllLink="/movies/current"
      items={data.content}
      total={data.totalElements}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      renderItem={(movie) => <MovieCard key={movie.id} {...movie} />}
    />
  );
}

export default CurrentMovieListSection;
