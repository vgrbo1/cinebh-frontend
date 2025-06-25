import { useMutation } from "@tanstack/react-query";
import { useRef } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { SeatSelection } from "../components/SeatSelection/SeatSelection";
import { holdSeats } from "../services/movieProjectionService";
import { SeatData } from "../types/model/SeatData";
export function BuyTickets() {
  const { projectionId } = useParams();
  const reservedSeatIdsRef = useRef<Set<number>>(new Set());
  if (!projectionId) {
    return <div>Projection ID is required</div>;
  }
  const { mutate, status } = useMutation({
    mutationFn: (seatIds: number[]) => holdSeats(projectionId, seatIds),

    onMutate: (seatIds: number[]) => {
      reservedSeatIdsRef.current = new Set(seatIds);
    },

    onSuccess: (response) => {
      window.location.href = response.checkoutUrl;
    },

    onError: () => {
      reservedSeatIdsRef.current.clear();
      toast.error("Failed to reserve seats. Please try again.");
    },
  });

  return (
    <>
      <SeatSelection
        actionLabel={
          status === "pending" ? "Redirecting..." : "Continue to Payment"
        }
        onActionClick={(selectedSeats: SeatData[]) => {
          const selectedSeatIds = selectedSeats.map((seat) => seat.id);
          mutate(selectedSeatIds);
        }}
        reservedSeatIdsRef={reservedSeatIdsRef}
        actionDisabled={status === "pending"}
      />
    </>
  );
}
