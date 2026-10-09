import { useEffect, useState } from "react";
import {
  questDataArraySchema,
  type AppControllerQuestsState,
  type AppVM,
  type Progress,
} from "./domain";
import { getQuests } from "./data";
import {
  convertQuestToProgressItem,
  createQuestListWithProgress,
  getIsProgressMade,
  getNextCompletionState,
  loadProgress,
  processQuests,
  saveProgress,
} from "./helpers";

export const useAppController = (): AppVM => {
  const [{ isLoading, error, quests, rawQuests }, setQuestsState] =
    useState<AppControllerQuestsState>({ isLoading: false });

  const [confirmationDialog, setConfirmationDialog] = useState<
    AppVM["confirmationDialog"]
  >({ isOpen: false });

  const onCompletionStateClick: AppVM["onCompletionStateClick"] = (e) => {
    const target = e.currentTarget;
    const previousState = target.dataset.state;
    const id = target.dataset.id;

    if (!previousState || !id) {
      return;
    }

    const newState = getNextCompletionState(previousState);

    setQuestsState((prevQuestsState) => ({
      ...prevQuestsState,
      quests: prevQuestsState.quests?.map((quest) => {
        if (id === quest.id) {
          return { ...quest, completionState: newState, isAutoSet: false };
        }

        return quest;
      }),
    }));
  };

  const onNoteCompletionChange: AppVM["onNoteCompletionChange"] = (e) => {
    const target = e.target;
    const questId = target.dataset.id;
    const noteIndex = target.value;
    const isCompleted = target.checked;

    if (!questId || !noteIndex) {
      return;
    }

    setQuestsState((prevQuestsState) => ({
      ...prevQuestsState,
      quests: prevQuestsState.quests?.map((quest) => {
        if (questId === quest.id) {
          return {
            ...quest,
            notes: quest.notes?.map((note, index) => {
              if (+noteIndex === index) {
                return { ...note, isCompleted };
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
        setConfirmationDialog({
          isOpen: true,
          onAnimationEnd: ({ animationName }) => {
            if (animationName === "modal-out") {
              setConfirmationDialog({ isOpen: false });
            }
          },
          data: {
            title: "Are you sure you want to reset your progress?",
            okButton: {
              text: "Yes",
              onClick: () => {
                setQuestsState((prev) =>
                  prev.rawQuests ? { ...prev, quests: prev.rawQuests } : prev,
                );
                setConfirmationDialog((prev) => ({
                  ...prev,
                  isOpen: false,
                }));
              },
            },
            cancelButton: {
              text: "Cancel",
              onClick: () =>
                setConfirmationDialog(() => ({
                  isOpen: false,
                })),
            },
          },
        });
      },
      disabled: isLoading || !rawQuests || rawQuests === quests,
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
        const { data, error } = questDataArraySchema.safeParse(quests);

        if (error) {
          console.error(error.message);
          setQuestsState((prev) => ({
            ...prev,
            isLoading: false,
            error: "Invalid quest data. Check your console for details.",
          }));
          return;
        }

        const progress = loadProgress();
        const processedQuests = processQuests(data);
        const questWithProgress =
          progress && progress.length > 0
            ? createQuestListWithProgress(processedQuests, progress)
            : processedQuests;

        setQuestsState((prev) => ({
          ...prev,
          quests: questWithProgress,
          rawQuests: processedQuests,
          isLoading: false,
        }));
      } catch {
        setQuestsState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Failed to load quest data.",
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
      const isProgressMade = getIsProgressMade(q);

      if (!isProgressMade) {
        return progress;
      }

      const progressItem = convertQuestToProgressItem(q);

      if (progressItem) {
        progress.push(progressItem);
      }
      return progress;
    }, []);

    saveProgress(progress);
  }, [quests]);

  return {
    isLoading,
    error,
    quests,
    onCompletionStateClick,
    onNoteCompletionChange,
    controls,
    confirmationDialog,
  };
};
