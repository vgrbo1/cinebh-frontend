import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardList from "../components/CardList";
import { getUpcomingMovies } from "../services/movieService";
import MovieCard from "./MovieCard";

function UpcomingMovieList() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => getUpcomingMovies(page, pageSize),
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
      title="Upcoming Movies"
      seeAllUrl="/movies/upcoming"
      items={data.content}
      total={data.totalElements}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      renderItem={(movie) => <MovieCard key={movie.id} {...movie} />}
    />
  );
}

export default UpcomingMovieList;
