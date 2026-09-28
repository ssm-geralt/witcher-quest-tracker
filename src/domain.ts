import { completionStateSchema, type Quest } from "./components/quest/domain";
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
  quests?: Quest[];
  error?: string;
  isLoading: boolean;
  setQuestCompletionState: (
    index: number,
    newCompletionState: Quest["completionState"],
  ) => void;
}
