import { PaginatedResponse } from "../types/api/PaginatedResponse";
import { Venue } from "../types/model/Venue";
import axiosInstance from "./axiosInstance";

export const getVenues = async (
  page: number,
  pageSize: number
): Promise<PaginatedResponse<Venue>> => {
  try {
    const response = await axiosInstance.get<PaginatedResponse<Venue>>(
      "/api/public/venues",
      {
        params: {
          page: page - 1,
          size: pageSize,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching venues:", error);
    throw error;
  }
};
