import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getMovieCarousels } from "../services/movieService";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", "latest"],
    queryFn: () => getMovieCarousels(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading || !data) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues</div>;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden font-primary">
      {data.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute top-1/2 left-14  max-w-lg space-y-2">
            <div className="flex space-x-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white text-xs text-black p-1 rounded font-normal"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h2 className="text-white text-2xl font-bold">{movie.title}</h2>
            <p className="text-white text-sm sm:text-base font-bold line-clamp-3">
              {movie.synopsis}
            </p>

            <button
              className="w-fit rounded px-4 py-2 font-medium border mt-4 transition-colors duration-200 
            bg-secondary text-white hover:bg-secondary/90 border-secondary "
            >
              Buy Ticket
            </button>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
        {data.map((_, i) => (
          <span
            key={i}
            className={`w-6 h-1 cursor-pointer transition-colors ${
              i === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
