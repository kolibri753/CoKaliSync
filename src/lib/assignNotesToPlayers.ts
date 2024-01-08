import { KalimbaNote, notesDistribution } from "../types/KalimbaNote";
import { PlayerKeys } from "../types/PlayerKeys";

export function assignNotesToPlayers(
  allPlayerIds: string[],
  currentPlayerId: string,
  noteHeights: string[]
): { kalimbaNotes: KalimbaNote[]; playerKeys: PlayerKeys } {
  // Create an array of KalimbaNote objects
  const kalimbaNotes: KalimbaNote[] = notesDistribution.map((note, index) => {
    const height = noteHeights[index];
    return new KalimbaNote(note, height);
  });

  // Assign specific notes only to the current player
  const currentPlayerIndex = allPlayerIds.indexOf(currentPlayerId);
  const startIndex =
    currentPlayerIndex * (kalimbaNotes.length / allPlayerIds.length);
  const endIndex =
    (currentPlayerIndex + 1) * (kalimbaNotes.length / allPlayerIds.length);

  const playerKeys: PlayerKeys = {
    [currentPlayerId]: kalimbaNotes
      .slice(startIndex, endIndex)
      .map((note) => note.name),
  };

  return { kalimbaNotes, playerKeys };
}
