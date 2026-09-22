import { useAppController } from "./useAppController";
import { MainHeader } from "./components/mainHeader";
import { LoadingIndicator } from "./components/loadingIndicator";

export function App() {
  const { isLoading, error } = useAppController();
  return (
    <div className="bg-black text-white min-h-dvh flex flex-col">
      <LoadingIndicator isLoading={isLoading} />

      <MainHeader />

      <main className="grow px-4">
        {error ? <p className="text-red-500">{error}</p> : null}
      </main>
    </div>
  );
}
