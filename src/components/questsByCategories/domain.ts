import type { Quest, QuestProps } from "../quest/domain";

export interface CategorizedQuests {
  location: string;
  ordered: Quest[];
  unordered: Quest[];
}

export type QuestsByCategoriesProps = {
  quests: Quest[];
} & Pick<QuestProps, "onCompletionStateClick" | "onNoteCompletionChange">;

export type QuestsByCategoriesVM = {
  categorizedQuests: CategorizedQuests[];
} & Pick<
  QuestsByCategoriesProps,
  "onCompletionStateClick" | "onNoteCompletionChange"
>;
