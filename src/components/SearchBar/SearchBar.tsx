import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface SearchBarInputProps {
  title: string;
  setTitle: (value: string) => void;
}

export function SearchBar({ title, setTitle }: SearchBarInputProps) {
  return (
    <div className="relative w-full text-base font-primary">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customDarkCyanBlue">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        placeholder="Search Movies"
        className="pl-10 pr-4 border border-customGray text-customDarkGray p-2 rounded-lg w-full shadow-light-50 h-12"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
