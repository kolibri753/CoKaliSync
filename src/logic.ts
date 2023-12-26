import type { RuneClient } from "rune-games-sdk/multiplayer";
import { KalimbaNote } from "./types/KalimbaNote";

// Define the type for player keys
type PlayerKeys = { [playerId: string]: string[] };

// Define the game state interface
export interface GameState {
  count: number;
  kalimbaNotes: KalimbaNote[];
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


//return an array of KalimbaNote objects
function generateKalimbaNotes(): KalimbaNote[] {
  const notesDistribution: string[] = [
    "D6",
    "B5",
    "G5",
    "E5",
    "C5",
    "A4",
    "F4",
    "D4",
    "C4",
    "E4",
    "G4",
    "B4",
    "D5",
    "F5",
    "A5",
    "C6",
    "E6",
  ];

  const soundFiles: string[] = [
    "path/to/C4-sound.mp3",
    "path/to/D4-sound.mp3",
    // ... (add sound file paths for all notes)
  ];

  const notesHeight: string[] = [
    "3.33em",
    "3.65em",
    "3.9em",
    "4.25em",
    "4.5em",
    "4.8em",
    "5.3em",
    "5.8em",
    "6.1em",
    "5.55em",
    "5.2em",
    "4.7em",
    "4.3em",
    "4.05em",
    "3.75em",
    "3.5em",
    "3.2em",
  ].map((height) => (parseFloat(height) * 1.5).toString() + 'em');

  // Create an array of KalimbaNote objects
  const kalimbaNotes: KalimbaNote[] = notesDistribution.map((note, index) => {
    const height = notesHeight[index];
    const sound = soundFiles[index];
    return new KalimbaNote(note, height, sound);
  });

  return kalimbaNotes;
}

// Initialize the Rune logic
Rune.initLogic({
  minPlayers: 2,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const kalimbaNotes = generateKalimbaNotes();
    const playerKeys: PlayerKeys = {};

    // Assign specific notes to each player sequentially
    for (let i = 0; i < allPlayerIds.length; i++) {
      const playerId = allPlayerIds[i];
      const startIndex = i * (kalimbaNotes.length / allPlayerIds.length);
      const endIndex = (i + 1) * (kalimbaNotes.length / allPlayerIds.length);
      playerKeys[playerId] = kalimbaNotes
        .slice(startIndex, endIndex)
        .map((note) => note.name);

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
