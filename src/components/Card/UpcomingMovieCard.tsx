import { Movie } from "../../types/model/Movie";
import { Card } from "./Card";

function formatStartDate(startDate: Date): string {
  const now = new Date();
  const sevenDaysFromNow = new Date();
  sevenDaysFromNow.setDate(now.getDate() + 7);

  const isWithinNext7Days = startDate <= sevenDaysFromNow;

  if (isWithinNext7Days) {
    const dayName = startDate.toLocaleDateString("en-US", { weekday: "long" });
    return `Opens ${dayName}`;
  } else {
    return startDate.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
}

export function UpcomingMovieCard({
  id,
  title,
  posterUrl,
  genres,
  duration,
  projectionStartsAt,
}: Movie) {
  return (
    <Card
      imageUrl={posterUrl}
      title={title}
      secondaryText={`${duration} min | ${genres
        .map((genre) => genre.name)
        .join(", ")}`}
      badgeText={formatStartDate(
        new Date(
          projectionStartsAt[0],
          projectionStartsAt[1] - 1,
          projectionStartsAt[2]
        )
      )}
      navigateTo={`/movies/${id}`}
    />
  );
}
