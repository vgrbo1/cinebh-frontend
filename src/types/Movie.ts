import { Genre } from "./Genre";

export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  duration: number;
  genres: Genre[];
}
