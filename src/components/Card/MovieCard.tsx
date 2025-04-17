import { Movie } from "../../types/model/Movie";
import { Card } from "./Card";

export function MovieCard({ title, posterUrl, genres, duration }: Movie) {
  return (
    <Card
      imageUrl={posterUrl}
      title={title}
      secondaryText={`${duration} min | ${genres
        .map((genre) => genre.name)
        .join(", ")}`}
    />
  );
}
