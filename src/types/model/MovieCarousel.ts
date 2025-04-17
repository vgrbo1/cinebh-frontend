import { Genre } from "./Genre";

export interface MovieCarousel {
  id: string;
  title: string;
  synopsis: string;
  backdropUrl: string;
  genres: Genre[];
}
