import { useAppController } from "./useAppController";
import { MainHeader } from "./components/mainHeader";
import { LoadingIndicator } from "./components/loadingIndicator";
import { Checkbox } from "./components/checkbox";

export function App() {
  const { isLoading, error, quests } = useAppController();
  return (
    <div className="bg-black text-white min-h-dvh flex flex-col">
      <LoadingIndicator isLoading={isLoading} />

      <MainHeader />

      <main className="grow px-4">
        {error ? <p className="text-red-500">{error}</p> : null}

        <ul>
          {quests?.map(({ name }, index) => (
            <li key={name}>
              {name}
              <Checkbox variant={index % 2 === 0 ? "failure" : "success"}>
                <span className="sr-only">{name}</span>
              </Checkbox>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
