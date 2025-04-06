import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CardList } from "../components/CardList";
import { Venue } from "../types/Venue";
import VenueCard from "./VenueCard";

const PAGE_SIZE = 4;

async function fetchVenues(
  page: number
): Promise<{ items: Venue[]; total: number }> {
  const res = await fetch(
    `http://localhost:8080/api/venues?page=${page - 1}&size=${PAGE_SIZE}`
  );
  if (!res.ok) throw new Error("Failed to fetch venues");

  const data = await res.json();
  return {
    items: data.content,
    total: data.totalElements,
  };
}

export function VenueListSection() {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["venues", page],
    queryFn: () => fetchVenues(page),
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
      items={data.items}
      total={data.total}
      page={page}
      pageSize={PAGE_SIZE}
      onPageChange={setPage}
      renderItem={(venue) => <VenueCard key={venue.id} {...venue} />}
    />
  );
}
