import medallionUrl from "../../assets/images/medallion.webp";

export function MainHeader() {
  return (
    <header className="flex flex-col items-center px-4">
      <img src={medallionUrl} alt="Wolf school medallion" className="w-20" />
      <h1 className="relative -top-3">Witcher quest tracker</h1>
    </header>
  );
}
