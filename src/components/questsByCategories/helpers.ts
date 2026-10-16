import type { Quest } from "../quest/domain";
import type { CategorizedQuests } from "./domain";

export const isQuestOrdered = ({
  cutoffs,
  prerequisites,
  type,
  isOrdered,
  disablers,
}: {
  isOrdered: boolean;
  type: Quest["type"];
  cutoffs: unknown[];
  prerequisites: unknown[];
  disablers: unknown[];
}) =>
  isOrdered ||
  type === "main" ||
  cutoffs.length > 0 ||
  prerequisites.length > 0 ||
  disablers.length > 0;

export const categorizeQuests = (processedQuests: Quest[]) =>
  processedQuests?.reduce<CategorizedQuests[]>((output, quest) => {
    const currentCategory = output[output.length - 1];

    const isOrdered = isQuestOrdered(quest);

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
