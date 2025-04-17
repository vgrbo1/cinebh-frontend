import { faChevronDown, faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";

export interface TimeRangePickerProps {
  start?: string;
  end?: string;
  onChange: (start?: string, end?: string) => void;
}

export function TimeRangePicker({
  start,
  end,
  onChange,
}: TimeRangePickerProps) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value || undefined, end);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(start, value || undefined);
  };

  return (
    <div className="relative flex-1 min-w-[200px]" ref={pickerRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="h-12 border border-customGray rounded-lg px-4 pr-10 flex items-center text-customDarkGray shadow-light-50 cursor-pointer font-primary text-base"
      >
        <span className="mr-auto flex items-center gap-2">
          <FontAwesomeIcon icon={faClock} className="text-customDarkCyanBlue" />
          {start && end ? `${start} - ${end}` : "Select Time Range"}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customDarkGray"
        />
      </div>

      {open && (
        <div className="absolute z-10 mt-2 bg-white border border-customGray rounded-lg shadow-lg p-4 w-full">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-customDarkGray mb-1">
              Select Time Range
            </label>
            <div className="flex gap-2">
              <input
                type="time"
                value={start ?? ""}
                onChange={handleStartChange}
                className="flex-1 border border-customGray rounded-lg p-2"
              />
              <input
                type="time"
                value={end ?? ""}
                onChange={handleEndChange}
                className="flex-1 border border-customGray rounded-lg p-2"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
