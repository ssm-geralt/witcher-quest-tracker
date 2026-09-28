import { useEffect, useState } from "react";
import type { AppVM, Progress } from "./domain";
import { getQuests } from "./data";
import { questArraySchema, type Quest } from "./components/quest/domain";
import {
  convertQuestToProgressItem,
  createQuestListWithProgress,
  isProgressMade,
  loadProgress,
  saveProgress,
} from "./helpers";

export const useAppController = (): AppVM => {
  const [{ isLoading, error, quests }, setQuestsState] = useState<{
    quests?: Quest[];
    isLoading: boolean;
    error?: string;
  }>({ isLoading: false });

  const setQuestCompletionState: AppVM["setQuestCompletionState"] = (
    index,
    completionState,
  ) => {
    setQuestsState((prevQuestsState) => ({
      ...prevQuestsState,
      quests: prevQuestsState.quests?.map((quest, previousIndex) => {
        if (index === previousIndex) {
          return { ...quest, completionState, isAutoSet: false };
        }

        return quest;
      }),
    }));
  };

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        setQuestsState((prev) => ({
          ...prev,
          isLoading: true,
          error: undefined,
        }));

        const quests = await getQuests();

        const { data, error } = questArraySchema.safeParse(quests);

        if (error) {
          setQuestsState((prev) => ({
            ...prev,
            isLoading: false,
            error: error.message,
          }));
          return;
        }

        const progress = loadProgress();

        setQuestsState((prev) => ({
          ...prev,
          quests: progress
            ? createQuestListWithProgress(quests, progress)
            : data,
          isLoading: false,
        }));
      } catch {
        setQuestsState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load quest data.”",
        }));
      }
    };

    fetchQuests();
  }, []);

  useEffect(() => {
    if (!quests) {
      return;
    }

    const progress = quests.reduce<Progress>((progress, q) => {
      if (isProgressMade(q)) {
        progress.push(convertQuestToProgressItem(q));
      }
      return progress;
    }, []);

    saveProgress(progress);
  }, [quests]);

  return {
    quests,
    isLoading,
    error,
    setQuestCompletionState,
  };
};
