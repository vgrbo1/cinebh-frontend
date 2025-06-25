import { useMemo } from "react";
import { ApiSeatType } from "../../types/api/ApiSeatType";
import { SeatData } from "../../types/model/SeatData";

export const SelectedSeats: React.FC<{
  seats: SeatData[];
  seatPrices: Record<string, ApiSeatType>;
}> = ({ seats, seatPrices }) => {
  const totalPrice = useMemo(
    () => seats.reduce((sum, seat) => sum + seatPrices[seat.seatType].price, 0),
    [seats, seatPrices]
  );
  const seatLabels = useMemo(
    () => seats.map((s) => s.label).join(", "),
    [seats]
  );
  return (
    <div className="px-8 py-4">
      <h2 className="text-base text-primary mb-6 text-center">Chosen Seats</h2>

      <div className="flex justify-between items-end border-b border-customGray pb-1">
        <p className="text-sm text-primary">Seat(s)</p>
        <p className="text-sm text-primary text-right">Total price</p>
      </div>

      <div className="flex justify-between items-start pt-2 pb-4">
        <p className="text-xl font-bold text-primary h-8">{seatLabels || ""}</p>
        <p className="text-xl font-bold text-primary text-right h-8">
          {totalPrice > 0 ? `${totalPrice} BAM` : ""}
        </p>
      </div>
    </div>
  );
};
