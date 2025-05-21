import { Genre } from "./Genre";

export interface MovieDetails {
  id: string;
  title: string;
  language: string;
  duration: number;
  trailerUrl: string;
  projectionStartDate: [number, number, number];
  projectionEndDate: [number, number, number];
  genres: Genre[];
  synopsis: string;
  pgRating: string;
  director: string;
  writers: string[];
  cast: {
    name: string;
    characterName: string;
  }[];
  stills: string[];
  imdbRating: number;
  rottenTomatoesRating: number;
}
