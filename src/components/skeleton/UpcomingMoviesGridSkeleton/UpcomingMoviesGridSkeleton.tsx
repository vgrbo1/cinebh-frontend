import { CardSkeleton } from "../CardSkeleton/CardSkeleton";

export function UpcomingMoviesGridSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <div className="px-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6">
      {Array.from({ length: pageSize }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
