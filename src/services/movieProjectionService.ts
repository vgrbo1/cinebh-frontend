import { ApiMovieProjection } from "../types/api/ApiMovieProjection";
import { ApiSeat } from "../types/api/ApiSeat";
import axiosInstance from "./axiosInstance";

export const getMovieProjectionSeats = async (projectionId: number) => {
  const response = await axiosInstance.get<ApiSeat[]>(
    `/api/projections/${projectionId}/seats`
  );
  return response.data;
};

export const getDetails = async (projectionId: number) => {
  const response = await axiosInstance.get<ApiMovieProjection>(
    `/api/projections/${projectionId}`
  );
  return response.data;
};

export const reserveSeats = async (projectionId: number, seatIds: number[]) => {
  const response = await axiosInstance.post(
    `/api/projections/${projectionId}/reserve`,
    {
      seatIds,
    }
  );
  return response.data;
};
