import { faFilm } from "@fortawesome/free-solid-svg-icons/faFilm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export function NoMoviesCard() {
  return (
    <div className="px-24">
      <div className="border border-gray-200 rounded-2xl font-primary text-center text-gray-700 py-20 my-3 px-0">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="text-6xl text-gray-500">
            <FontAwesomeIcon icon={faFilm} />
          </div>
          <h2 className="text-base font-semibold text-gray-800">
            No movies to preview for current date
          </h2>
          <p className="max-w-xl text-base text-gray-600">
            We are working on updating our schedule for upcoming movies. Stay
            tuned for amazing movie experience or explore our other exciting
            cinema features in the meantime!
          </p>
          <Link to="/upcoming" className="text-secondary font-medium underline">
            Explore Upcoming Movies
          </Link>
        </div>
      </div>
    </div>
  );
}
