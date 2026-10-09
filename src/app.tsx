import { useAppController } from "./useAppController";
import { LoadingIndicator } from "./components/loadingIndicator";
import { MainHeader } from "./components/mainHeader";
import { QuestsByCategories } from "./components/questsByCategories";
import { Controls } from "./components/controls";
import { ConfirmationDialog } from "./components/confirmationDialog";
import { Statistics } from "./components/statistics";

export function App() {
  const {
    isLoading,
    error,
    quests,
    onNoteCompletionChange,
    onCompletionStateClick,
    controls,
    confirmationDialog,
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

          <Controls reset={controls.reset} />
        </section>

        {quests ? (
          <section className="my-4">
            <header>
              <h2 className="text-center">Statistics</h2>
            </header>
            <Statistics quests={quests} />
          </section>
        ) : null}

        <section className="flex flex-col gap-4">
          <header>
            <h2 className="text-center">Quests</h2>
          </header>

          {error ? <p className="text-red-500 text-center">{error}</p> : null}

          {quests ? (
            <QuestsByCategories
              quests={quests}
              onCompletionStateClick={onCompletionStateClick}
              onNoteCompletionChange={onNoteCompletionChange}
            />
          ) : null}
        </section>
      </main>

      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        data={confirmationDialog.data}
        onAnimationEnd={confirmationDialog.onAnimationEnd}
        className="[&_button]:min-w-20"
      />
    </div>
  );
}
