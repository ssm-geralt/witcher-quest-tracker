import type { ChangeEvent } from "react";
import type { IdNameObject } from "../../shared/domain/IdNameObject";
import type { QuestCompletionState } from "../../shared/domain/questCompletionStateSchema";
import type { QuestLocation } from "../../shared/domain/questLocationSchema";
import type { QuestNote } from "../../shared/domain/questNoteSchema";
import type { QuestType } from "../../shared/domain/questTypeSchema";
import type { QuestPathOption } from "../../shared/domain/questPathOptionSchema";
import type { QuestPath } from "../../shared/domain/questPathSchema";

export type Quest = {
  id: string;
  name: string;
  completionState?: QuestCompletionState;
  type: QuestType;
  level?: number;
  link?: string;
  notes: QuestNote[];
  specialNote?: { text: string };
  location: QuestLocation;
  ignoreLocation: boolean;

  // this quest will fail if any of the given quests are finished before
  cutoffs: IdNameObject[];
  // the given quests will fail if this one is finished before
  cutoffFor: IdNameObject[];

  // complete given quests to make this one available (currently only success counts)
  prerequisites: IdNameObject[];
  // complete this one to make given quests available (currently only success counts)
  prerequisiteFor: IdNameObject[];

  // this quest will not be available if any of the given quests is finished before (currently only success counts)
  disablers: IdNameObject[];
  // the given quests will not be available if this one is finished before (currently only success counts)
  disablerFor: IdNameObject[];

  isOrdered: boolean;
  isAutoSet?: boolean;
  pathOptions: QuestPathOption[];
  selectedPaths: QuestPath[];
};

export interface QuestProps {
  quest: Quest;
  disabled: boolean;
  onCompletionStateClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  onNoteCompletionChange: (
    e: ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => void;
  onPathChange: (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => void;
}

export interface QuestVM {
  quest: Quest;
}
