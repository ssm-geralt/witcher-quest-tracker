import z from "zod";
import { questTypeSchema } from "./shared/domain/questTypeSchema";
import { questNoteSchema } from "./shared/domain/questNoteSchema";
import { questCompletionStateSchema } from "./shared/domain/questCompletionStateSchema";
import { questLocationSchema } from "./shared/domain/questLocationSchema";
import type { Quest } from "./components/quest/domain";
import type { QuestsByCategoriesProps } from "./components/questsByCategories/domain";
import type { ControlsProps } from "./components/controls";
import type { ConfirmationDialogProps } from "./components/confirmationDialog";
import { questPathOptionSchema } from "./shared/domain/questPathOptionSchema";
import { QuestPathSchema } from "./shared/domain/questPathSchema";

export const dependencyRuleSetSchema = z.array(
  // #dependencyRuleSchema
  z.array(
    // #questRuleItemSchema
    z.object({
      name: z.string(),
      // state is optional. no state is mapped to success.
      state: questCompletionStateSchema.optional(),
      // paths is optional. no paths means state is enough.
      // otherwise it needs the state with the given paths selected.
      // #pathRuleSetSchema
      paths: z
        .array(
          // #pathRuleSchema
          z.array(
            // #pathRuleItemSchema
            z.object({ name: z.string(), option: z.string() }),
          ),
        )
        .optional(),
    }),
  ),
);

export const questDataSchema = z.object({
  name: z.string(),
  type: questTypeSchema,
  level: z.number().optional(),
  link: z.string().optional(),
  notes: z.array(questNoteSchema).optional(),
  specialNote: z.object({ text: z.string() }).optional(),
  location: questLocationSchema,
  ignoreLocation: z.boolean().optional(),
  pathOptions: z.array(questPathOptionSchema).optional(),
  isOrdered: z.boolean().optional(),

  cutoffs: z.array(z.string()).optional(),
  disablers: z.array(z.string()).optional(),
  prerequisites: dependencyRuleSetSchema.optional(),
});

export const questDataArraySchema = z.array(questDataSchema);

const progressItem = z.object({
  id: z.string(),
  completionState: questCompletionStateSchema.optional(),
  isAutoSet: z.boolean().optional(),
  notes: z.array(z.number()).optional(),
  selectedPaths: z.array(QuestPathSchema).optional(),
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
  "onCompletionStateClick" | "onNoteCompletionChange" | "onPathChange"
>;
