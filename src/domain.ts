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

export interface AppVM {
  quests?: Quest[];
  error?: string;
  isLoading: boolean;
}

export const quest: Quest = {
  name: "Bloody Baron",
  link: "https://witcher.fandom.com/wiki/Bloody_Baron_(quest)",
  level: 6,
  location: "velen",
  type: "main",
  notes: [
    {
      text: "Get the Nilfgaardian armor set from the quartermaster, which can be found in Crow's Perch along with matching horse gear. Note that the set does not level with you, but if you wait until you are a higher level, the set will also be a higher level.",
      isCompleted: false,
    },
    {
      text: "You can get the Nilfgaardian crossbow from the quartermaster at Crow's Perch (part of the elite crossbow set)",
      isCompleted: false,
    },
    {
      text: "Faster way to get up to the Smiths at Crow's Perch.",
      link: "https://www.youtube.com/watch?v=0awxfvgPUj0",
    },
    {
      text: "Find the underwater cave that leads to Crow's Perch.",
      isCompleted: false,
      link: "https://www.youtube.com/watch?v=ZpOGFPHpMk4&t=3s",
    },
    {
      text: "You can see someone in Crow's Perch putting up the new signtravel post, which becomes available to use after the baron questline.",
    },
    {
      text: "Secret room hiding a dead body in Crow's Perch.",
      link: "https://www.youtube.com/watch?v=MeneR0uzWqQ&t=33s",
      isCompleted: false,
    },
  ],
};
