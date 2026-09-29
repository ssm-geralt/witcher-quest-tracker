import type { ProcessedQuest, Quest } from "./components/quest/domain";
import { PROGRESS_LS_KEY } from "./constants";
import lzString from "lz-string";
import { progressSchema, type Progress, type ProgressItem } from "./domain";

export const convertQuestToProgressItem = ({
  id,
  completionState,
  isAutoSet,
  notes,
}: Pick<
  Quest,
  "id" | "completionState" | "isAutoSet" | "notes"
>): ProgressItem => ({
  id,
  completionState,
  isAutoSet,
  notes: notes?.reduce<string[]>((ids, { id, isCompleted }) => {
    if (isCompleted) {
      ids.push(id);
    }
    return ids;
  }, []),
});

export const createQuestWithProgress = (
  quest: Quest,
  { completionState, isAutoSet, notes }: Omit<ProgressItem, "id">,
): Quest => ({
  ...quest,
  completionState,
  isAutoSet,
  notes: quest.notes?.map((n) => ({
    ...n,
    isCompleted: notes?.includes(n.id) ? true : n.isCompleted,
  })),
});

export const createQuestListWithProgress = (
  quests: Quest[],
  progress: Progress,
) =>
  quests.map((quest) => {
    const progressItem = progress.find((p) => p.id === quest.id);
    if (progressItem) {
      return createQuestWithProgress(quest, progressItem);
    }

    return quest;
  });

export const loadProgress = () => {
  const lsItem = localStorage.getItem(PROGRESS_LS_KEY);
  if (!lsItem) {
    return;
  }

  const decompressed = lzString.decompress(lsItem);

  try {
    const jsonParsed = JSON.parse(decompressed);
    return progressSchema.parse(jsonParsed);
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const isProgressMade = ({
  completionState,
  notes,
}: Pick<Quest, "completionState" | "notes">) => {
  if (completionState !== undefined) {
    return true;
  }

  return !!notes?.some((n) => n.isCompleted);
};

export const saveProgress = (progress: Progress) => {
  const stringified = JSON.stringify(progress);
  localStorage.setItem(PROGRESS_LS_KEY, lzString.compress(stringified));
};

export const saveSingleProgressItem = (item: ProgressItem) => {
  const savedProgress: Progress = loadProgress() ?? [];

  const existingProgressIndex = savedProgress.findIndex(
    (p) => p.id === item.id,
  );

  if (existingProgressIndex === -1) {
    savedProgress.push(item);
  } else {
    savedProgress[existingProgressIndex] = item;
  }

  saveProgress(savedProgress);
};

export const processQuests = (quests: Quest[]) => {
  const output = quests?.reduce<{
    result: ProcessedQuest[];
    helper: Record<string, number[] | undefined>;
  }>(
    (output, q, index) => {
      output.helper[q.id]?.forEach((qIndex) => {
        const dependentItem = output.result[qIndex];

        if (dependentItem) {
          dependentItem.finishBefore.push({ id: q.id, name: q.name });
        }
      });
      output.helper[q.id] = undefined;

      q.finishBefore?.forEach((beforeId) => {
        if (output.helper[beforeId]) {
          output.helper[beforeId].push(index);
          return;
        }

        output.helper[beforeId] = [index];
      });

      output.result.push({ ...q, finishBefore: [] });

      return output;
    },
    { result: [], helper: {} },
  );

  const leftovers = Object.keys(output.helper).reduce<string[]>((acc, key) => {
    const value = output.helper[key];

    if (value && value.length > 0) {
      acc.push(key);
    }

    return acc;
  }, []);

  if (leftovers.length > 0) {
    console.log("unmatched 'finishBefore' items", leftovers);
  }

  return output.result;
};
