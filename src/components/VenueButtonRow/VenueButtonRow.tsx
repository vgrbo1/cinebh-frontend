import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Marquee from "react-fast-marquee";
import { getVenues } from "../../services/venueService";
import { VenueButtonRowSkeleton } from "../skeleton/VenueButtonRowSkeleton/VenueButtonRowSkeleton";

const PAGE = 1;
const PAGE_SIZE = 6;

export function VenueButtonRow() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues"],
    queryFn: () => getVenues(PAGE, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return <VenueButtonRowSkeleton />;
  }

  if (isError) {
    return <div>Error loading venues</div>;
  }

  return (
    <Marquee
      speed={30}
      pauseOnHover={true}
      className="font-bold text-2xl font-primary py-10"
      autoFill={true}
    >
      {data.content.map((venue) => (
        <div key={venue.id} className="mx-5">
          <button className="rounded p-4 bg-white text-customDarkGray2 border border-customGray">
            {venue.name}
          </button>
        </div>
      ))}
    </Marquee>
  );
}
