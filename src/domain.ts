import type { ChangeEvent } from "react";
import type { ConfirmationDialogProps } from "./components/confirmationDialog";
import type { ControlsProps } from "./components/controls";
import {
  completionStateSchema,
  type ProcessedQuest,
  type Quest,
} from "./components/quest/domain";
import z from "zod";

const progressItem = z.object({
  id: z.string(),
  completionState: completionStateSchema.optional(),
  isAutoSet: z.boolean().optional(),
  notes: z.array(z.string()).optional(),
});

export const progressSchema = z.array(progressItem);

export type ProgressItem = z.infer<typeof progressItem>;
export type Progress = z.infer<typeof progressSchema>;

export interface AppVM {
  processedQuests?: ProcessedQuest[];
  error?: string;
  isLoading: boolean;
  setQuestCompletionState: (
    id: string,
    newCompletionState: Quest["completionState"],
  ) => void;
  setNoteCompletion: (
    id: string,
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  controls: ControlsProps;
  confirmationDialogProps: ConfirmationDialogProps;
}
