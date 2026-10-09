import { Button } from "../button";

export interface ControlsAction {
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled: boolean;
}

export interface ControlsProps {
  reset: ControlsAction;
}

export function Controls({ reset }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-center">
      <Button onClick={reset.onClick} disabled={reset.disabled}>
        Reset progress
      </Button>
    </div>
  );
}
