import { Venue } from "../types/Venue";

function VenueCard({ name, imageUrl, street, cityName }: Venue) {
  return (
    <div className="rounded-xl shadow-md bg-white w-full p-4">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-64 object-cover rounded-xl mb-4"
      />
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-500">
        {street}, {cityName}
      </p>
    </div>
  );
}

export default VenueCard;
