export const DifficultyTypes = {
  Easy: "Easy",
  Medium: "Medium",
  Hard: "Hard",
  Expert: "Expert",
  Creative: "Creative",
} as const;

export type Difficulty = typeof DifficultyTypes[keyof typeof DifficultyTypes];

export const DifficultyDescriptions: Record<Difficulty, string> = {
  Easy: "🎉 Celebrate with a classic tune! 🎂",
  Medium: "🔔 Ring in the holidays with a festive favorite! ❄️",
  Hard: "🎵 Haunting melody echoing through the trees... 🌳",
  Expert: "👊 Join the resistance with a powerful anthem! 🎵",
  Creative: "🎨 Compose your own unique masterpiece! 🎼",
};