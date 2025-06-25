export interface ApiMovieProjection {
  movieTitle: string;
  movieImageUrl: string;
  pgRating: string;
  language: string;
  duration: number;
  date: [number, number, number];
  startTime: [number, number];
  venueName: string;
  venueAddress: string;
  hallName: string;
}
