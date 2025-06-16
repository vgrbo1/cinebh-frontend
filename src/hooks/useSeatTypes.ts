import { useQuery } from "@tanstack/react-query";
import { getSeatTypes } from "../services/seatService";
import { ApiSeatType } from "../types/api/ApiSeatType";

export function useSeatTypes() {
  const { data = {}, status } = useQuery({
    queryKey: ["seatTypes"],
    queryFn: () => getSeatTypes(),
    select: (seatTypes) =>
      seatTypes.reduce<Record<string, ApiSeatType>>((acc, st) => {
        acc[st.name] = st;
        return acc;
      }, {}),
  });
  return {
    seatTypes: data,
    seatTypesStatus: status,
  };
}
