import { useAppController } from "./useAppController";
import { MainHeader } from "./components/mainHeader";
import { LoadingIndicator } from "./components/loadingIndicator";
import { Quest } from "./components/quest/quest";

export function App() {
  const { isLoading, error, quests, setQuestCompletionState } =
    useAppController();

  return (
    <div className="bg-black text-white min-h-dvh flex flex-col">
      <LoadingIndicator isLoading={isLoading} />

      <MainHeader />

      <main className="grow px-4">
        {error ? <p className="text-red-500">{error}</p> : null}

        {quests ? (
          <ul className="flex flex-col gap-4">
            {quests?.map((quest, index) => (
              <li key={quest.name + index}>
                <Quest
                  quest={quest}
                  onCompletionStateChange={(newState) =>
                    setQuestCompletionState(index, newState)
                  }
                />
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </div>
  );
}
