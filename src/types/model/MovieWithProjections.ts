export interface MovieWithProjections {
  id: string;
  title: string;
  language: string;
  projectionEndsAt: [number, number, number];
  duration: number;
  posterUrl: string;
  pgRating: string;
  genres: string[];
  projections: {
    id: number;
    startTime: [number, number];
    hallName: string;
    cinemaName: string;
  }[];
}
