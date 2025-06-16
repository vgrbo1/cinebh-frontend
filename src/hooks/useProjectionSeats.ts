import { useQuery } from "@tanstack/react-query";
import { getMovieProjectionSeats } from "../services/movieProjectionService";

export function useProjectionSeats(projectionId: number) {
  const { data, status } = useQuery({
    queryKey: ["projectionSeats", projectionId],
    queryFn: () => getMovieProjectionSeats(projectionId),
  });

  return {
    initialSeats: data,
    initialSeatsStatus: status,
  };
}
