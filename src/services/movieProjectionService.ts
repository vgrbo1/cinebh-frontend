import { ApiMovieProjection } from "../types/api/ApiMovieProjection";
import { ApiSeat } from "../types/api/ApiSeat";
import axiosInstance from "./axiosInstance";

export const getMovieProjectionSeats = async (projectionId: string) => {
  const response = await axiosInstance.get<ApiSeat[]>(
    `/api/projections/${projectionId}/seats`
  );
  return response.data;
};

export const getDetails = async (projectionId: string) => {
  const response = await axiosInstance.get<ApiMovieProjection>(
    `/api/projections/${projectionId}`
  );
  return response.data;
};

export const reserveSeats = async (projectionId: string, seatIds: number[]) => {
  const response = await axiosInstance.post(
    `/api/projections/${projectionId}/reserve`,
    {
      seatIds,
    }
  );
  return response.data;
};

export const holdSeats = async (projectionId: string, seatIds: number[]) => {
  const response = await axiosInstance.post<{ checkoutUrl: string }>(
    `/api/projections/${projectionId}/hold`,
    {
      seatIds,
    }
  );
  return response.data;
};
