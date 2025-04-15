import { SearchBar } from "../SearchBar/SearchBar";

export interface CurrentMoviesSearchFormProps {
  title: string;
  date: string;
  setTitle: (title: string) => void;
  setDate: (date: string) => void;
}

const dates = Array.from({ length: 10 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const label = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  const weekday = date.toLocaleDateString("en-US", { weekday: "short" });
  return {
    label,
    weekday,
    full: date.toISOString().split("T")[0],
    isToday: i === 0,
  };
});

export function CurrentMoviesSearchForm({
  title,
  date,
  setTitle,
  setDate,
}: CurrentMoviesSearchFormProps) {
  return (
    <div className="flex flex-col gap-4 py-4 font-primary">
      <SearchBar title={title} setTitle={setTitle} />
      <div className="grid grid-cols-10 gap-2 w-full">
        {dates.map((d) => (
          <button
            key={d.full}
            onClick={() => setDate(d.full)}
            className={`flex flex-col items-center p-4 rounded transition w-full shadow-md ${
              date === d.full
                ? "bg-secondary text-white"
                : "bg-white text-black"
            }`}
          >
            <span className="font-semibold text-base">{d.label}</span>
            {d.isToday ? (
              <span className="text-base">Today</span>
            ) : (
              <span className="text-base">{d.weekday}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
