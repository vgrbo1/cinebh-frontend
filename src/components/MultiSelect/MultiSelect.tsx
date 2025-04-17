import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export interface MultiSelectProps {
  icon: React.ReactNode;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  icon,
  options,
  selected,
  onChange,
  placeholder = "Select",
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div
      className="relative flex-1 min-w-[200px] text-base font-primary user-select-none"
      ref={ref}
    >
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="h-12 border border-customGray rounded-lg px-4 pr-10 flex items-center text-customDarkGray shadow-light-50 cursor-pointer"
      >
        <span className="mr-2 text-customDarkCyanBlue">{icon}</span>
        <span className="truncate">
          {selected.length > 0 ? selected.join(", ") : placeholder}
        </span>
        <FontAwesomeIcon
          icon={faChevronDown}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-customDarkGray"
        />
      </div>

      {open && (
        <div className="absolute z-10 mt-2 bg-white border border-customGray rounded-lg shadow-lg p-2 w-full max-h-64 overflow-y-auto">
          {options.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggleOption(opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
