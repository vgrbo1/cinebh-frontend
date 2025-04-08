import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CardList } from "../components/CardList";
import { getVenues } from "../services/venueService";
import VenueCard from "./VenueCard";

export function VenueListSection() {
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", page],
    queryFn: () => getVenues(page, pageSize),
    placeholderData: keepPreviousData,
  });

  if (isLoading || !data) {
    return <div>Loading venues...</div>;
  }

  if (isError) {
    return <div>Error loading venues</div>;
  }

  return (
    <CardList
      title="Venues"
      seeAllLink="/venues"
      items={data.content}
      total={data.totalElements}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      renderItem={(venue) => <VenueCard key={venue.id} {...venue} />}
    />
  );
}
