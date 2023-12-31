import { Difficulty } from "../types/DifficultyTypes";
import { tabsEasy } from "../data/tabsData";

export const getTabsForDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy":
      return [...tabsEasy];
    case "Medium":
      return [];
    case "Hard":
      return [];
    case "Expert":
      return [];
    default:
      throw new Error("Unknown difficulty");
  }
};
