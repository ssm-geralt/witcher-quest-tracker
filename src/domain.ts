import type { Quest } from "./components/quest/domain";

export interface AppVM {
  quests?: Quest[];
  error?: string;
  isLoading: boolean;
  setQuestCompletionState: (
    index: number,
    newCompletionState: Quest["completionState"],
  ) => void;
}
