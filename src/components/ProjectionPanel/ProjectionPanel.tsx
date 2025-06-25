import {
  faArrowLeft,
  faArrowRight,
  faBuilding,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useFilterOptions } from "../../hooks/useFilterOptions";
import { useMovieProjections } from "../../hooks/useMovieProjections";
import { MovieProjection } from "../../types/model/MovieProjection";
import { generateNextTenDates, toTimeString } from "../../util/dateUtils";
import { Button } from "../Button/Button";
import { MultiSelect } from "../MultiSelect/MultiSelect";

export function ProjectionPanel({ movieId }: { movieId: string }) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [selectedVenueIds, setSelectedVenueIds] = useState<number[]>([]);
  const [selectedLocationIds, setSelectedLocationIds] = useState<number[]>([]);
  const [selectedProjectionId, setSelectedProjectionId] = useState<
    string | null
  >(null);
  const dateScrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { data: filterOptions, status: filterOptionsStatus } =
    useFilterOptions();

  const { data: projections, status: projectionsStatus } = useMovieProjections(
    movieId,
    selectedDate,
    selectedLocationIds,
    selectedVenueIds
  );

  useEffect(() => {
    setSelectedProjectionId(null);
  }, [selectedDate, selectedLocationIds, selectedVenueIds]);

  const locations = filterOptions?.locations ?? [];
  const venues = filterOptions?.venues ?? [];

  const locationNames = useMemo(
    () =>
      locations
        .filter((l) => selectedLocationIds.includes(l.id))
        .map((l) => l.cityName),
    [locations, selectedLocationIds]
  );
  const venueNames = useMemo(
    () =>
      venues.filter((v) => selectedVenueIds.includes(v.id)).map((v) => v.name),
    [venues, selectedVenueIds]
  );

  if (filterOptionsStatus === "pending" || projectionsStatus === "pending") {
    return <div className="text-center py-6">Loading...</div>;
  }

  if (filterOptionsStatus === "error" || projectionsStatus === "error") {
    return (
      <div className="text-center py-6 text-customLightRed">
        Something went wrong. Please try again.
      </div>
    );
  }

  const scroll = (direction: "left" | "right") => {
    if (dateScrollRef.current) {
      dateScrollRef.current.scrollBy({
        left: direction === "left" ? -120 : 120,
        behavior: "smooth",
      });
    }
  };

  const handleLocationChange = (names: string[]) => {
    const ids = locations
      .filter((l) => names.includes(l.cityName))
      .map((l) => l.id);
    setSelectedLocationIds(ids);
  };

  const handleVenueChange = (names: string[]) => {
    const ids = venues.filter((v) => names.includes(v.name)).map((v) => v.id);
    setSelectedVenueIds(ids);
  };
  const dates = generateNextTenDates();

  return (
    <div className="h-[528px] rounded-2xl shadow-md p-6 bg-white font-primary shadow-light-400 flex flex-col">
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 w-full">
          <MultiSelect
            icon={<FontAwesomeIcon icon={faLocationPin} />}
            options={locations.map((l) => l.cityName)}
            selected={locationNames}
            onChange={handleLocationChange}
            placeholder="All Cities"
          />
          <MultiSelect
            icon={<FontAwesomeIcon icon={faBuilding} />}
            options={venues.map((v) => v.name)}
            selected={venueNames}
            onChange={handleVenueChange}
            placeholder="All Cinemas"
          />
        </div>

        <div>
          <div
            ref={dateScrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {dates.map((date) => (
              <button
                key={date.full}
                onClick={() => setSelectedDate(date.full)}
                className={`flex flex-col items-center px-4 py-2 rounded-lg w-[78px] h-[72px] whitespace-nowrap transition cursor-pointer ${
                  selectedDate === date.full
                    ? "bg-secondary text-white"
                    : "border border-customGray bg-white text-primary"
                }`}
              >
                <span className="font-bold text-xl">{date.day}</span>
                <span className="text-base">{date.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="p-3 w-12 h-12 flex items-center justify-center rounded-lg border border-customGray bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            className="p-3 w-12 h-12 flex items-center justify-center rounded-lg border border-customGray bg-white hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll mt-6 pr-2 space-y-6">
        <h3 className="text-xl font-bold text-primary">Showtimes</h3>

        {projections.length === 0 ? (
          <div className="text-center py-6 text-customDarkGray w-full">
            No projections available for the selected date and filters.
          </div>
        ) : (
          projections.map((group) => (
            <div key={group.label} className="space-y-2">
              <p className="text-primary font-semibold text-lg">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-3">
                {group.items.map((projection: MovieProjection) => (
                  <button
                    key={projection.id}
                    onClick={() => {
                      if (projection.id !== selectedProjectionId) {
                        setSelectedProjectionId(projection.id);
                      } else {
                        setSelectedProjectionId(null);
                      }
                    }}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-base font-semibold border shadow-light-50 transition-colors cursor-pointer",
                      {
                        "bg-secondary text-white border-secondary":
                          projection.id === selectedProjectionId,
                        "bg-white text-primary border-customGray":
                          projection.id !== selectedProjectionId,
                      }
                    )}
                  >
                    {toTimeString(projection.startTime)}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border-t flex flex-col sm:flex-row gap-4 border-customGray mt-2 pt-4">
        <Button
          variant="outline"
          className="w-full disabled:cursor-not-allowed disabled:border-customGray2 disabled:text-customGray2"
          disabled={!selectedProjectionId}
          onClick={() => {
            if (selectedProjectionId) {
              navigate(`/projections/${selectedProjectionId}/reserve`);
            }
          }}
        >
          Reserve Ticket
        </Button>
        <Button
          variant="secondary"
          className="w-full disabled:cursor-not-allowed disabled:border-transparent disabled:text-white disabled:bg-customGray2"
          disabled={!selectedProjectionId}
          onClick={() => {
            if (selectedProjectionId) {
              navigate(`/projections/${selectedProjectionId}/buy`);
            }
          }}
        >
          Buy Ticket
        </Button>
      </div>
    </div>
  );
}
