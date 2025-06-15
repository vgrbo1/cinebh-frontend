export interface Seat {
  id: number;
  label: string;
  row: string;
  column: number;
  status: "AVAILABLE" | "SELECTED" | "RESERVED";
  seatType: "REGULAR" | "VIP" | "LOVE";
  price: number;
}
