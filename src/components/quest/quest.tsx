import type { Quest, QuestProps } from "./domain";
import { CheckmarkIcon } from "../icons/checkmarkIcon";
import { CrossIcon } from "../icons/crossIcon";
import clsx from "clsx";
import { getLocationName, getQuestTypeName } from "./helper";
import { Checkbox } from "../checkbox";
import { Select } from "../select";

export function Quest({
  quest: {
    id,
    name,
    completionState,
    link,
    location,
    type,
    level,
    notes,
    pathOptions,
    selectedPaths,

    cutoffs,
    prerequisites,
    disablers,

    cutoffFor,
    disablerFor,
    prerequisiteFor,
  },
  onCompletionStateClick,
  onNoteCompletionChange,
  onPathChange,
  disabled,
}: QuestProps) {
  return (
    <article
      data-disabled={disabled}
      className="border rounded p-2 flex flex-col gap-2 data-[disabled=true]:opacity-50"
      id={`quest-${id}`}
    >
      <div className="flex py-2 gap-4 items-center border-b border-white/30">
        <header className="order-2">
          <h3>
            <a
              href={link}
              target="_blank"
              className="[[href]]:underline [[href]]:text-primary"
            >
              {name} {level ? `(${level})` : null}
            </a>
          </h3>
        </header>

        <div className="order-1">
          <button
            onClick={onCompletionStateClick}
            data-id={id}
            data-state={completionState ?? "empty"}
            disabled={disabled}
            className={clsx(
              "inline-block border w-6 h-6 p-1 rounded cursor-pointer",
              "data-[state=success]:bg-green-300 data-[state=success]:text-green-800",
              "data-[state=failure]:bg-red-300 data-[state=failure]:text-red-800",
              "disabled:invisible",
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
            {prerequisites.length > 0 ? (
              <div className="flex flex-col gap-1 text-blue-500">
                <dt>prerequisites:</dt>
                <dd className="flex pl-5 flex-col gap-1">
                  {prerequisites.map((quests) =>
                    quests.map(({ id, name, state, paths }) => (
                      <a key={id} href={`#quest-${id}`}>
                        - {name}
                        {state !== "success" ? ` with ${state} state` : ""}
                        {paths.length > 0
                          ? ` with chosen paths: ${paths
                              .map((ors) =>
                                ors.map(({ option }) => option).join(" AND "),
                              )
                              .join(" OR ")}`
                          : ""}
                      </a>
                    )),
                  )}
                </dd>
              </div>
            ) : null}

            {disablers.length > 0 ? (
              <div className="flex gap-1 text-blue-500">
                <dt>disablers:</dt>
                <dd>
                  {disablers.map((d, i) => (
                    <a key={d.id} href={`#quest-${d.id}`}>
                      {d.name}
                      {i === disablers.length - 1 ? "" : ", "}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}

            {cutoffs.length > 0 ? (
              <div className="flex gap-1 text-blue-500">
                <dt>finish before:</dt>
                <dd>
                  {cutoffs.map((c, i) => (
                    <a key={c.id} href={`#quest-${c.id}`}>
                      {c.name}
                      {i === cutoffs.length - 1 ? "" : ", "}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}

            {prerequisiteFor.length > 0 ? (
              <div className="flex gap-1 text-red-500">
                <dt>prerequisite for:</dt>
                <dd>
                  {prerequisiteFor.map((p, i) => (
                    <a key={p.id} href={`#quest-${p.id}`}>
                      {p.name}
                      {i === prerequisiteFor.length - 1 ? "" : ", "}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}

            {disablerFor.length > 0 ? (
              <div className="flex gap-1 text-red-500">
                <dt>disabler for:</dt>
                <dd>
                  {disablerFor.map((d, i) => (
                    <a key={d.id} href={`#quest-${d.id}`}>
                      {d.name}
                      {i === disablerFor.length - 1 ? "" : ", "}
                    </a>
                  ))}
                </dd>
              </div>
            ) : null}

            {cutoffFor.length > 0 ? (
              <div className="flex gap-1 text-red-500">
                <dt>finish after:</dt>
                <dd>
                  {cutoffFor.map((c, i) => (
                    <a key={c.id} href={`#quest-${c.id}`}>
                      {c.name}
                      {i === cutoffFor.length - 1 ? "" : ", "}
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

        {pathOptions.length > 0 ? (
          <div className="order-4 ml-auto">
            {pathOptions.map(({ name, options }, index) => {
              const optionId = `option-${id}-${index}`;
              const selectedPath = selectedPaths.find((sp) => sp.name === name);
              return (
                <div key={name} className="w-45 max-w-full">
                  <label htmlFor={optionId} className="block text-sm">
                    {name}
                  </label>
                  <Select
                    id={optionId}
                    data-id={id}
                    data-path={name}
                    value={selectedPath?.optionName ?? "empty"}
                    onChange={onPathChange}
                    title={selectedPath?.optionName}
                  >
                    <option value="empty">Not selected</option>
                    {options.map(({ name: optionName }) => (
                      <option key={`${name}-${optionName}`} value={optionName}>
                        {optionName}
                      </option>
                    ))}
                  </Select>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      {notes && notes.length > 0 ? (
        <div>
          <ul className="text-sm flex flex-col gap-2 ">
            {notes.map((note, index) => (
              <li
                className="flex items-center gap-2 border-b py-1 border-white/30"
                key={index}
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
                    data-id={id}
                    value={index}
                    checked={!!note.isCompleted}
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
