import type { ProcessedQuest } from "../quest/domain";

export interface StatisticsProps {
  quests: ProcessedQuest[];
}

export interface StatisticsVM {
  completed: number;
  failed: number;
  finished: number;
  total: number;
  percentage: number;
}
