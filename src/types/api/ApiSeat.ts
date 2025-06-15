export interface ApiSeat {
  id: number;
  row: string;
  column: number;
  seatType: "REGULAR" | "VIP" | "LOVE";
  available: boolean;
}
