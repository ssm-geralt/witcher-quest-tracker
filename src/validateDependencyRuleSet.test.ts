import { describe, expect, it } from "vitest";
import { validateDependencyRuleSet } from "./helpers";
import {
  aFinalKindnessUntouched,
  forTheAdvancementOfLearning_successState,
  forTheAdvancementOfLearning_successState_KeiraKaerMorhen,
  forTheAdvancementOfLearning_successState_KeiraRadovid,
  forTheAdvancementOfLearningUntouched,
  ghostsOfThePastUntouched,
  imperialAudience__successState_lethoKilled,
  imperialAudience_successState_lethoSpared,
  imperialAudience_undefinedState_lethoSpared,
  imperialAudienceUntouched,
  returnToCrookbackBog_successState,
  returnToCrookbackBogUntouched,
  savingFarmersDaughterFromSoldiersI,
  type QuestMock,
} from "./mocks";

describe("validateDependencyRuleSet", () => {
  it.each<{
    questToCheck: QuestMock;
    questsToValidate: QuestMock[];
    validationName: string;
    expected: boolean;
  }>([
    {
      questToCheck: ghostsOfThePastUntouched,
      questsToValidate: [imperialAudienceUntouched],
      validationName: imperialAudienceUntouched.name,
      expected: false,
    },
    {
      questToCheck: ghostsOfThePastUntouched,
      questsToValidate: [imperialAudience_undefinedState_lethoSpared],
      validationName: imperialAudience_undefinedState_lethoSpared.name,
      expected: false,
    },
    {
      questToCheck: ghostsOfThePastUntouched,
      questsToValidate: [imperialAudience__successState_lethoKilled],
      validationName: imperialAudience__successState_lethoKilled.name,
      expected: false,
    },
    {
      questToCheck: ghostsOfThePastUntouched,
      questsToValidate: [imperialAudience_successState_lethoSpared],
      validationName: imperialAudience_successState_lethoSpared.name,
      expected: true,
    },
    {
      questToCheck: savingFarmersDaughterFromSoldiersI,
      questsToValidate: [returnToCrookbackBogUntouched],
      validationName: returnToCrookbackBogUntouched.name,
      expected: false,
    },
    {
      questToCheck: savingFarmersDaughterFromSoldiersI,
      questsToValidate: [returnToCrookbackBog_successState],
      validationName: returnToCrookbackBog_successState.name,
      expected: true,
    },
    {
      questToCheck: aFinalKindnessUntouched,
      questsToValidate: [forTheAdvancementOfLearningUntouched],
      validationName: forTheAdvancementOfLearningUntouched.name,
      expected: true,
    },
    {
      questToCheck: aFinalKindnessUntouched,
      questsToValidate: [forTheAdvancementOfLearning_successState],
      validationName: forTheAdvancementOfLearning_successState.name,
      expected: false,
    },
    {
      questToCheck: aFinalKindnessUntouched,
      questsToValidate: [
        forTheAdvancementOfLearning_successState_KeiraKaerMorhen,
      ],
      validationName:
        forTheAdvancementOfLearning_successState_KeiraKaerMorhen.name,
      expected: false,
    },
    {
      questToCheck: aFinalKindnessUntouched,
      questsToValidate: [forTheAdvancementOfLearning_successState_KeiraRadovid],
      validationName:
        forTheAdvancementOfLearning_successState_KeiraRadovid.name,
      expected: true,
    },
  ])(
    "checks '$questToCheck.name' with '$validationName' -> $expected",
    ({ questToCheck, questsToValidate, expected }) => {
      expect(
        validateDependencyRuleSet(
          questToCheck.prerequisites,
          new Map(questsToValidate.map((q) => [q.id, q])),
        ),
      ).toBe(expected);
    },
  );
});
