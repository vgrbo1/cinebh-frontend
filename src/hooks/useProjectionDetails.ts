import { useQuery } from "@tanstack/react-query";
import { getDetails } from "../services/movieProjectionService";

export function useProjectionDetails(projectionId: string | undefined) {
  const { data, status } = useQuery({
    queryKey: ["projectionDetails", projectionId],
    queryFn: () => getDetails(projectionId!),
    enabled: !!projectionId,
  });

  return {
    projectionDetails: data,
    projectionDetailsStatus: status,
  };
}
