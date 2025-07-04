import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../components/Button/Button";
import { SeatSelection } from "../components/SeatSelection/SeatSelection";
import { reserveSeats } from "../services/movieProjectionService";
import { SeatData } from "../types/model/SeatData";
export function ReserveTickets() {
  const { projectionId } = useParams();
  const queryClient = useQueryClient();
  const reservedSeatIdsRef = useRef<Set<number>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const { mutate, status } = useMutation({
    mutationFn: (seatIds: number[]) => {
      if (!projectionId) {
        return Promise.reject(new Error("Projection ID is missing."));
      }
      return reserveSeats(projectionId, seatIds);
    },
    onMutate: (seatIds: number[]) => {
      reservedSeatIdsRef.current = new Set(seatIds);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projectionSeats", projectionId],
      });
      setIsDialogOpen(true);
    },

    onError: () => {
      reservedSeatIdsRef.current.clear();
      toast.error("Failed to reserve seats. Please try again.");
    },
  });

  if (!projectionId) {
    return <div>Projection ID is required</div>;
  }
  return (
    <>
      <SeatSelection
        actionLabel={status === "pending" ? "Reserving..." : "Make Reservation"}
        onActionClick={(selectedSeats: SeatData[]) => {
          const selectedSeatIds = selectedSeats.map((seat) => seat.id);
          mutate(selectedSeatIds);
        }}
        reservedSeatIdsRef={reservedSeatIdsRef}
        actionDisabled={status === "pending"}
      />
      <div>
        <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Portal>
            <Dialog.Content className="fixed font-primary left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 rounded-md bg-white p-8 ">
              <div className="flex justify-between items-center mb-4">
                <Dialog.Title className="text-xl font-bold text-primary">
                  Seats Reserved!
                </Dialog.Title>
                <Dialog.Close className="cursor-pointer">
                  <FontAwesomeIcon icon={faXmark} />
                </Dialog.Close>
              </div>
              <p className="text-center max-w-sm text-sm text-customDarkGray">
                Your reservation confirmation has been sent to your email. You
                can also see your reservation details on your User profile and
                set a reminder for ticket purchasing.
              </p>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  className="h-8 mt-8 text-xs font-semibold"
                  onClick={() => navigate("/")}
                >
                  Back to Home
                </Button>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}
