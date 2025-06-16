import { ApiSeatType } from "../types/api/ApiSeatType";
import axiosInstance from "./axiosInstance";

export const getSeatTypes = async () => {
  const response = await axiosInstance.get<ApiSeatType[]>(
    `/api/public/seats/prices`
  );
  return response.data;
};
