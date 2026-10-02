import type { ChangeEvent } from "react";
import z from "zod";

export const completionStateSchema = z.enum(["success", "empty", "failure"]);

export const questSchema = z.object({
  id: z.string(),
  name: z.string(),
  completionState: completionStateSchema.optional(),
  type: z.enum([
    "main",
    "side",
    "contract",
    "treasure",
    "gwent",
    "scavenger",
    "encounter",
  ]),
  level: z.number().optional(),
  link: z.string(),
  notes: z
    .array(
      z.object({
        id: z.string(),
        text: z.string(),
        isCompleted: z.boolean().optional(),
        link: z.string().optional(),
      }),
    )
    .optional(),
  specialNote: z.object({ text: z.string() }).optional(),
  location: z.enum(["whiteOrchard", "vizima", "velen", "skellige"]),
  ignoreLocation: z.boolean().optional(),
  finishBefore: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  isAutoSet: z.boolean().optional(),
});

export const questArraySchema = z.array(questSchema);

export type Quest = z.infer<typeof questSchema>;

export type ProcessedQuest = Omit<Quest, "finishBefore"> & {
  finishBefore: { id: string; name: string }[];
};

export interface QuestProps {
  quest: ProcessedQuest;
  onCompletionStateChange: (newState?: Quest["completionState"]) => void;
  onNoteCompletionChange: (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
}

export interface QuestVM {
  quest: ProcessedQuest;
  handleOnCompletionStateChange: () => void;
  onNoteCompletionChange: (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
}
