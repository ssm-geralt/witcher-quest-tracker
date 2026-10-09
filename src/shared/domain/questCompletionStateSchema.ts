import z from "zod";

export const questCompletionStateSchema = z.enum([
  "success",
  "empty",
  "failure",
]);

export type QuestCompletionState = z.infer<typeof questCompletionStateSchema>;
