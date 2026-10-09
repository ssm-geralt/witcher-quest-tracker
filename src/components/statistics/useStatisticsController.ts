import type { StatisticsProps, StatisticsVM } from "./domain";

export const useStatisticsController = ({
  quests,
}: StatisticsProps): StatisticsVM => {
  const { completed, failed } = quests.reduce(
    (stats, { completionState }) => {
      if (completionState === "success") {
        stats.completed++;
      }

      if (completionState === "failure") {
        stats.failed++;
      }
      return stats;
    },
    {
      completed: 0,
      failed: 0,
    },
  );

  const finished = completed + failed;

  const percentage =
    quests.length > 0 ? ((completed + failed) / quests.length) * 100 : 100;

  const total = quests.length;

  return {
    completed,
    failed,
    finished,
    percentage,
    total,
  };
};
