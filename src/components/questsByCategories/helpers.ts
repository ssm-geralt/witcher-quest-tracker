import type { QuestCompletionState } from "../../shared/domain/questCompletionStateSchema";
import type { Quest } from "../quest/domain";
import type { CategorizedQuests } from "./domain";

export const getIsQuestOrdered = ({
  cutoffs,
  prerequisites,
  type,
  isOrdered,
  disablers,
  cutoffFor,
  disablerFor,
  prerequisiteFor,
}: {
  isOrdered: boolean;
  type: Quest["type"];
  cutoffs: unknown[];
  prerequisites: unknown[];
  disablers: unknown[];
  cutoffFor: unknown[];
  disablerFor: unknown[];
  prerequisiteFor: unknown[];
}) =>
  isOrdered ||
  type === "main" ||
  cutoffs.length > 0 ||
  prerequisites.length > 0 ||
  disablers.length > 0 ||
  cutoffFor.length > 0 ||
  disablerFor.length > 0 ||
  prerequisiteFor.length > 0;

export const categorizeQuests = (processedQuests: Quest[]) =>
  processedQuests?.reduce<CategorizedQuests[]>((output, quest) => {
    const currentCategory = output[output.length - 1];

    const isOrdered = getIsQuestOrdered(quest);

    if (
      currentCategory &&
      (quest.location === currentCategory.location || quest.ignoreLocation)
    ) {
      if (isOrdered) {
        currentCategory.ordered.push(quest);
        return output;
      }

      currentCategory.unordered.push(quest);
      return output;
    }

    output.push({
      location: quest.location,
      ordered: isOrdered ? [quest] : [],
      unordered: isOrdered ? [] : [quest],
    });

    return output;
  }, []);

export const getIsQuestFullyCompleted = ({
  completionState,
  notes,
}: {
  completionState?: QuestCompletionState;
  notes: { isCompleted?: boolean }[];
}) =>
  completionState !== "empty" &&
  completionState !== undefined &&
  notes.every(({ isCompleted }) => isCompleted || isCompleted === undefined);
