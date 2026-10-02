import type { QuestsByCategoriesProps, QuestsByCategoriesVM } from "./domain";
import { categorizeQuests } from "./helpers";

export const useQuestsByCategoriesController = ({
  quests,
  setNoteCompletion,
  setQuestCompletionState,
}: QuestsByCategoriesProps): QuestsByCategoriesVM => ({
  categorizedQuests: categorizeQuests(quests),
  setNoteCompletion,
  setQuestCompletionState,
});
