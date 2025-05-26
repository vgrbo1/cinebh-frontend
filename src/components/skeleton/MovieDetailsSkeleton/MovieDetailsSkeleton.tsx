import { CardListSkeleton } from "../CardListSkeleton/CardListSkeleton";

export function MovieDetailsSkeleton() {
  return (
    <div className="px-24 py-6 font-primary animate-pulse">
      <div className="h-8 w-48 bg-gray-200 rounded mb-6" />

      <div className="flex flex-col lg:flex-row gap-6 h-[500px] w-full mb-8">
        <div className="w-full lg:w-1/2 bg-gray-200 rounded-2xl" />

        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className={`w-full h-full bg-gray-200 ${
                i === 1 ? "rounded-tr-2xl" : ""
              } ${i === 3 ? "rounded-br-2xl" : ""}`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/2 space-y-4">
          <div className="h-10 bg-gray-200 rounded w-3/4" />
          <div className="flex gap-4">
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-48 bg-gray-200 rounded" />
          </div>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-20 bg-gray-200 rounded-lg" />
            ))}
          </div>
          <div className="h-20 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i}>
                  <div className="h-4 w-3/4 bg-gray-200 rounded mb-1" />
                  <div className="h-3 w-1/2 bg-gray-300 rounded" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="flex gap-4">
              <div className="w-40 h-16 bg-gray-200 rounded-lg" />
              <div className="w-40 h-16 bg-gray-200 rounded-lg" />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[528px] rounded-2xl shadow-md bg-white p-6">
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
          <div className="h-5 w-1/2 bg-gray-100 rounded mb-2" />
          <div className="h-5 w-2/3 bg-gray-100 rounded" />
        </div>
      </div>

      <CardListSkeleton
        title="See Also"
        itemCount={6}
        maxColumns={6}
        variant="small"
      />
    </div>
  );
}
