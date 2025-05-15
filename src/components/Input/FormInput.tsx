import React from "react";
import { Input, InputProps } from "./Input";

export interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, ...inputProps }, ref) => {
    return (
      <div className="mb-4 w-full">
        {label && (
          <label
            className={`text-base mb-1 block ${
              error ? "text-customLightRed" : "text-white"
            }`}
          >
            {label}
          </label>
        )}

        <Input
          ref={ref}
          className={error ? "border-customLightRed" : "border-customGray"}
          {...inputProps}
        />

        {error && <p className="mt-1 text-xs text-customLightRed">{error}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
