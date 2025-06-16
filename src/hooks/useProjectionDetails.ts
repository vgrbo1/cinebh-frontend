import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../services/movieProjectionService";

export function useProjectionDetails(projectionId: number) {
  const { data, status } = useQuery({
    queryKey: ["projectionDetails", projectionId],
    queryFn: () => getDetails(projectionId),
  });

  return {
    projectionDetails: data,
    projectionDetailsStatus: status,
  };
}
