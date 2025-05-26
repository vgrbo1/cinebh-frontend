import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getVenues } from "../../services/venueService";
import { VenueCard } from "../Card/VenueCard";
import { CardListSkeleton } from "../skeleton/CardListSkeleton/CardListSkeleton";
import { CardList } from "./CardList";

const PAGE_SIZE = 4;

export function VenueList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", page],
    queryFn: () => getVenues(page, PAGE_SIZE),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return (
      <div className="px-24">
        <CardListSkeleton
          title="Venues"
          showSeeAll={false}
          itemCount={PAGE_SIZE}
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error loading venues</div>;
  }

  return (
    <div className="px-24">
      <CardList
        title="Venues"
        items={data.content}
        total={data.totalElements}
        page={page}
        pageSize={PAGE_SIZE}
        onPageChange={setPage}
        renderItem={(venue) => <VenueCard key={venue.id} {...venue} />}
      />
    </div>
  );
}
