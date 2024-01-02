import { Difficulty } from "../types/DifficultyTypes";
import { tabsEasy, tabsMedium, tabsHard } from "../data/tabsData";

export const getTabsForDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "Easy":
      return [...tabsEasy];
    case "Medium":
      return [...tabsMedium];
    case "Hard":
      return [...tabsHard];
    case "Expert":
      return [];
    default:
      throw new Error("Unknown difficulty");
  }
};
