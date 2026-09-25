import type { Quest, QuestProps } from "./domain";
import { CheckmarkIcon } from "../icons/checkmarkIcon";
import { CrossIcon } from "../icons/crossIcon";
import clsx from "clsx";
import { useQuestController } from "./useQuestController";

export function Quest(props: QuestProps) {
  const {
    quest: { name, completionState },
    handleOnCompletionStateChange,
  } = useQuestController(props);

  return (
    <article className="border rounded p-2 flex gap-2">
      <header className="order-2">
        <h3>{name}</h3>
      </header>

      <div className="order-1">
        <button
          onClick={handleOnCompletionStateChange}
          data-state={completionState ?? "empty"}
          className={clsx(
            "inline-block border w-6 h-6 p-1 rounded cursor-pointer",
            "data-[state=success]:bg-green-300 data-[state=success]:text-green-800",
            "data-[state=failure]:bg-red-300 data-[state=failure]:text-red-800",
          )}
        >
          {completionState === "failure" ? (
            <CrossIcon className="w-full h-full" />
          ) : completionState === "success" ? (
            <CheckmarkIcon className="w-full h-full" />
          ) : null}
        </button>
      </div>
    </article>
  );
}
