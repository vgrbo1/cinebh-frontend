import { ApiMovieProjection } from "../types/api/ApiMovieProjection";
import { ApiSeat } from "../types/api/ApiSeat";
import axiosInstance from "./axiosInstance";

export const getMovieProjectionSeats = async (projectionId: number) => {
  const response = await axiosInstance.get<ApiSeat[]>(
    `/api/public/projections/${projectionId}/seats`
  );
  return response.data;
};

export const getDetails = async (projectionId: number) => {
  const response = await axiosInstance.get<ApiMovieProjection>(
    `/api/public/projections/${projectionId}`
  );
  console.log("Projection details response:", response.data);
  return response.data;
};
