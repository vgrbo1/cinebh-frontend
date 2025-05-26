import { MovieDetailCardSkeleton } from "../MovieDetailCardSkeleton/MovieDetailCardSkeleton";

export function MovieDetailListSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <div className="my-10">
      <div className="flex flex-col space-y-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <MovieDetailCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
