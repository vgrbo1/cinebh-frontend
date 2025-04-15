import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface SearchBarInputProps {
  title: string;
  setTitle: (value: string) => void;
}

export function SearchBar({ title, setTitle }: SearchBarInputProps) {
  return (
    <div className="relative w-full">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </span>
      <input
        type="text"
        placeholder="Search Movies"
        className="pl-10 pr-4 border border-gray-200 p-2 rounded w-full shadow-md h-12"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
  );
}
