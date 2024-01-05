import type { RuneClient } from "rune-games-sdk/multiplayer";
import { getTabsForDifficulty } from "./lib/getTabsForDifficulty";
import { Difficulty } from "./types/DifficultyTypes";
import { Tab } from "./types/Tab";

// Define the game state interface
export interface GameState {
  count: number;
  currentNoteIndex: number;
  isCorrect: boolean | true;
  score: number | 0;
  difficulty: Difficulty | null;
  tabs: Tab[];
  allPlayerIds: string[];
}

// Define the game actions
export type GameActions = {
  increment: (params: { amount: number }) => void;
  playNote: (params: { noteName: string }) => void;
  startGame: (params: { difficulty: Difficulty }) => void;
};

// Declare the Rune client and global objects
declare global {
  const Rune: RuneClient<GameState, GameActions>;
}

// Initialize the Rune logic
Rune.initLogic({
  minPlayers: 1,
  maxPlayers: 2,
  setup: (allPlayerIds) => {
    const currentNoteIndex = 0;

    return {
      count: 0,
      currentNoteIndex,
      isCorrect: true,
      score: 0,
      difficulty: null,
      tabs: [],
      allPlayerIds: null || allPlayerIds,
    };
  },
  // update: (obj) => {
  //   console.log(obj);
  // },
  actions: {
    increment: ({ amount }, { game }) => {
      game.count += amount;
    },
    startGame: ({ difficulty }, { game }) => {
      if (game.difficulty) {
        throw Rune.invalidAction();
      }

      game.difficulty = difficulty;
      game.tabs = getTabsForDifficulty(difficulty).filter(
        (tab) => tab.noteName !== "P"
      );
    },
    playNote: ({ noteName }, { game }) => {
      if (game.difficulty === "Creative") {
        game.score++;
        return;
      }

      const currentTab = game.tabs[game.currentNoteIndex];

      // Check if the played note matches the current tab note
      game.isCorrect = noteName === currentTab.noteName;

      console.log(`Active tab: ${currentTab.noteName}`);
      console.log(`Is correct: ${game.isCorrect}`);

      // Update score based on correctness
      if (game.isCorrect) {
        game.score += 1;

        if (game.currentNoteIndex + 1 === game.tabs.length) {
          // Determine winners and losers based on the score
          const winners: Record<string, "WON" | "LOST" | number> = {};
          const losers: Record<string, "WON" | "LOST" | number> = {};

          game.allPlayerIds.forEach((playerId) => {
            if (game.score > 0) {
              winners[playerId] = "WON";
            } else {
              losers[playerId] = "LOST";
            }
          });

          // Call Rune.gameOver with the results
          Rune.gameOver({
            players: { ...winners, ...losers },
          });
        } else {
          game.currentNoteIndex =
            (game.currentNoteIndex + 1) % game.tabs.length;
        }
      } else {
        game.score -= 1;
      }
    },
  },
});
