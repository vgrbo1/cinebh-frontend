import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonProps) {
  const baseClasses = clsx(
    "select-none cursor-pointer inline-flex items-center justify-center font-semibold rounded-lg px-5 py-3 transition-colors duration-200",
    {
      "bg-primary text-white border border-white hover:bg-primary/90":
        variant === "primary",
      "bg-secondary text-white hover:bg-secondary/70": variant === "secondary",
      "border border-secondary text-secondary hover:bg-secondary hover:text-white":
        variant === "outline",
      "opacity-50 cursor-not-allowed": props.disabled,
    },
    className
  );

  return (
    <button type={props.type || "button"} className={baseClasses} {...props}>
      {children}
    </button>
  );
}
