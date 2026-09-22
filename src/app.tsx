import { MainHeader } from "./components/mainHeader";

export function App() {
  return (
    <div className="bg-black text-white min-h-dvh flex flex-col">
      <MainHeader />

      <main className="grow px-4"></main>
    </div>
  );
}
