import type { QuestProps, QuestVM } from "./domain";

export const useQuestController = ({
  quest,
  onCompletionStateChange,
}: QuestProps): QuestVM => {
  const handleOnCompletionStateChange = () => {
    switch (quest.completionState) {
      case undefined:
        onCompletionStateChange("success");
        break;
      case "empty":
        onCompletionStateChange("success");
        break;
      case "success":
        onCompletionStateChange("failure");
        break;
      case "failure":
        onCompletionStateChange("empty");
        break;
    }
  };

  return { quest, handleOnCompletionStateChange };
};
