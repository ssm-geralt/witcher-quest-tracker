import z from "zod";

export const QuestPathSchema = z.object({
  name: z.string(),
  optionName: z.string(),
});

export type QuestPath = z.infer<typeof QuestPathSchema>;
