import { FilterOptionsResponse } from "../types/model/FilterOptionsResponse";
import axiosInstance from "./axiosInstance";

export const getFormOptions = async (): Promise<FilterOptionsResponse> => {
  try {
    const response = await axiosInstance.get<FilterOptionsResponse>(
      "/api/public/forms/movie"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching filter options", error);
    throw error;
  }
};
