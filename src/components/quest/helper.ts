export const getLocationName = (key: string) => {
  switch (key) {
    case "whiteOrchard":
      return "White Orchard";
    case "vizima":
      return "Vizima";
    case "velen":
      return "Velen";
    default:
      return key;
  }
};

export const getQuestTypeName = (key: string) => {
  switch (key) {
    case "main":
      return "Main quest";
    case "side":
      return "Side quest";
    case "contract":
      return "Witcher Contract";
    case "treasure":
      return "Treasure Hunt";
    case "gwent":
      return "Gwent";
    case "scavenger":
      return "Scavenger Hunt";
    case "encounter":
      return "Chance Encounter";
    case "race":
      return "Race";
    default:
      return key;
  }
};
