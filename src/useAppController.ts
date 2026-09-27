import { useEffect, useState } from "react";
import type { AppVM } from "./domain";
import { getQuests } from "./data";
import { questArraySchema, type Quest } from "./components/quest/domain";

export const useAppController = (): AppVM => {
  const [{ isLoading, error, quests }, setQuestsState] = useState<{
    quests?: Quest[];
    isLoading: boolean;
    error?: string;
  }>({ isLoading: false });

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

        setQuestsState((prev) => ({ ...prev, quests: data, isLoading: false }));
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

  const questMap = new Map(quests?.map((quest) => [quest.id, quest]));

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

  return {
    quests,
    questMap,
    isLoading,
    error,
    setQuestCompletionState,
  };
};
