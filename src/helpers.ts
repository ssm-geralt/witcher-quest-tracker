import type { Quest } from "./components/quest/domain";
import { PROGRESS_LS_KEY, questIds } from "./constants";
import {
  progressSchema,
  type Progress,
  type ProgressItem,
  type QuestData,
} from "./domain";
import lzString from "lz-string";
import type { IdNameObject } from "./shared/domain/IdNameObject";
import type { QuestCompletionState } from "./shared/domain/questCompletionStateSchema";

export const processQuests = (questDataArray: QuestData[]): Quest[] => {
  const output: Quest[] = [];

  const helper: {
    prerequisitesFor: Record<string, IdNameObject[] | undefined>;
    cutoffFor: Record<string, IdNameObject[] | undefined>;
  } = {
    prerequisitesFor: {},
    cutoffFor: {},
  };

  questDataArray.forEach(
    ({
      name,
      location,
      type,
      ignoreLocation,
      level,
      link,
      specialNote,
      notes,
      prerequisiteFor,
      cutoffFor,
      isOrdered,
    }) => {
      const id = questIds[name] ?? name;

      if (!questIds[name]) {
        console.warn(`Id was not found for ${name}`);
      }

      const currentIdNameObject = { id, name };

      prerequisiteFor?.forEach((pName) => {
        const pId = questIds[pName] ?? pName;

        if (!questIds[pName]) {
          console.warn(`Prerequisite id was not found for ${pId}`);
        }

        const existingPrerequisiteFor = helper.prerequisitesFor[pId];

        if (existingPrerequisiteFor) {
          existingPrerequisiteFor.push(currentIdNameObject);
        } else {
          helper.prerequisitesFor[pId] = [currentIdNameObject];
        }
      });

      cutoffFor?.forEach((pName) => {
        const cId = questIds[pName] ?? pName;

        if (!questIds[pName]) {
          console.warn(`Cutoff id was not found for ${cId}`);
        }

        const existingCutoffFor = helper.cutoffFor[cId];

        if (existingCutoffFor) {
          existingCutoffFor.push(currentIdNameObject);
        } else {
          helper.cutoffFor[cId] = [currentIdNameObject];
        }
      });

      output.push({
        id,
        name,
        type,
        location,
        ignoreLocation: !!ignoreLocation,
        level,
        link,
        specialNote,
        notes: notes ?? [],
        finishBefore: [],
        prerequisites: [],
        isOrdered: !!isOrdered,
      });
    },
  );

  output.map((quest) => {
    quest.finishBefore = helper.cutoffFor[quest.id] ?? [];
    quest.prerequisites = helper.prerequisitesFor[quest.id] ?? [];
  });

  return output;
};

export const loadProgress = (): Progress | undefined => {
  const lsItem = localStorage.getItem(PROGRESS_LS_KEY);
  if (!lsItem) {
    return;
  }

  const decompressed = lzString.decompress(lsItem);

  try {
    const jsonParsed = JSON.parse(decompressed);
    return progressSchema.parse(jsonParsed);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const createQuestWithProgress = (
  quest: Quest,
  { completionState, isAutoSet, notes }: Omit<ProgressItem, "id">,
): Quest => ({
  ...quest,
  completionState,
  isAutoSet,
  notes: quest.notes?.map((n, index) => ({
    ...n,
    isCompleted: notes?.includes(index) ? true : n.isCompleted,
  })),
});

export const createQuestListWithProgress = (
  quests: Quest[],
  progress: Progress,
): Quest[] =>
  quests.map((quest) => {
    const progressItem = progress.find((p) => p.id === quest.id);
    if (progressItem) {
      return createQuestWithProgress(quest, progressItem);
    }

    return quest;
  });

export const getIsProgressMade = ({
  completionState,
  notes,
}: Pick<Quest, "completionState" | "notes">) => {
  if (completionState !== undefined) {
    return true;
  }

  return !!notes?.some((n) => n.isCompleted);
};

export const convertQuestToProgressItem = ({
  id,
  completionState,
  isAutoSet,
  notes,
}: Pick<Quest, "id" | "completionState" | "isAutoSet" | "notes">):
  | ProgressItem
  | undefined => {
  if (!completionState) {
    return undefined;
  }

  return {
    id,
    completionState,
    isAutoSet,
    notes: notes?.reduce<number[]>((indexes, { isCompleted }, index) => {
      if (isCompleted) {
        indexes.push(index);
      }
      return indexes;
    }, []),
  };
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

export const getNextCompletionState = (
  state?: string,
): QuestCompletionState => {
  switch (state) {
    case undefined:
      return "success";
    case "empty":
      return "success";
    case "success":
      return "failure";
    case "failure":
      return "empty";
    default:
      return "empty";
  }
};

export const getDisabledQuests = (quests: Quest[]) => {
  const output = new Set<string>();

  const pairs = quests.reduce<Record<string, string[] | undefined>>(
    (pairs, { id, prerequisites }) => {
      prerequisites.forEach((prerequisite) => {
        const currentPair = pairs[prerequisite.id];

        if (currentPair) {
          currentPair.push(id);
          return pairs;
        }

        pairs[prerequisite.id] = [id];
      });

      return pairs;
    },
    {},
  );

  quests.forEach(({ id, completionState }) => {
    if (completionState === "success") {
      return;
    }

    const dependents = pairs[id];
    if (!dependents) {
      return;
    }

    dependents.forEach((d) => output.add(d));
  });

  return output;
};
