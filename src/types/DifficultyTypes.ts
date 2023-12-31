export const DifficultyTypes = {
  Easy: "Easy",
  Medium: "Medium",
  Hard: "Hard",
  Expert: "Expert",
} as const;

export type Difficulty = typeof DifficultyTypes[keyof typeof DifficultyTypes];
