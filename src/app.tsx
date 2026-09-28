import { useAppController } from "./useAppController";
import { MainHeader } from "./components/mainHeader";
import { LoadingIndicator } from "./components/loadingIndicator";
import { Quest } from "./components/quest/quest";
import { Controls } from "./components/controls";
import { ConfirmationDialog } from "./components/confirmationDialog";
import { Statistics } from "./components/statistics";

export function App() {
  const {
    isLoading,
    error,
    quests,
    setQuestCompletionState,
    controls,
    confirmationDialogProps,
  } = useAppController();

  return (
    <div className="bg-black text-white min-h-dvh flex flex-col">
      <LoadingIndicator isLoading={isLoading} />
      <MainHeader />
      <main className="grow px-4">
        <section className="my-4">
          <header>
            <h2 className="text-center">Controls</h2>
          </header>
          <Controls {...controls} />
        </section>

        {quests ? (
          <section className="my-4">
            <header>
              <h2 className="text-center">Statistics</h2>
            </header>
            <Statistics quests={quests} />
          </section>
        ) : null}

        <section>
          <header>
            <h2 className="text-center">Quests</h2>
          </header>

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
        </section>
      </main>

      <ConfirmationDialog
        {...confirmationDialogProps}
        className="[&_button]:min-w-20"
      />
    </div>
  );
}
