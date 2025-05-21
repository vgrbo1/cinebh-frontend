import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { MovieDetails } from "../../types/model/MovieDetails";

interface MovieDetailsContainerProps {
  movie: MovieDetails;
}
const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}/${month}/${day}`;
};

export const MovieDetailsContainer: React.FC<MovieDetailsContainerProps> = ({
  movie,
}) => {
  const startDate = new Date(
    movie.projectionStartDate[0],
    movie.projectionStartDate[1] - 1,
    movie.projectionStartDate[2]
  );
  const endDate = new Date(
    movie.projectionEndDate[0],
    movie.projectionEndDate[1] - 1,
    movie.projectionEndDate[2]
  );
  return (
    <div className="space-y-3">
      <h1 className="text-px-32 font-bold text-primary">{movie.title}</h1>

      <div className="text-base text-primary space-x-3">
        <span className="border-secondary border-r-2 pr-3">
          {movie.pgRating}
        </span>
        <span className="border-secondary border-r-2 pr-3">
          {movie.language}
        </span>
        <span className="border-secondary border-r-2 pr-3">
          {movie.duration}
        </span>
        <span>
          Projection date: {formatDate(startDate)} - {formatDate(endDate)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {movie.genres.map((genre) => (
          <span
            key={genre.id}
            className="bg-customGray text-sm text-customDarkCyanBlue px-2 py-1.5 rounded-lg font-normal"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <p className="text-base text-primary leading-relaxed">{movie.synopsis}</p>

      <div className="mt-6 text-base space-y-3">
        <div>
          <span className="text-customDarkGray">Director:</span>{" "}
          <span className="text-primary">{movie.director}</span>
        </div>
        <div>
          <span className="text-customDarkGray">Writers:</span>{" "}
          <span className="text-primary">{movie.writers.join(", ")}</span>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-customDarkGray border-l-2 border-secondary pl-2 mb-3">
          Cast
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {movie.cast.map((actor) => (
            <div key={actor.name}>
              <p className="font-semibold text-sm text-customDarkBlue">
                {actor.name}
              </p>
              <p className="text-xs text-customDarkGray">
                {actor.characterName}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold text-customDarkGray border-l-2 border-secondary pl-2 mb-6">
          Rating
        </h3>
        <div className="flex gap-4">
          <div className="border border-customGray rounded-lg flex px-6 py-4 items-center">
            <FontAwesomeIcon
              className="text-secondary text-base"
              icon={faStar}
            />
            <div className="flex flex-col ml-2">
              <p className="text-customDarkBlue text-sm">
                {movie.imdbRating ? `${movie.imdbRating}%` : "N/A"}
              </p>
              <p className="text-customDarkGray text-xs">IMDB rating</p>
            </div>
          </div>
          <div className="border border-customGray rounded-lg flex px-6 py-4 items-center">
            <FontAwesomeIcon
              className="text-secondary text-base"
              icon={faStar}
            />
            <div className="flex flex-col ml-2">
              <p className="text-customDarkBlue text-sm">
                {movie.rottenTomatoesRating
                  ? `${movie.rottenTomatoesRating}%`
                  : "N/A"}
              </p>
              <p className="text-customDarkGray text-xs">Rotten Tomatoes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
