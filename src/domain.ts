import z from "zod";

export const questSchema = z.object({
  name: z.string(),
  completed: z.boolean(),
  type: z.enum(["main", "side", "contract", "treasure", "gwent", "scavenger"]),
  level: z.number(),
  link: z.string(),
  notes: z
    .array(
      z.object({
        text: z.string(),
        completed: z.boolean().optional(),
        link: z.string().optional(),
      }),
    )
    .optional(),
  location: z.enum(["whiteOrchard"]),
  finishBefore: z.array(z.string()).optional(),
});

export const questArraySchema = z.array(questSchema);

export type Quest = z.infer<typeof questSchema>;

export interface AppVM {
  quests?: Quest[];
  error?: string;
  isLoading: boolean;
}
