import type { Quest } from "./components/quest/domain";

export type QuestMock = Pick<
  Quest,
  "id" | "name" | "completionState" | "selectedPaths" | "prerequisites"
>;

// Ghosts of the past
export const ghostsOfThePastUntouched: QuestMock = {
  id: "56",
  name: "[Untouched] Ghosts of the past",
  selectedPaths: [],
  prerequisites: [
    [
      {
        id: "17",
        name: "Imperial Audience",
        paths: [[{ name: "Letho", option: "Letho was spared" }]],
        state: "success",
      },
    ],
  ],
};

// Imperial Audience
export const imperialAudienceUntouched: QuestMock = {
  id: "17",
  name: "[Untouched] Imperial Audience",
  selectedPaths: [],
  prerequisites: [],
};

export const imperialAudience_undefinedState_lethoSpared: QuestMock = {
  ...imperialAudienceUntouched,
  name: "[Undefined state, Letho spared] Imperial Audience",
  selectedPaths: [
    {
      name: "Letho",
      optionName: "Letho was spared",
    },
  ],
};

export const imperialAudience__successState_lethoKilled: QuestMock = {
  ...imperialAudienceUntouched,
  name: "[Success state, Letho killed] Imperial Audience",
  selectedPaths: [
    {
      name: "Letho",
      optionName: "Letho was killed",
    },
  ],
  completionState: "success",
};

export const imperialAudience_successState_lethoSpared: QuestMock = {
  ...imperialAudienceUntouched,
  name: "[Success state, Letho spared] Imperial Audience",
  selectedPaths: [
    {
      name: "Letho",
      optionName: "Letho was spared",
    },
  ],
  completionState: "success",
};

// Return to Crookback Bog
export const returnToCrookbackBogUntouched: QuestMock = {
  id: "65",
  name: "[Untouched] Return to Crookback Bog",
  selectedPaths: [],
  prerequisites: [],
};

export const returnToCrookbackBog_successState: QuestMock = {
  id: "65",
  name: "[Success state] Return to Crookback Bog",
  selectedPaths: [],
  prerequisites: [],
  completionState: "success",
};

// Saving Farmer's Daughter From Soldiers (I)
export const savingFarmersDaughterFromSoldiersI: QuestMock = {
  id: "66",
  name: "[Untouched] Saving Farmer's Daughter From Soldiers (I)",
  prerequisites: [
    [
      {
        id: "65",
        name: "Return to Crookback Bog",
        state: "success",
        paths: [],
      },
    ],
  ],
  selectedPaths: [],
};

// For the Advancement of Learning
export const forTheAdvancementOfLearningUntouched: QuestMock = {
  id: "52",
  name: "[Untouched] For the Advancement of Learning",
  selectedPaths: [],
  prerequisites: [],
};

export const forTheAdvancementOfLearning_successState: QuestMock = {
  ...forTheAdvancementOfLearningUntouched,
  name: "[Success state] For the Advancement of Learning",
  completionState: "success",
};

export const forTheAdvancementOfLearning_successState_KeiraKaerMorhen: QuestMock =
  {
    ...forTheAdvancementOfLearningUntouched,
    name: "[Success state, Keira at Kaer Morhen] For the Advancement of Learning",
    completionState: "success",
    selectedPaths: [
      { name: "Keira", optionName: "Keira was spared and sent to Kaer Morhen" },
    ],
  };

export const forTheAdvancementOfLearning_successState_KeiraRadovid: QuestMock =
  {
    ...forTheAdvancementOfLearningUntouched,
    name: "[Success state, Keira at Radovid] For the Advancement of Learning",
    completionState: "success",
    selectedPaths: [
      { name: "Keira", optionName: "Keira was spared and sent to Radovid" },
    ],
  };

// A Final Kindness
export const aFinalKindnessUntouched: QuestMock = {
  id: "A Final Kindness",
  name: "[Untouched] A Final Kindness",
  selectedPaths: [],
  prerequisites: [
    [
      {
        id: "52",
        name: "For the Advancement of Learning",
        state: "empty",
        paths: [],
      },
    ],
    [
      {
        id: "52",
        name: "For the Advancement of Learning",
        state: "success",
        paths: [
          [
            {
              name: "Keira",
              option: "Keira was spared and sent to Radovid",
            },
          ],
        ],
      },
    ],
  ],
};
