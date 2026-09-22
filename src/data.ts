export const getQuests = async () => {
  const response = await fetch("/quests.json");

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return response.json();
};
