import clsx from "clsx";
import React from "react";
import { ApiSeatType } from "../../types/api/ApiSeatType";

interface SeatGuideProps {
  seatTypes: Record<string, ApiSeatType>;
}

const SEAT_TYPE_DISPLAY_NAMES: Record<string, string> = {
  LOVE: "Love Seats",
  REGULAR: "Regular Seats",
  VIP: "VIP Seats",
};

export const SeatGuide: React.FC<SeatGuideProps> = React.memo(
  ({ seatTypes }) => {
    const box =
      "flex items-center justify-center h-[40px] rounded-lg " +
      "border text-sm transition-all";

    const statusRows = [
      {
        key: "available",
        label: "Available",
        classes: clsx(box, "w-[52px] bg-white text-primary border-customGray"),
      },
      {
        key: "reserved",
        label: "Reserved",
        classes: clsx(
          box,
          "w-[52px] bg-customGray text-primary border-transparent"
        ),
      },
      {
        key: "selected",
        label: "Selected",
        classes: clsx(
          box,
          "w-[52px] bg-secondary text-white border-transparent"
        ),
      },
    ];

    const typeRows = Object.values(seatTypes).map((t) => ({
      key: t.name,
      label: `${SEAT_TYPE_DISPLAY_NAMES[t.name]} (${t.price} BAM)`,
      classes: clsx(
        box,
        t.name === "LOVE" ? "w-[108px]" : "w-[52px]",
        "bg-white text-primary border-customGray"
      ),
    }));

    return (
      <div className="p-4 md:p-8">
        <h2 className="text-base text-primary mb-6 text-center">Seat Guide</h2>
        <div className="grid grid-cols-2 gap-y-4 gap-x-1 pb-8 border-b border-customGray">
          <div className="space-y-4">
            {statusRows.map((row) => (
              <div key={row.key} className="flex items-center space-x-4">
                <div className={row.classes}>XY</div>
                <span className="text-base text-primary">{row.label}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {typeRows.map((row) => (
              <div key={row.key} className="flex items-center space-x-4">
                <div className={row.classes}>XY</div>
                <span className="text-base text-primary">{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
