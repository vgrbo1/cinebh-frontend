import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { Movie } from "../types/model/Movie";
import { MovieCarousel } from "../types/model/MovieCarousel";
import { MovieDetails } from "../types/model/MovieDetails";
import { MovieProjection } from "../types/model/MovieProjection";
import { MovieWithProjections } from "../types/model/MovieWithProjections";
import axiosInstance from "./axiosInstance";

export const getCurrentMovies = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Movie>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>(
      "/api/public/movies/current",
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
  pageSize: number,
  title?: string,
  locationIds?: number[],
  genreIds?: number[],
  venueIds?: number[]
): Promise<PaginatedResponse<Movie>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Movie>>(
      "/api/public/movies/upcoming",
      {
        params: {
          page: page - 1,
          size: pageSize,
          title: title,
          locationIds: locationIds,
          genreIds: genreIds,
          venueIds: venueIds,
        },
        paramsSerializer: { indexes: null },
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
      "/api/public/movies/latest"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching current movies:", error);
    throw error;
  }
};

export const getDetailedMovies = async (
  title: string,
  projectionDate: string,
  page: number,
  size: number,
  locationIds?: number[],
  genreIds?: number[],
  venueIds?: number[],
  timeFrom?: string,
  timeTo?: string
): Promise<PaginatedResponse<MovieWithProjections>> => {
  try {
    const response = await axiosInstance.get<
      PaginatedResponse<MovieWithProjections>
    >("/api/public/movies/detailed", {
      params: {
        title: title,
        projectionDate,
        page: page,
        size: size,
        locationIds: locationIds,
        genreIds: genreIds,
        venueIds: venueIds,
        timeFrom: timeFrom,
        timeTo: timeTo,
      },
      paramsSerializer: { indexes: null },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed current movies:", error);
    throw error;
  }
};

export const getMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await axiosInstance.get<MovieDetails>(
      `/api/public/movies/${movieId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed current movies:", error);
    throw error;
  }
};

export const getMovieProjections = async (
  movieId: string,
  date: string,
  locationIds?: number[],
  venueIds?: number[]
): Promise<MovieProjection[]> => {
  try {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
    const response = await axiosInstance.get<MovieProjection[]>(
      `/api/public/movies/${movieId}/projections`,
      {
        params: {
          date,
          locationIds,
          venueIds,
          time,
        },
        paramsSerializer: { indexes: null },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching detailed current movies:", error);
    throw error;
  }
};
