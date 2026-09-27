import type { Quest } from "./components/quest/domain";

export interface AppVM {
  quests?: Quest[];
  questMap: Map<string, Quest>;
  error?: string;
  isLoading: boolean;
  setQuestCompletionState: (
    index: number,
    newCompletionState: Quest["completionState"],
  ) => void;
}
