import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getCurrentMovies } from "../../services/movieService";
import { MovieCard } from "../Card/MovieCard";
import { CardListSkeleton } from "../skeleton/CardListSkeleton/CardListSkeleton";
import { CardList } from "./CardList";

const PAGE_SIZE = 4;

export function CurrentMovieList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "current", page],
    queryFn: () => getCurrentMovies(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return (
      <div className="px-24">
        <CardListSkeleton
          title="Currently Showing"
          showSeeAll={true}
          itemCount={PAGE_SIZE}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading current movies</div>;
  }

  return (
    <div className="px-24">
      <CardList
        title="Currently Showing"
        seeAllUrl="/currently-showing"
        items={data.content}
        total={data.totalElements}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        renderItem={(movie) => <MovieCard key={movie.id} {...movie} />}
      />
    </div>
  );
}
