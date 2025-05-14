import { Input, InputProps } from "./Input";

interface FormInputProps extends InputProps {
  label?: string;
  error?: string;
}

export function FormInput({ label, error, ...inputProps }: FormInputProps) {
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

      <Input {...inputProps} />

      {error && <p className="mt-1 text-xs text-customLightRed">{error}</p>}
    </div>
  );
}
