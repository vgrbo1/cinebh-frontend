import { Venue } from "../types/Venue";
import { Card } from "./Card";

export function VenueCard({ name, imageUrl, street, cityName }: Venue) {
  return (
    <Card
      imageUrl={imageUrl}
      title={name}
      secondaryText={`${street}, ${cityName}`}
    />
  );
}
