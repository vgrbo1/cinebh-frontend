import { DateSelector } from "../DateSelector/DateSelector";
import { SearchBar } from "../SearchBar/SearchBar";

export interface SearchFormProps {
  title: string;
  date?: string;
  setTitle: (title: string) => void;
  setDate?: (date: string) => void;
  hasDateSelector?: boolean;
}

export function SearchForm({
  title,
  date,
  setTitle,
  setDate,
  hasDateSelector,
}: SearchFormProps) {
  return (
    <div className="flex flex-col gap-4 py-4 font-primary">
      <SearchBar title={title} setTitle={setTitle} />
      {hasDateSelector && date && setDate && (
        <DateSelector date={date} setDate={setDate} />
      )}
    </div>
  );
}
