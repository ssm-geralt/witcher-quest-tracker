import type { ChangeEvent } from "react";
import type { IdNameObject } from "../../shared/domain/IdNameObject";
import type { QuestCompletionState } from "../../shared/domain/questCompletionStateSchema";
import type { QuestLocation } from "../../shared/domain/questLocationSchema";
import type { QuestNote } from "../../shared/domain/questNoteSchema";
import type { QuestType } from "../../shared/domain/questTypeSchema";
import type { QuestPathOption } from "../../shared/domain/questPathOptionSchema";
import type { QuestPath } from "../../shared/domain/questPathSchema";

export type QuestDependencyRuleSet = {
  id: string;
  name: string;
  state: QuestCompletionState;
  paths: { name: string; option: string }[][];
}[][];

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

  // this quest will not be available if any of the given quests is finished before (only success counts)
  disablers: IdNameObject[];
  // the given quests will not be available if this one is finished before (only success counts)
  disablerFor: IdNameObject[];

  // disablers and prerequisites may overlap. disablers handle simpler cases,
  // while prerequisites handle more complex ones.
  //
  // set of rules that make this quest available
  prerequisites: QuestDependencyRuleSet;
  // this quest is part of the rules that makes the given ones available
  prerequisiteFor: IdNameObject[];

  // this quest will fail if any of the given quests are finished before
  cutoffs: IdNameObject[];
  // the given quests will fail if this one is finished before
  cutoffFor: IdNameObject[];

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
