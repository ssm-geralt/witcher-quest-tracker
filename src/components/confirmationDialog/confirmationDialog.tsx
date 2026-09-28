import { Button } from "../button";
import { Dialog, type DialogProps } from "../dialog";

interface ConfirmationDialogAction {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export type ConfirmationDialogProps = DialogProps & {
  data?: {
    title: string;
    okButton: ConfirmationDialogAction;
    cancelButton: ConfirmationDialogAction;
  };
};

export function ConfirmationDialog({
  data,
  ...props
}: ConfirmationDialogProps) {
  const { cancelButton, okButton, title } = data || {};
  return (
    <Dialog {...props}>
      <section className="bg-black text-white p-4 text-center border rounded w-112.5 max-w-[80vw]">
        <header className="mb-4">
          <h2 className="text-xl">{title}</h2>
        </header>

        <div className="flex gap-2 justify-center">
          <Button onClick={cancelButton?.onClick} variant="failure">
            {cancelButton?.text}
          </Button>

          <Button onClick={okButton?.onClick} variant="success">
            {okButton?.text}
          </Button>
        </div>
      </section>
    </Dialog>
  );
}
