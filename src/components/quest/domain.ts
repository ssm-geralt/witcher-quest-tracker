import type { ChangeEvent } from "react";
import type { IdNameObject } from "../../shared/domain/IdNameObject";
import type { QuestCompletionState } from "../../shared/domain/questCompletionStateSchema";
import type { QuestLocation } from "../../shared/domain/questLocation";
import type { QuestNote } from "../../shared/domain/questNoteSchema";
import type { QuestType } from "../../shared/domain/questTypeSchema";

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
  isOrdered: boolean;
  isAutoSet?: boolean;
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
}

export interface QuestVM {
  quest: Quest;
}
