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

export const covertNameToIdNameObject = (
  name: string,
  logReason?: string,
): IdNameObject => {
  const id = questIds[name] ?? name;

  if (!questIds[name]) {
    console.warn(`${logReason}: id was not found for ${name}`);
  }

  return { id, name };
};

export const processQuests = (questDataArray: QuestData[]): Quest[] => {
  const output: Quest[] = [];

  const helper: {
    prerequisitesFor: Record<string, IdNameObject[] | undefined>;
    cutoffsFor: Record<string, IdNameObject[] | undefined>;
    disablersFor: Record<string, IdNameObject[] | undefined>;
  } = {
    prerequisitesFor: {},
    cutoffsFor: {},
    disablersFor: {},
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
      cutoffs,
      prerequisites,
      disablers,
      isOrdered,
      pathOptions,
    }) => {
      const id = questIds[name] ?? name;

      if (!questIds[name]) {
        console.warn(`Id was not found for ${name}`);
      }

      const currentIdNameObject = { id, name };

      const processedPrerequisites: IdNameObject[] =
        prerequisites?.map((p) => {
          const processedPrerequisite = covertNameToIdNameObject(
            p,
            "Prerequisites",
          );

          const existingPrerequisiteFor =
            helper.prerequisitesFor[processedPrerequisite.id];

          if (existingPrerequisiteFor) {
            existingPrerequisiteFor.push(currentIdNameObject);
          } else {
            helper.prerequisitesFor[processedPrerequisite.id] = [
              currentIdNameObject,
            ];
          }

          return processedPrerequisite;
        }) ?? [];

      const precessedCutoffs: IdNameObject[] =
        cutoffs?.map((c) => {
          const processedCutoff = covertNameToIdNameObject(c, "Cutoffs");

          const existingCutoffFor = helper.cutoffsFor[processedCutoff.id];

          if (existingCutoffFor) {
            existingCutoffFor.push(currentIdNameObject);
          } else {
            helper.cutoffsFor[processedCutoff.id] = [currentIdNameObject];
          }

          return processedCutoff;
        }) ?? [];

      const precessedDisablers: IdNameObject[] =
        disablers?.map((d) => {
          const processedDisabler = covertNameToIdNameObject(d, "Disablers");

          const existingDisablerFor = helper.disablersFor[processedDisabler.id];

          if (existingDisablerFor) {
            existingDisablerFor.push(currentIdNameObject);
          } else {
            helper.disablersFor[processedDisabler.id] = [currentIdNameObject];
          }

          return processedDisabler;
        }) ?? [];

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
        isOrdered: !!isOrdered,

        pathOptions: pathOptions ?? [],
        selectedPaths: [],

        cutoffs: precessedCutoffs,
        prerequisites: processedPrerequisites,
        disablers: precessedDisablers,

        cutoffFor: [],
        prerequisiteFor: [],
        disablerFor: [],
      });
    },
  );

  output.map((quest) => {
    quest.cutoffFor = helper.cutoffsFor[quest.id] ?? [];
    quest.prerequisiteFor = helper.prerequisitesFor[quest.id] ?? [];
    quest.disablerFor = helper.disablersFor[quest.id] ?? [];
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
  {
    completionState,
    isAutoSet,
    notes,
    selectedPaths,
  }: Omit<ProgressItem, "id">,
): Quest => ({
  ...quest,
  completionState,
  isAutoSet,
  notes: quest.notes?.map((n, index) => ({
    ...n,
    isCompleted: notes?.includes(index) ? true : n.isCompleted,
  })),
  selectedPaths: selectedPaths ?? [],
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
  selectedPaths,
}: Pick<Quest, "completionState" | "notes" | "selectedPaths">) => {
  if (completionState !== undefined) {
    return true;
  }

  if (selectedPaths.length > 0) {
    return true;
  }

  return !!notes?.some((n) => n.isCompleted);
};

export const convertQuestToProgressItem = ({
  id,
  completionState,
  isAutoSet,
  notes,
  selectedPaths,
}: Pick<
  Quest,
  "id" | "completionState" | "isAutoSet" | "notes" | "selectedPaths"
>): ProgressItem => {
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
    selectedPaths: selectedPaths.length > 0 ? selectedPaths : undefined,
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

export const getDisabledQuests = (
  quests: Pick<Quest, "completionState" | "disablerFor" | "prerequisiteFor">[],
) => {
  const output = new Set<string>();

  quests.forEach(({ completionState, disablerFor, prerequisiteFor }) => {
    // disablers
    if (completionState === "success") {
      if (disablerFor.length === 0) {
        return;
      }

      disablerFor.forEach((d) => output.add(d.id));
      return;
    }

    // prerequisites

    if (prerequisiteFor.length === 0) {
      return;
    }

    prerequisiteFor.forEach((p) => output.add(p.id));
  });

  return output;
};
