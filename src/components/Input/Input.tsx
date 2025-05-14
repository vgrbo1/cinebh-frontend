import React from "react";

export interface InputProps {
  type?: "text" | "password" | "email";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onSuffixClick?: () => void;
  className?: string;
}

export function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  prefixIcon,
  suffixIcon,
  onSuffixClick,
  className = "",
}: InputProps) {
  return (
    <div
      className={`flex border items-center bg-white text-black text-base px-3 py-3 rounded-lg h-12 ${className}`}
    >
      {prefixIcon && (
        <div className="mr-2 text-customDarkCyanBlue">{prefixIcon}</div>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none"
      />

      {suffixIcon && (
        <div
          className={`ml-2 text-customDarkCyanBlue ${
            onSuffixClick ? "cursor-pointer" : ""
          }`}
          onClick={onSuffixClick}
        >
          {suffixIcon}
        </div>
      )}
    </div>
  );
}
