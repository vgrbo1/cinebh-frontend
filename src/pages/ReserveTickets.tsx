import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { SeatSelection } from "../components/SeatSelection/SeatSelection";
import { reserveSeats } from "../services/movieProjectionService";
import { SeatData } from "../types/model/SeatData";

export function ReserveTickets() {
  const { projectionId } = useParams();
  const queryClient = useQueryClient();
  const reservedSeatIdsRef = useRef<Set<number>>(new Set());

  const { mutate, status } = useMutation({
    mutationFn: (seatIds: number[]) =>
      reserveSeats(Number(projectionId), seatIds),

    onMutate: (seatIds: number[]) => {
      reservedSeatIdsRef.current = new Set(seatIds);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectionSeats", Number(projectionId)],
      });
      toast.success("Seats reserved successfully!");
    },

    onError: () => {
      reservedSeatIdsRef.current.clear();
      toast.error("Failed to reserve seats. Please try again.");
    },
  });

  return (
    <SeatSelection
      actionLabel={status === "pending" ? "Reserving..." : "Make Reservation"}
      onActionClick={(selectedSeats: SeatData[]) => {
        const selectedSeatIds = selectedSeats.map((seat) => seat.id);
        mutate(selectedSeatIds);
      }}
      reservedSeatIdsRef={reservedSeatIdsRef}
    />
  );
}
