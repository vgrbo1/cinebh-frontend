import { faFilm } from "@fortawesome/free-solid-svg-icons/faFilm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

interface NoMoviesCardProps {
  text: "Current" | "Upcoming";
}

export function NoMoviesCard({ text }: NoMoviesCardProps) {
  const displayText =
    text === "Current"
      ? "No movies to preview for current date"
      : "No movies to preview for current date range";
  return (
    <div className="px-24">
      <div className="border border-customGray rounded-3xl font-primary shadow-light-50 text-center py-20 my-6 px-0">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-6xl text-customDarkCyanBlue2">
            <FontAwesomeIcon icon={faFilm} />
          </div>
          <h2 className="text-base font-semibold text-primary">
            {displayText}
          </h2>
          <p className="max-w-2xl text-base text-customDarkCyanBlue2">
            We are working on updating our schedule for upcoming movies. Stay
            tuned for amazing movie experience or explore our other exciting
            cinema features in the meantime!
          </p>
          <Link
            to="/upcoming-movies"
            className="text-secondary font-semibold underline"
          >
            Explore Upcoming Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
