export function MovieDetailCardSkeleton() {
  return (
    <div className="px-24">
      <div className="flex font-primary flex-col lg:flex-row bg-white rounded-3xl border border-customGray shadow-light-100 overflow-hidden w-full animate-pulse">
        <div className="md:w-1/2 flex flex-row gap-6 p-6 items-start">
          <div className="w-72 aspect-square bg-gray-200 rounded-2xl flex-shrink-0" />

          <div className="flex flex-col justify-between h-full flex-grow gap-4">
            <div>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2" />

              <div className="flex gap-2 items-center mb-4">
                <div className="h-4 w-10 bg-gray-200 rounded" />
                <div className="h-4 w-1 bg-gray-300" />
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-1 bg-gray-300" />
                <div className="h-4 w-12 bg-gray-200 rounded" />
              </div>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="px-4 py-1 h-8 bg-gray-200 rounded-lg w-20"
                  />
                ))}
              </div>
            </div>

            <div className="h-4 w-1/2 bg-gray-200 rounded mt-4" />
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col items-start">
          <div className="h-6 w-32 bg-gray-200 rounded mb-4" />

          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 w-16 bg-gray-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
