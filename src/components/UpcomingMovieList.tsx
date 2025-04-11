import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CardList from "../components/CardList";
import { getUpcomingMovies } from "../services/movieService";
import MovieCard from "./MovieCard";

const PAGE_SIZE = 4;

function UpcomingMovieList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "upcoming", page],
    queryFn: () => getUpcomingMovies(page, PAGE_SIZE),
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
      pageSize={PAGE_SIZE}
      onPageChange={setPage}
      renderItem={(movie) => <MovieCard key={movie.id} {...movie} />}
    />
  );
}

export default UpcomingMovieList;
