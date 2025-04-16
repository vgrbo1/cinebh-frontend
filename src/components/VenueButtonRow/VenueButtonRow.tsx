import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getVenues } from "../../services/venueService";

const PAGE = 1;
const PAGE_SIZE = 6;

export function VenueButtonRow() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues"],
    queryFn: () => getVenues(PAGE, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues</div>;
  }

  return (
    <div className="w-full px-24 mt-6 flex justify-center">
      <div className="flex flex-wrap gap-8 font-bold font-primary">
        {data.content.map((venue) => (
          <button
            key={venue.id}
            className="w-fit rounded p-4  bg-white text-customDarkGray2 border border-customGray"
          >
            {venue.name}
          </button>
        ))}
      </div>
    </div>
  );
}
