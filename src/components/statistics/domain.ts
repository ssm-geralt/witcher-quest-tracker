import type { Quest } from "../quest/domain";

export interface StatisticsProps {
  quests: Quest[];
}

export interface StatisticsVM {
  completed: number;
  failed: number;
  finished: number;
  total: number;
  percentage: number;
}
