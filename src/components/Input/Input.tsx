import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  onSuffixClick?: () => void;
  className?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = "text",
      prefixIcon,
      suffixIcon,
      onSuffixClick,
      className = "",
      ...rest
    },
    ref
  ) => {
    return (
      <div
        className={`flex border items-center bg-white text-black text-base px-3 py-3 rounded-lg h-12 ${className}`}
      >
        {prefixIcon && <div className="mr-2 ">{prefixIcon}</div>}

        <input
          ref={ref}
          type={type}
          className="w-full bg-transparent outline-none"
          {...rest}
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
);

Input.displayName = "Input";
