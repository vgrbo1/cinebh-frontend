import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getMovieCarousels } from "../../services/movieService";

export function Carousel() {
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
    }, 6000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading || !data) {
    return <div>Loading carousel movies...</div>;
  }

  if (isError) {
    return <div>Error loading carousel movies</div>;
  }

  return (
    <div className="relative w-full h-[400px] sm:h-[600px] overflow-hidden font-primary">
      {data.map((movie, i) => (
        <div
          key={movie.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === currentIndex
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute top-5/12 left-24  max-w-lg space-y-2">
            <div className="flex space-x-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-customGray text-sm text-customDarkCyanBlue px-2 py-1.5 rounded-lg font-normal"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <h2 className="text-white text-5xl font-bold">{movie.title}</h2>
            <p className="text-white text-xl sm:text-base font-bold line-clamp-3 mb-6">
              {movie.synopsis}
            </p>

            <Link
              to={`/movies/${movie.id}`}
              className="w-fit rounded-lg px-5 py-3 font-semibold  transition-colors duration-200 bg-secondary text-white hover:bg-secondary/90 border-secondary "
            >
              Buy Ticket
            </Link>
          </div>
        </div>
      ))}

      <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-4">
        {data.map((_, i) => (
          <span
            key={i}
            className={`w-7.5 h-1 rounded-sm cursor-pointer transition-colors ${
              i === currentIndex ? "bg-customWhite" : "bg-customDarkGray2"
            }`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
