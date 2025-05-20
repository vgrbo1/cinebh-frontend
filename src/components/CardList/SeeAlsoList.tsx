import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getUpcomingMovies } from "../../services/movieService";
import { SmallMovieCard } from "../Card/SmallMovieCard";
import { CardList } from "./CardList";

const PAGE_SIZE = 6;

export function SeeAlsoList() {
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
      title="See Also"
      items={data.content}
      total={data.totalElements}
      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}
      renderItem={(movie) => (
        <SmallMovieCard
          key={movie.id}
          imageUrl={movie.posterUrl}
          title={movie.title}
        />
      )}
      maxColumns={6}
    />
  );
}
