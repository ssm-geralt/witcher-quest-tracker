import clsx from "clsx";
import type {
  ComponentPropsWithRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
  PropsWithChildren,
} from "react";
import { CheckmarkIcon } from "../icons/checkmarkIcon";
import { CrossIcon } from "../icons/crossIcon";

export type CheckboxProps = PropsWithChildren<
  Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    "type"
  > &
    ComponentPropsWithRef<"input"> & {
      variant?: "failure" | "success" | "default";
    }
>;

export function Checkbox({
  className,
  variant = "default",
  children,
  ...rest
}: CheckboxProps) {
  return (
    <label className={clsx("inline-block cursor-pointer", className)}>
      <input {...rest} type="checkbox" className="sr-only peer" />

      <span
        data-variant={variant}
        className={clsx(
          "inline-block border w-6 h-6 p-1 rounded",
          "peer-checked:[&_svg]:block",
          "peer-checked:data-[variant=success]:bg-green-300 peer-checked:data-[variant=success]:text-green-800",
          "peer-checked:data-[variant=failure]:bg-red-300 peer-checked:data-[variant=failure]:text-red-800",
        )}
      >
        {variant === "failure" ? (
          <CrossIcon className="w-full h-full hidden" />
        ) : (
          <CheckmarkIcon className="w-full h-full hidden" />
        )}
      </span>

      {children}
    </label>
  );
}
