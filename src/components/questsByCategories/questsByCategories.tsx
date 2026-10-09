import { getLocationName } from "../quest/helper";
import { Quest } from "../quest/quest";
import type { QuestsByCategoriesProps } from "./domain";
import { useQuestsByCategoriesController } from "./useQuestsByCategoriesController";

export function QuestsByCategories(props: QuestsByCategoriesProps) {
  const { categorizedQuests, onCompletionStateClick, onNoteCompletionChange } =
    useQuestsByCategoriesController(props);

  return (
    <div className="flex flex-col gap-4">
      {categorizedQuests?.map(({ location, ordered, unordered }, index) => {
        return (
          <section key={`${location}${index}`} className="flex flex-col gap-4">
            <header>
              <h3 className="text-center">{getLocationName(location)}</h3>
            </header>

            <div className="flex gap-2">
              {ordered.length > 0 && (
                <ul className="flex flex-col gap-4 w-1/2">
                  {ordered.map((quest) => (
                    <li key={quest.id}>
                      <Quest
                        quest={quest}
                        disabled={false}
                        onCompletionStateClick={onCompletionStateClick}
                        onNoteCompletionChange={onNoteCompletionChange}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {unordered.length > 0 && (
                <ul className="flex flex-col gap-4 w-1/2">
                  {unordered.map((quest) => (
                    <li key={quest.id}>
                      <Quest
                        quest={quest}
                        disabled={false}
                        onCompletionStateClick={onCompletionStateClick}
                        onNoteCompletionChange={onNoteCompletionChange}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}
    </div>
  );
}
