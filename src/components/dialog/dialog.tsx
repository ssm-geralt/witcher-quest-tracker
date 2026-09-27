import clsx from "clsx";
import {
  useEffect,
  useState,
  type DetailedHTMLProps,
  type DialogHTMLAttributes,
} from "react";
import { createPortal } from "react-dom";

export type DialogProps = Omit<
  DetailedHTMLProps<DialogHTMLAttributes<HTMLDialogElement>, HTMLDialogElement>,
  "open"
> & {
  isOpen: boolean;
  onBackgroundClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export function Dialog({
  isOpen,
  onBackgroundClick,
  children,
  ...props
}: DialogProps) {
  const [open, setOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpen(true);
    }
  }, [isOpen]);

  useEffect(() => {
    const body = document.body;
    if (open) {
      body.classList.add("modal-open");
    } else {
      body.classList.remove("modal-open");
    }
  }, [open]);

  if (!isOpen && !open) {
    return null;
  }

  return createPortal(
    <>
      <div
        className={clsx(
          "fixed inset-0 flex items-center justify-center p-5 z-100 bg-black",
          isOpen ? "animate-backdrop-in" : "animate-backdrop-out",
        )}
        onClick={onBackgroundClick}
      />

      <dialog
        {...props}
        className={
          "fixed top-1/2 left-1/2 z-101 max-h-full overflow-auto -translate-1/2 bg-transparent"
        }
        open={open}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={isOpen ? "animate-modal-in" : "animate-modal-out"}
          onAnimationEnd={({ animationName }) => {
            if (animationName === "modal-out") {
              setOpen(false);
            }
          }}
        >
          {children}
        </div>
      </dialog>
    </>,
    document.body,
  );
}
