interface SearchFormSkeletonProps {
  showDateSelector?: boolean;
  selectCount?: number;
}

export function SearchFormSkeleton({
  showDateSelector = true,
  selectCount = 4,
}: SearchFormSkeletonProps) {
  const selects = Array.from({ length: selectCount });

  return (
    <div className="flex flex-col gap-4 py-4 font-primary animate-pulse">
      <div className="h-12 bg-gray-200 rounded w-full" />

      <div className="flex gap-4 w-full">
        {selects.map((_, i) => (
          <div key={i} className="h-12 flex-1 bg-gray-200 rounded" />
        ))}
      </div>

      {showDateSelector && (
        <div className="grid grid-cols-10 gap-2 w-full">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center p-4 rounded-lg bg-gray-200 h-20"
            />
          ))}
        </div>
      )}
    </div>
  );
}
