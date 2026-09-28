import type { StatisticsProps } from "./domain";
import { useStatisticsController } from "./useStatisticsController";

export function Statistics(props: StatisticsProps) {
  const { completed, failed, finished, percentage, total } =
    useStatisticsController(props);
  return (
    <div>
      <dl>
        <div>
          <dt>Completed</dt>
          <dd>
            {completed} / {total}
          </dd>
        </div>

        <div>
          <dt>Failed</dt>
          <dd>
            {failed} / {total}
          </dd>
        </div>
      </dl>

      <div>
        <p>Overall completion</p>
        <div>
          {finished}/{total} ({percentage}%)
        </div>

        <progress value={percentage} max="100">
          {percentage}%
        </progress>
      </div>
    </div>
  );
}
