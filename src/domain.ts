import z from "zod";
import { questTypeSchema } from "./shared/domain/questTypeSchema";
import { questNoteSchema } from "./shared/domain/questNoteSchema";
import { questCompletionStateSchema } from "./shared/domain/questCompletionStateSchema";
import { questLocationSchema } from "./shared/domain/questLocation";
import type { Quest } from "./components/quest/domain";
import type { QuestsByCategoriesProps } from "./components/questsByCategories/domain";
import type { ControlsProps } from "./components/controls";
import type { ConfirmationDialogProps } from "./components/confirmationDialog";

export const questDataSchema = z.object({
  name: z.string(),
  type: questTypeSchema,
  level: z.number().optional(),
  link: z.string().optional(),
  notes: z.array(questNoteSchema).optional(),
  specialNote: z.object({ text: z.string() }).optional(),
  location: questLocationSchema,
  ignoreLocation: z.boolean().optional(),
  // finish the given quests before current or they will fail, or be missed
  cutoffFor: z.array(z.string()).optional(),
  // complete this to make given quests available (currently only success counts)
  prerequisiteFor: z.array(z.string()).optional(),
  isOrdered: z.boolean().optional(),
});

export const questDataArraySchema = z.array(questDataSchema);

const progressItem = z.object({
  id: z.string(),
  completionState: questCompletionStateSchema,
  isAutoSet: z.boolean().optional(),
  notes: z.array(z.number()).optional(),
});

export const progressSchema = z.array(progressItem);

export type QuestData = z.infer<typeof questDataSchema>;
export type ProgressItem = z.infer<typeof progressItem>;
export type Progress = z.infer<typeof progressSchema>;

export interface AppControllerQuestsState {
  quests?: Quest[];
  rawQuests?: Quest[];
  isLoading: boolean;
  error?: string;
}

export type AppVM = {
  quests?: Quest[];
  disabledQuests: Set<string>;
  error?: string;
  isLoading: boolean;
  controls: Pick<ControlsProps, "reset">;
  confirmationDialog: Pick<
    ConfirmationDialogProps,
    "isOpen" | "data" | "onAnimationEnd"
  >;
} & Pick<
  QuestsByCategoriesProps,
  "onCompletionStateClick" | "onNoteCompletionChange"
>;
