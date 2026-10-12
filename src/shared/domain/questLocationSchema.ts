import z from "zod";

export const questLocationSchema = z.enum([
  "whiteOrchard",
  "vizima",
  "velen",
  "skellige",
]);

export type QuestLocation = z.infer<typeof questLocationSchema>;
