import type { Quest, QuestProps } from "./domain";
import { CheckmarkIcon } from "../icons/checkmarkIcon";
import { CrossIcon } from "../icons/crossIcon";
import clsx from "clsx";
import { useQuestController } from "./useQuestController";
import { getLocationName, getQuestTypeName } from "./helper";
import { Checkbox } from "../checkbox";

export function Quest(props: QuestProps) {
  const {
    quest: {
      id,
      name,
      completionState,
      link,
      location,
      type,
      level,
      finishBefore,
      notes,
    },
    handleOnCompletionStateChange,
    onNoteCompletionChange,
  } = useQuestController(props);

  return (
    <article
      className="border rounded p-2 flex flex-col gap-2"
      id={`quest-${id}`}
    >
      <div className="flex py-2 gap-4 items-center border-b border-white/30">
        <header className="order-2">
          <h3>
            <a href={link} target="_blank" className="underline text-primary">
              {name} {level ? `(${level})` : null}
            </a>
          </h3>
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

        <div className="order-3 text-sm">
          <dl>
            {finishBefore && finishBefore.length > 0 ? (
              <div className="flex gap-1">
                <dt>finish before:</dt>
                <dd>
                  {finishBefore.map((fb) => (
                    <a key={fb.id} href={`#quest-${fb.id}`}>
                      {fb.name}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}

            <div className="flex gap-2">
              <dt>quest type:</dt>
              <dd>{getQuestTypeName(type)}</dd>
            </div>

            <div className="flex gap-1">
              <dt>location:</dt>
              <dd>{getLocationName(location)}</dd>
            </div>
          </dl>
        </div>
      </div>

      {notes && notes.length > 0 ? (
        <div>
          <ul className="text-sm flex flex-col gap-2 ">
            {notes.map((note) => (
              <li
                className="flex items-center gap-2 border-b py-1 border-white/30"
                key={note.id}
              >
                {note.link ? (
                  <a
                    href={note.link}
                    target="_blank"
                    className="inline-block underline grow text-primary"
                  >
                    {note.text}
                  </a>
                ) : (
                  <span className="grow">{note.text}</span>
                )}

                {note.isCompleted !== undefined ? (
                  <Checkbox
                    variant="success"
                    checked={note.isCompleted}
                    value={note.id}
                    onChange={onNoteCompletionChange}
                  />
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  );
}
