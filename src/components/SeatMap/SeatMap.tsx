import { useMemo } from "react";
import { SeatData } from "../../types/model/SeatData";

import { Seat } from "../Seat/Seat";

export const SeatMap: React.FC<{
  seats: SeatData[];
  onSeatClick: (id: number) => void;
}> = ({ seats, onSeatClick }) => {
  const rows = useMemo(() => {
    const grouped: Record<string, SeatData[]> = {};
    seats.forEach((seat) => {
      if (!grouped[seat.row]) grouped[seat.row] = [];
      grouped[seat.row].push(seat);
    });
    return Object.values(grouped);
  }, [seats]);
  return (
    <div className="p-4 md:p-8">
      <h2 className="text-base text-primary mb-6 text-center">Cinema Screen</h2>
      <div className="mx-auto w-3/4 mb-8 h-1 bg-secondary" />
      <div className="flex flex-col items-center space-y-2">
        {rows.map((rowSeats, index) => {
          const row = rowSeats[0];
          if (row.seatType === "LOVE")
            return (
              <div
                key={`row-${index}`}
                className="grid grid-cols-9 w-full max-w-xl"
              >
                {rowSeats.slice(0, 2).map((seat) => (
                  <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                ))}
                <div className="col-span-1"></div>
                {rowSeats.slice(2, 4).map((seat) => (
                  <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                ))}
              </div>
            );
          return (
            <div
              key={`row-${index}`}
              className="grid grid-cols-9 w-full max-w-xl"
            >
              {rowSeats
                .filter((s) => parseInt(s.column) <= 4)
                .map((seat) => (
                  <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                ))}
              <div className="col-span-1"></div>
              {rowSeats
                .filter((s) => parseInt(s.column) > 4)
                .map((seat) => (
                  <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
                ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};
