import z from "zod";

export const questNoteSchema = z.object({
  text: z.string(),
  isCompleted: z.boolean().optional(),
  link: z.string().optional(),
});

export type QuestNote = z.infer<typeof questNoteSchema>;
