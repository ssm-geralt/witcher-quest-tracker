import type { ChangeEvent } from "react";
import { Button } from "../button";
import { Checkbox } from "../checkbox";

export interface ControlsAction {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
}

export interface ControlsProps {
  reset: ControlsAction;
  isCompletedVisible: boolean;
  onIsCompletedVisibleChange: (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
}

export function Controls({
  reset,
  isCompletedVisible,
  onIsCompletedVisibleChange,
}: ControlsProps) {
  return (
    <div className="flex gap-4 flex-col items-center justify-center">
      <Button onClick={reset.onClick} disabled={reset.disabled}>
        Reset progress
      </Button>

      <Checkbox
        className="[&&]:flex flex-col items-center gap-2"
        variant="success"
        checked={isCompletedVisible}
        onChange={onIsCompletedVisibleChange}
      >
        <span className="text-sm -order-1">hide completed items</span>
      </Checkbox>
    </div>
  );
}
