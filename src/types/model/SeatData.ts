export interface SeatData {
  id: number;
  label: string;
  row: string;
  column: string;
  status: "available" | "selected" | "reserved";
  seatType: "REGULAR" | "VIP" | "LOVE";
}
