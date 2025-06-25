export const SeatGuideSkeleton = () => (
  <div className="p-8 animate-pulse">
    <div className="h-7 w-40 bg-gray-300 rounded mx-auto mb-6"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <div className="w-[52px] h-[40px] bg-gray-300 rounded-lg"></div>
          <div className="h-6 w-3/4 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);
