import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getMovieProjections } from "../services/movieService";

export const useMovieProjections = (
  movieId: string,
  selectedDate: string,
  selectedLocationIds: number[],
  selectedVenueIds: number[]
) => {
  return useQuery({
    queryKey: [
      "projections",
      selectedDate,
      selectedLocationIds,
      selectedVenueIds,
    ],
    queryFn: () =>
      getMovieProjections(
        movieId,
        selectedDate,
        selectedLocationIds,
        selectedVenueIds
      ),
    select: (projections) => {
      const grouped = new Map();
      projections.forEach((proj) => {
        const key = `${proj.cinemaName}|${proj.hallName}`;
        const label = `${proj.cinemaName} (${proj.hallName})`;
        if (!grouped.has(key)) {
          grouped.set(key, { label, items: [] });
        }
        grouped.get(key)!.items.push(proj);
      });
      return Array.from(grouped.values());
    },
    placeholderData: keepPreviousData,
  });
};
