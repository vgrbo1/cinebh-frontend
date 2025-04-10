import { Movie } from "../types/Movie";
import { MovieCarousel } from "../types/MovieCarousel";
import { PaginatedResponse } from "../types/PaginatedResponse";
import axiosInstance from "./axiosInstance";

export const getCurrentMovies = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Movie>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>(
      "/api/movies/current",
      {
        params: {
          page: page - 1,
          size: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current movies:", error);
    throw error;
  }
};

export const getUpcomingMovies = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Movie>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>(
      "/api/movies/upcoming",
      {
        params: {
          page: page - 1,
          size: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current movies:", error);
    throw error;
  }
};

export const getMovieCarousels = async (): Promise<MovieCarousel[]> => {
  try {
    const response = await axiosInstance.get<MovieCarousel[]>(
      "/api/movies/latest"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current movies:", error);
    throw error;
  }
};
