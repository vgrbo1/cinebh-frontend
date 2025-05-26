export function CardSkeleton() {
  return (
    <div className="relative rounded-3xl border border-gray-200 shadow-light-100 bg-white w-full p-4">
      <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-2xl mb-4" />
      <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
    </div>
  );
}
