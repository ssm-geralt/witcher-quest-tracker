import type z from "zod";
import type { dependencyRuleSetSchema } from "./domain";

type DependencyRuleSet = z.infer<typeof dependencyRuleSetSchema>;

export const pathRuleItemSchema: NonNullable<
  DependencyRuleSet[number][number]["paths"]
>[number][number] = {
  name: "path1",
  option: "option1",
};

export const questRuleItemSchema: DependencyRuleSet[number][number] = {
  name: "Quest 1",
  paths: [
    [pathRuleItemSchema, pathRuleItemSchema], // AND
    // OR
    [pathRuleItemSchema, pathRuleItemSchema],
  ],
  state: "success",
};

export const dependencyRuleSet: DependencyRuleSet = [
  [questRuleItemSchema, questRuleItemSchema], // AND
  // OR
  [questRuleItemSchema, questRuleItemSchema],
];
