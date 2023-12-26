import type { RuneClient } from "rune-games-sdk/multiplayer";

// Define the type for player keys
type PlayerKeys = { [playerId: string]: string[] };

// Define the game state interface
export interface GameState {
  count: number;
  kalimbaNotes: string[];
  playerKeys: PlayerKeys;
}

// Define the game actions
type GameActions = {
  increment: (params: { amount: number }) => void;
};

// Declare the Rune client and global objects
declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

// Helper function to shuffle an array using Fisher-Yates algorithm
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

// Helper function to generate kalimba notes
function generateKalimbaNotes(): string[] {
  const notesDistribution: string[] = [
    "C4",
    "D4",
    "E4",
    "F4",
    "G4",
    "A4",
    "B4",
    "C5",
    "D5",
    "E5",
    "F5",
    "G5",
    "A5",
    "B5",
    "C6",
    "D6",
    "E6",
  ];

  return notesDistribution.slice(); // Using slice to return a new array
}

// Initialize the Rune logic
Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const kalimbaNotes = generateKalimbaNotes();
    const playerKeys: PlayerKeys = {};

    // Assign specific notes to each player
    for (let i = 0; i < allPlayerIds.length; i++) {
      const playerId = allPlayerIds[i];
      const startIndex = i * (kalimbaNotes.length / allPlayerIds.length);
      const endIndex = (i + 1) * (kalimbaNotes.length / allPlayerIds.length);
      playerKeys[playerId] = kalimbaNotes.slice(startIndex, endIndex);

      // Log player keys to the console
      console.log(`Player ${i + 1} (${playerId}) keys:`, playerKeys[playerId]);
    }

    return { count: 0, kalimbaNotes, playerKeys };
  },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
  },
});
