import z from "zod";

export const questPathOptionSchema = z.object({
  name: z.string(),
  options: z.array(
    z.object({
      name: z.string(),
    }),
  ),
});

export type QuestPathOption = z.infer<typeof questPathOptionSchema>;
