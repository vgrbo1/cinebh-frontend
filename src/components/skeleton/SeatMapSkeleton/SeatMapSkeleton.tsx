export const SeatMapSkeleton = () => (
  <div className="p-4 md:p-8 animate-pulse">
    <div className="h-5 w-32 mx-auto bg-gray-300 rounded mb-6" />
    <div className="mx-auto w-3/4 mb-8 h-1 bg-gray-300" />
    <div className="flex flex-col items-center space-y-2">
      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="flex w-full max-w-xl">
          <div className="grid grid-cols-4 gap-2 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[40px] w-full bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
          <div className="w-14 flex-shrink-0"></div>
          <div className="grid grid-cols-4 gap-2 flex-1">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-[40px] w-full bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);
