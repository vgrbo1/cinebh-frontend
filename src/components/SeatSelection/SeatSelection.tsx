import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useSubscription } from "react-stomp-hooks";
import { toast } from "react-toastify";
import { useProjectionDetails } from "../../hooks/useProjectionDetails";
import { useProjectionSeats } from "../../hooks/useProjectionSeats";
import { useSeatTypes } from "../../hooks/useSeatTypes";
import { ApiSeatStatus } from "../../types/api/ApiSeatStatus";
import { SeatData } from "../../types/model/SeatData";
import { Button } from "../Button/Button";
import { Layout } from "../Layout/Layout";
import { MovieProjectionDetails } from "../MovieProjectionDetails/MovieProjectionDetails";
import { SeatGuide } from "../SeatGuide/SeatGuide";
import { SeatMap } from "../SeatMap/SeatMap";
import { SelectedSeats } from "../SelectedSeats/SelectedSeats";
import { MovieProjectionDetailsSkeleton } from "../skeleton/MovieProjectionDetailsSkeleton/MovieProjectionDetailsSkeleton";
import { SeatGuideSkeleton } from "../skeleton/SeatGuideSkeleton/SeatGuideSkeleton";
import { SeatMapSkeleton } from "../skeleton/SeatMapSkeleton/SeatMapSkeleton";
import { SelectedSeatsSkeleton } from "../skeleton/SelectedSeatsSkeleton/SelectedSeatsSkeleton";

interface SeatSelectionProps {
  actionLabel: string;
  onActionClick: (selectedSeats: SeatData[]) => void;
  actionDisabled?: boolean;
  reservedSeatIdsRef: React.RefObject<Set<number>>;
}

export function SeatSelection({
  actionLabel,
  onActionClick,
  actionDisabled,
  reservedSeatIdsRef,
}: SeatSelectionProps) {
  const { projectionId } = useParams();
  const [seats, setSeats] = useState<SeatData[]>([]);
  if (!projectionId) {
    return <div>Projection ID is required</div>;
  }
  const { initialSeats, initialSeatsStatus } = useProjectionSeats(
    projectionId ? parseInt(projectionId) : 0
  );

  const { seatTypes, seatTypesStatus } = useSeatTypes();

  const { projectionDetails, projectionDetailsStatus } = useProjectionDetails(
    projectionId ? parseInt(projectionId) : 0
  );

  useEffect(() => {
    if (initialSeats) {
      setSeats(
        initialSeats.map((seat) => ({
          ...seat,
          status: seat.available ? "available" : "reserved",
          label: `${seat.row}${seat.column}`,
        }))
      );
    }
  }, [initialSeats]);

  useSubscription(`/topic/projections/${projectionId}/seats`, (message) => {
    const updatedSeats: ApiSeatStatus[] = JSON.parse(message.body).seats;
    const mySeatIds = reservedSeatIdsRef.current;
    setSeats((prev) =>
      prev.map((seat) => {
        const updatedSeat = updatedSeats.find((s) => s.id === seat.id);
        if (!updatedSeat) return seat;

        const nowReserved = !updatedSeat.available;

        if (mySeatIds.has(updatedSeat.id)) {
          mySeatIds.delete(updatedSeat.id);
          return seat;
        }

        if (nowReserved && seat.status === "selected") {
          toast.info(`Seat ${seat.label} was just reserved by someone else.`);
        }

        return {
          ...seat,
          status: nowReserved ? "reserved" : "available",
        };
      })
    );
  });

  const handleSeatClick = useCallback((seatId: number) => {
    setSeats((currentSeats) => {
      const seatToToggle = currentSeats.find((s) => s.id === seatId);
      if (!seatToToggle) return currentSeats;

      const isSelecting = seatToToggle.status !== "selected";

      if (!isSelecting) {
        return currentSeats.map((seat) =>
          seat.id === seatId ? { ...seat, status: "available" } : seat
        );
      }

      const currentWeight = currentSeats.reduce((weight, seat) => {
        if (seat.status === "selected") {
          return weight + (seat.seatType === "LOVE" ? 2 : 1);
        }
        return weight;
      }, 0);

      const newSeatWeight = seatToToggle.seatType === "LOVE" ? 2 : 1;

      if (currentWeight + newSeatWeight > 6) {
        toast.warn("You can select a maximum of 6 seats.");
        return currentSeats;
      }

      return currentSeats.map((seat) =>
        seat.id === seatId ? { ...seat, status: "selected" } : seat
      );
    });
  }, []);

  const selectedSeats = useMemo(
    () => seats.filter((s) => s.status === "selected"),
    [seats]
  );

  const isLoading =
    initialSeatsStatus === "pending" ||
    projectionDetailsStatus === "pending" ||
    seatTypesStatus === "pending";

  return (
    <Layout>
      <h2 className="text-2xl font-bold text-primary px-24 my-8">
        Seat Options
      </h2>
      {isLoading || !projectionDetails ? (
        <MovieProjectionDetailsSkeleton />
      ) : (
        <MovieProjectionDetails details={projectionDetails} />
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <div>
          {isLoading || !seatTypes ? (
            <SeatMapSkeleton />
          ) : seatTypesStatus == "error" ? (
            <p className="text-customLightRed text-center p-8 bg-white rounded-xl shadow-sm">
              Sorry, we couldn't load the seating map.
            </p>
          ) : (
            <SeatMap seats={seats} onSeatClick={handleSeatClick} />
          )}
        </div>
        <div>
          {seatTypesStatus == "pending" ? (
            <SeatGuideSkeleton />
          ) : (
            <SeatGuide seatTypes={seatTypes} />
          )}
          {isLoading ? (
            <SelectedSeatsSkeleton />
          ) : (
            <SelectedSeats seats={selectedSeats} seatPrices={seatTypes} />
          )}
          <div className="mt-8">
            <Button
              variant="secondary"
              className="w-full disabled:bg-customGray2 disabled:cursor-not-allowed"
              disabled={actionDisabled || selectedSeats.length === 0}
              onClick={() => onActionClick(selectedSeats)}
            >
              {actionLabel}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
