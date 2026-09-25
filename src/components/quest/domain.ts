import z from "zod";

export const questSchema = z.object({
  name: z.string(),
  completionState: z.enum(["success", "empty", "failure"]).optional(),
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
        text: z.string(),
        isCompleted: z.boolean().optional(),
        link: z.string().optional(),
      }),
    )
    .optional(),
  location: z.enum(["whiteOrchard", "vizima", "velen"]),
  finishBefore: z.array(z.string()).optional(),
  isAutoSet: z.boolean().optional(),
});

export const questArraySchema = z.array(questSchema);

export type Quest = z.infer<typeof questSchema>;

export interface QuestProps {
  quest: Quest;
  onCompletionStateChange: (newState?: Quest["completionState"]) => void;
}

export interface QuestVM {
  quest: Quest;
  handleOnCompletionStateChange: () => void;
}
