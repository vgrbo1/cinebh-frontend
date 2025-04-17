import {
  faBuilding,
  faFilm,
  faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Genre } from "../../types/model/Genre";
import { LocationOption } from "../../types/model/LocationOption";
import { VenueOption } from "../../types/model/VenueOption";
import { DateSelector } from "../DateSelector/DateSelector";
import { MultiSelect } from "../MultiSelect/MultiSelect";
import { SearchBar } from "../SearchBar/SearchBar";
import { TimeRangePicker } from "../TimeRangePicker/TimeRangePicker";

export interface SearchFormProps {
  title: string;
  setTitle: (title: string) => void;
  date?: string;
  setDate?: (date: string) => void;
  hasDateSelector?: boolean;

  genres: Genre[];
  locations: LocationOption[];
  venues: VenueOption[];

  onGenreIdsChange: (ids: number[]) => void;
  onLocationIdsChange: (ids: number[]) => void;
  onVenueIdsChange: (ids: number[]) => void;
  fromTime?: string;
  toTime?: string;
  setFromTime?: (time?: string) => void;
  setToTime?: (time?: string) => void;
}

export function SearchForm({
  title,
  setTitle,
  date,
  setDate,
  hasDateSelector,
  genres,
  locations,
  venues,
  onGenreIdsChange,
  onLocationIdsChange,
  onVenueIdsChange,
  fromTime,
  toTime,
  setFromTime,
  setToTime,
}: SearchFormProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);

  const handleGenreChange = (names: string[]) => {
    setSelectedGenres(names);
    const ids = genres.filter((g) => names.includes(g.name)).map((g) => g.id);
    onGenreIdsChange(ids);
  };

  const handleLocationChange = (names: string[]) => {
    setSelectedLocations(names);
    const ids = locations
      .filter((l) => names.includes(l.cityName))
      .map((l) => l.id);
    onLocationIdsChange(ids);
  };

  const handleVenueChange = (names: string[]) => {
    setSelectedVenues(names);
    const ids = venues.filter((v) => names.includes(v.name)).map((v) => v.id);
    onVenueIdsChange(ids);
  };

  return (
    <div className="flex flex-col gap-4 py-4 font-primary">
      <SearchBar title={title} setTitle={setTitle} />

      <div className="flex flex-wrap gap-4 w-full">
        <MultiSelect
          icon={<FontAwesomeIcon icon={faLocationPin} />}
          options={locations.map((l) => l.cityName)}
          selected={selectedLocations}
          onChange={handleLocationChange}
          placeholder="All Cities"
        />

        <MultiSelect
          icon={<FontAwesomeIcon icon={faBuilding} />}
          options={venues.map((v) => v.name)}
          selected={selectedVenues}
          onChange={handleVenueChange}
          placeholder="All Cinemas"
        />

        <MultiSelect
          icon={<FontAwesomeIcon icon={faFilm} />}
          options={genres.map((g) => g.name)}
          selected={selectedGenres}
          onChange={handleGenreChange}
          placeholder="All Genres"
        />

        {setFromTime && setToTime && (
          <TimeRangePicker
            start={fromTime}
            end={toTime}
            onChange={(start, end) => {
              setFromTime(start || undefined);
              setToTime(end || undefined);
            }}
          />
        )}
      </div>

      {hasDateSelector && date && setDate && (
        <DateSelector date={date} setDate={setDate} />
      )}
    </div>
  );
}
