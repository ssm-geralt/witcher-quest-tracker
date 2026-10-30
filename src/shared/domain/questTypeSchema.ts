import z from "zod";

export const questTypeSchema = z.enum([
  "main",
  "side",
  "contract",
  "treasure",
  "gwent",
  "scavenger",
  "encounter",
  "race",
  "fistfight",
]);

export type QuestType = z.infer<typeof questTypeSchema>;
