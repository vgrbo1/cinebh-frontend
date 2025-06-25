import { useQuery } from "@tanstack/react-query";
import { getMovieProjectionSeats } from "../services/movieProjectionService";

export function useProjectionSeats(projectionId: string | undefined) {
  const { data, status } = useQuery({
    queryKey: ["projectionSeats", projectionId],
    queryFn: () => getMovieProjectionSeats(projectionId!),
    enabled: !!projectionId,
  });

  return {
    initialSeats: data,
    initialSeatsStatus: status,
  };
}
