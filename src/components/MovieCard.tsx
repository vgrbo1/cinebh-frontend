import { Movie } from "../types/Movie";
import Card from "./Card";

function MovieCard({ title, posterUrl, genres, duration }: Movie) {
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

export default MovieCard;
