import type { QuestsByCategoriesProps, QuestsByCategoriesVM } from "./domain";
import { categorizeQuests } from "./helpers";

export const useQuestsByCategoriesController = ({
  quests,
  onCompletionStateClick,
  onNoteCompletionChange,
  disabledQuests,
}: QuestsByCategoriesProps): QuestsByCategoriesVM => ({
  categorizedQuests: categorizeQuests(quests),
  onCompletionStateClick,
  onNoteCompletionChange,
  disabledQuests,
});
