import { Difficulty } from "../types/DifficultyTypes";
import { tabsEasy } from "../data/tabsEasy";
import { tabsMedium } from "../data/tabsMedium";
import { tabsHard } from "../data/tabsHard";
import { tabsExpert } from "../data/tabsExpert";

export const getTabsForDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy":
      return [...tabsEasy];
    case "Medium":
      return [...tabsMedium];
    case "Hard":
      return [...tabsHard];
    case "Expert":
      return [...tabsExpert];
    case "Creative":
      return [];
    default:
      throw new Error("Unknown difficulty");
  }
};
