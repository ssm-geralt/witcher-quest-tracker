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
  const [{ isLoading, error, quests, rawQuests }, setQuestsState] = useState<{
    quests?: Quest[];
    rawQuests?: Quest[];
    isLoading: boolean;
    error?: string;
  }>({ isLoading: false });
  const [confirmationDialogProps, setConfirmationDialogProps] = useState<
    AppVM["confirmationDialogProps"]
  >({ isOpen: false });

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

  const controls: AppVM["controls"] = {
    reset: {
      onClick() {
        setConfirmationDialogProps({
          isOpen: true,
          onAnimationEnd: ({ animationName }) => {
            if (animationName === "modal-out") {
              setConfirmationDialogProps({ isOpen: false });
            }
          },
          data: {
            title: "Are you sure you want to reset your progress?",
            okButton: {
              text: "Yes",
              onClick: () => {
                setQuestsState((prev) =>
                  prev.rawQuests ? { ...prev, quests: rawQuests } : prev,
                );
                setConfirmationDialogProps((prev) => ({
                  ...prev,
                  isOpen: false,
                }));
              },
            },
            cancelButton: {
              text: "Cancel",
              onClick: () =>
                setConfirmationDialogProps((prev) => ({
                  ...prev,
                  isOpen: false,
                })),
            },
          },
        });
      },
      disabled: isLoading || !rawQuests,
    },
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
          rawQuests: data,
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
    controls,
    isLoading,
    error,
    setQuestCompletionState,
    confirmationDialogProps,
  };
};
