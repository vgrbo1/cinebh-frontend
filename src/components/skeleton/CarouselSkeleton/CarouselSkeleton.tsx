export function CarouselSkeleton() {
  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden font-primary">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gray-300 animate-pulse"></div>

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

        <div className="absolute top-5/12 left-24 max-w-lg space-y-4">
          <div className="flex space-x-2">
            <div className="bg-gray-400 animate-pulse h-8 w-16 rounded-lg"></div>
            <div className="bg-gray-400 animate-pulse h-8 w-20 rounded-lg"></div>
            <div className="bg-gray-400 animate-pulse h-8 w-14 rounded-lg"></div>
          </div>

          <div className="bg-gray-300 animate-pulse h-12 w-80 rounded"></div>

          <div className="space-y-2">
            <div className="bg-gray-400 animate-pulse h-6 w-full rounded"></div>
            <div className="bg-gray-400 animate-pulse h-6 w-5/6 rounded"></div>
            <div className="bg-gray-400 animate-pulse h-6 w-4/6 rounded"></div>
          </div>

          <div className="bg-gray-500 animate-pulse h-12 w-32 rounded-lg mt-6"></div>
        </div>
      </div>

      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-7.5 h-1 rounded-sm bg-gray-400 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
}
