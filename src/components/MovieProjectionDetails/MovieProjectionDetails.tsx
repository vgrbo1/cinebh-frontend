import { useMemo } from "react";
import { ApiMovieProjection } from "../../types/api/ApiMovieProjection";

export const MovieProjectionDetails: React.FC<{
  details: ApiMovieProjection;
}> = ({ details }) => {
  const formattedDate = useMemo(() => {
    const [year, month, day] = details.date;
    const [hour, minute] = details.startTime;

    const date = new Date(year, month - 1, day, hour, minute);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [details.date, details.startTime]);

  return (
    <div className="border-b border-customGray px-24 py-8 mb-4 font-primary text-primary">
      <div className="flex flex-col sm:flex-row gap-8">
        <img
          src={details.movieImageUrl}
          alt={details.movieTitle}
          className="w-32 h-32 rounded-lg object-cover"
        />
        <div>
          <h2 className="text-xl font-bold">{details.movieTitle}</h2>
          <div className="flex items-center space-x-3 mt-2">
            <span className="border-r-2 pr-3 border-secondary">
              {details.pgRating}
            </span>
            <span className="border-r-2 pr-3 border-secondary">
              {details.language}
            </span>
            <span>{details.duration} Min</span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Booking Details</h3>
          <p className=" mt-2">{formattedDate}</p>
          <p>
            {details.venueName}: {details.venueAddress}
          </p>
          <p>{details.hallName}</p>
        </div>
      </div>
    </div>
  );
};
