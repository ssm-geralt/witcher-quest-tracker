import { useEffect, useState } from "react";
import { questArraySchema, type AppVM, type Quest } from "./domain";
import { getQuests } from "./data";

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

  return {
    quests,
    isLoading,
    error,
  };
};
