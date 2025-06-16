import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { SeatData } from "../../types/model/SeatData";

export const Seat: React.FC<{
  seat: SeatData;
  onClick: (id: number) => void;
}> = ({ seat, onClick }) => {
  const statusStyles = {
    available: "bg-white text-primary border-customGray cursor-pointer",
    selected: "bg-secondary text-white border-transparent cursor-pointer",
    reserved:
      "bg-customGray text-primary border-transparent cursor-not-allowed",
  };
  const variantStyles = {
    regular: "w-[52px]",
    vip: "w-[52px]",
    love: "w-[114px] col-span-2",
  };
  type SeatType = keyof typeof variantStyles;

  const isDisabled = seat.status === "reserved";
  const seatType = seat.seatType.toLowerCase() as SeatType;
  return (
    <button
      onClick={() => onClick(seat.id)}
      disabled={isDisabled}
      className={clsx(
        "h-10 rounded-lg border font-medium text-sm flex items-center justify-center transition-all",
        variantStyles[seatType],
        statusStyles[seat.status]
      )}
    >
      {seat.seatType === "VIP" && <FontAwesomeIcon icon={faStar} />}
      {seat.label}
    </button>
  );
};
