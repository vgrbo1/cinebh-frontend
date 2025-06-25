export interface ApiSeat {
  id: number;
  row: string;
  column: string;
  seatType: "REGULAR" | "VIP" | "LOVE";
  available: boolean;
}
