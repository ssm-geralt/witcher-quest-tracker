import { useEffect, useState } from "react";
import type { AppVM, Progress } from "./domain";
import { getQuests } from "./data";
import {
  questArraySchema,
  type ProcessedQuest,
  type Quest,
} from "./components/quest/domain";
import {
  convertQuestToProgressItem,
  createQuestListWithProgress,
  isProgressMade,
  loadProgress,
  processQuests,
  saveProgress,
} from "./helpers";

export const useAppController = (): AppVM => {
  const [{ isLoading, error, processedQuests, rawQuests }, setQuestsState] =
    useState<{
      processedQuests?: ProcessedQuest[];
      rawQuests?: Quest[];
      isLoading: boolean;
      error?: string;
    }>({ isLoading: false });
  const [confirmationDialogProps, setConfirmationDialogProps] = useState<
    AppVM["confirmationDialogProps"]
  >({ isOpen: false });

  const setQuestCompletionState: AppVM["setQuestCompletionState"] = (
    id,
    completionState,
  ) => {
    setQuestsState((prevQuestsState) => ({
      ...prevQuestsState,
      processedQuests: prevQuestsState.processedQuests?.map((quest) => {
        if (id === quest.id) {
          return { ...quest, completionState, isAutoSet: false };
        }

        return quest;
      }),
    }));
  };

  const setNoteCompletion: AppVM["setNoteCompletion"] = (id, event) => {
    setQuestsState((prevQuestsState) => ({
      ...prevQuestsState,
      processedQuests: prevQuestsState.processedQuests?.map((quest) => {
        if (id === quest.id) {
          return {
            ...quest,
            notes: quest.notes?.map((note) => {
              const noteId = event.target.value;
              if (noteId === note.id) {
                return { ...note, isCompleted: event.target.checked };
              }
              return note;
            }),
          };
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
        const questWithProgress = progress
          ? createQuestListWithProgress(quests, progress)
          : data;
        const processedQuests = processQuests(questWithProgress);

        setQuestsState((prev) => ({
          ...prev,
          processedQuests,
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
    if (!processedQuests) {
      return;
    }

    const progress = processedQuests.reduce<Progress>((progress, q) => {
      if (isProgressMade(q)) {
        progress.push(convertQuestToProgressItem(q));
      }
      return progress;
    }, []);

    saveProgress(progress);
  }, [processedQuests]);

  return {
    processedQuests,
    controls,
    isLoading,
    error,
    setQuestCompletionState,
    setNoteCompletion,
    confirmationDialogProps,
  };
};
