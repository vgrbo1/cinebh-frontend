export interface DateSelectorProps {
  date: string;
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

export function DateSelector({ date, setDate }: DateSelectorProps) {
  return (
    <div className="grid grid-cols-10 gap-2 w-full">
      {dates.map((d) => (
        <button
          key={d.full}
          onClick={() => setDate(d.full)}
          className={`flex flex-col items-center p-4 rounded-lg transition w-full shadow-light-50  cursor-pointer  ${
            date === d.full
              ? "bg-secondary text-white"
              : "bg-white text-primary border border-customGray"
          }`}
        >
          <span
            className={`${
              date === d.full
                ? "font-bold text-px-20"
                : "font-semibold text-base"
            } font-primary`}
          >
            {d.label}
          </span>
          {d.isToday ? (
            <span
              className={`text-px-16 font-primary ${
                date === d.full ? "text-white" : "text-customDarkGray"
              }`}
            >
              Today
            </span>
          ) : (
            <span
              className={`text-px-16 font-primary ${
                date === d.full ? "text-white" : "text-customDarkGray"
              }`}
            >
              {d.weekday}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
