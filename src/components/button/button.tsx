import clsx from "clsx";
import type { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "failure" | "success" | "default";
};

export function Button({ className, variant, ...props }: ButtonProps) {
  return (
    <button
      data-variant={variant}
      {...props}
      className={clsx(
        "cursor-pointer py-1 px-2 border rounded",
        "data-[variant=success]:bg-green-300 data-[variant=success]:text-green-800",
        "data-[variant=failure]:bg-red-300 data-[variant=failure]:text-red-800",
        "disabled:opacity-50",
        className,
      )}
    />
  );
}
