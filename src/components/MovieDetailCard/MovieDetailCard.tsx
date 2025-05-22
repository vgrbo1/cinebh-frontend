import { Link } from "react-router";
import { MovieWithProjections } from "../../types/model/MovieWithProjections";

export function MovieDetailCard({ movie }: { movie: MovieWithProjections }) {
  const [year, month, day] = movie.projectionEndsAt;
  const projectionEndsAt = `${String(year)}.${String(month).padStart(
    2,
    "0"
  )}.${String(day).padStart(2, "0")}.`;
  const showtimes = movie.projections
    .map(({ id, startTime, hallName, cinemaName }) => {
      const [hours, minutes] = startTime;
      return {
        id: id,
        hallName: hallName,
        cinemaName: cinemaName,
        startTime: `${String(hours).padStart(2, "0")}:${String(
          minutes
        ).padStart(2, "0")}`,
      };
    })
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  return (
    <div className="px-24">
      <div className="flex font-primary flex-col lg:flex-row bg-white rounded-3xl border border-customGray shadow-light-100 overflow-hidden w-full">
        <div className="md:w-1/2 flex flex-row gap-6 p-6 items-start">
          <div className="w-72 aspect-square flex-shrink-0">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>

          <div className="flex flex-col justify-between h-full flex-grow">
            <div>
              <Link to={`/movies/${movie.id}`}>
                <h2 className="text-3xl font-bold text-primary">
                  {movie.title}
                </h2>
              </Link>
              <div className="text-primary text-sm mt-2">
                <span className="mr-2">{movie.pgRating.replace("_", "-")}</span>
                <span className="text-secondary text-lg">|</span>
                <span className="mx-2">{movie.language}</span>
                <span className="text-secondary text-lg">|</span>
                <span className="ml-2">{movie.duration} Min</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {movie.genres.map((genre) => (
                  <button
                    key={genre}
                    className="px-2 bg-customGray text-primary text-sm rounded-lg h-8"
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-customDarkGray italic text-sm mt-4">
              Playing in cinema until {projectionEndsAt}
            </p>
          </div>
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-start items-start">
          <h3 className="text-xl font-bold text-secondary mb-4">Showtimes</h3>
          <div className="flex flex-wrap gap-3">
            {showtimes.sort().map((showtime) => (
              <button
                key={showtime.id}
                className="bg-white border text-primary px-2 rounded-lg h-12 text-xl font-bold border-customGray shadow-light-50"
                title={`Hall: ${showtime.hallName} - ${showtime.cinemaName}`}
              >
                {showtime.startTime}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
