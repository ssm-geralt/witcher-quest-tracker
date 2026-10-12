import clsx from "clsx";
import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export function Select({ className, ...rest }: SelectProps) {
  return (
    <select
      className={clsx(className, "border px-2 py-1 w-full rounded")}
      {...rest}
    />
  );
}
