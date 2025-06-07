export function SmallCardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 shadow-light-100 bg-white w-full p-4">
      <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-xl mb-2" />
      <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
    </div>
  );
}
