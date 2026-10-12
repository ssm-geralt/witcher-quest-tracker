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
  finishBefore: IdNameObject[];
  prerequisites: IdNameObject[];
  disablers: IdNameObject[];
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
