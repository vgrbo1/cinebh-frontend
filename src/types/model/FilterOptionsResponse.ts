import { Genre } from "./Genre";
import { LocationOption } from "./LocationOption";
import { VenueOption } from "./VenueOption";

export interface FilterOptionsResponse {
  genres: Genre[];
  locations: LocationOption[];
  venues: VenueOption[];
}
