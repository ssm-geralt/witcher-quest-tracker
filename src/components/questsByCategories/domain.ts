import type { ChangeEvent } from "react";
import type { ProcessedQuest, Quest } from "../quest/domain";

export interface CategorizedQuests {
  location: string;
  ordered: ProcessedQuest[];
  unordered: ProcessedQuest[];
}

export interface QuestsByCategoriesProps {
  quests: ProcessedQuest[];
  setQuestCompletionState: (
    id: string,
    newCompletionState: Quest["completionState"],
  ) => void;
  setNoteCompletion: (
    id: string,
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
}

export type QuestsByCategoriesVM = {
  categorizedQuests: CategorizedQuests[];
} & Pick<
  QuestsByCategoriesProps,
  "setQuestCompletionState" | "setNoteCompletion"
>;
