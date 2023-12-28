import type { RuneClient } from "rune-games-sdk/multiplayer";
import { KalimbaNote } from "./types/KalimbaNote";

// Define the type for player keys
type PlayerKeys = { [playerId: string]: string[] };

// Define the game state interface
export interface GameState {
  count: number;
  kalimbaNotes: KalimbaNote[];
  playerKeys: PlayerKeys;
  currentNoteIndex: number;
}

// Define the game actions
export type GameActions = {
  increment: (params: { amount: number }) => void;
  playNote: (params: { noteName: string }) => void;
};

// Declare the Rune client and global objects
declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

export const notesDistribution: string[] = [
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

export const notesHeight: string[] = [
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
].map((height) => (parseFloat(height) * 1.5).toString() + "em");

//return an array of KalimbaNote objects
function generateKalimbaNotes(): KalimbaNote[] {
  // Create an array of KalimbaNote objects
  const kalimbaNotes: KalimbaNote[] = notesDistribution.map((note, index) => {
    const height = notesHeight[index];
    return new KalimbaNote(note, height);
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
    const currentNoteIndex = 0;


    return { count: 0, kalimbaNotes, playerKeys, currentNoteIndex };
  },
  // update: (obj) => {
  //   console.log(obj);
  // },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    playNote: ({ noteName }, { game }) => {
      game.currentNoteIndex = (game.currentNoteIndex + 1) % game.kalimbaNotes.length;

      console.log("Active tab " + game.currentNoteIndex)
      // you will want to add business logic here to see if this was the right note
      // rune will pass this action off to all clients and the new playSounds function will see it and do it's own thing (play the noteName provided)
    },
  },
});
