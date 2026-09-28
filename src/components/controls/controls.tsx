import { Button } from "../button";

export interface ControlsProps {
  reset: {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled: boolean;
  };
}

export function Controls({ reset }: ControlsProps) {
  return (
    <div className="flex gap-4 justify-end">
      <Button onClick={reset.onClick} disabled={reset.disabled}>
        Reset progress
      </Button>
    </div>
  );
}
