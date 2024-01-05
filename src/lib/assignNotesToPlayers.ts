import {
  KalimbaNote,
  notesDistribution,
  notesHeight,
} from "../types/KalimbaNote";
import { PlayerKeys } from "../types/PlayerKeys";

export function assignNotesToPlayers(allPlayerIds: string[], screenHeight: number): {
  kalimbaNotes: KalimbaNote[];
  playerKeys: PlayerKeys;
} {
  // Create an array of KalimbaNote objects
  const kalimbaNotes: KalimbaNote[] = notesDistribution.map((note, index) => {
    // Determine adjustment factor based on screen height
    const adjustmentFactor = screenHeight < 460 ? 2 : 3;

    // Calculate adjusted height
    const adjustedHeight = parseFloat(notesHeight[index]) * adjustmentFactor;
    const height = adjustedHeight.toString() + "em";
    return new KalimbaNote(note, height);
  });

  // Assign specific notes to each player sequentially
  const playerKeys: PlayerKeys = {};
  for (let i = 0; i < allPlayerIds.length; i++) {
    const playerId = allPlayerIds[i];
    const startIndex = i * (kalimbaNotes.length / allPlayerIds.length);
    const endIndex = (i + 1) * (kalimbaNotes.length / allPlayerIds.length);
    playerKeys[playerId] = kalimbaNotes
      .slice(startIndex, endIndex)
      .map((note) => note.name);
  }

  return { kalimbaNotes, playerKeys };
}
