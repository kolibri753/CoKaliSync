import { PlayerKeys } from "../types/PlayerKeys";
import { getKalimbaNotes } from "./getKalimbaNotes";

export function getPlayerKeys(
  allPlayerIds: string[],
  currentPlayerId: string,
  noteHeights: string[]
): PlayerKeys {
  const kalimbaNotes = getKalimbaNotes(noteHeights);
  const notesPerPlayer = Math.ceil(kalimbaNotes.length / 2);

  const playerKeys: PlayerKeys = {};
  const currentPlayerIndex = allPlayerIds.indexOf(currentPlayerId);
  const startIndex = currentPlayerIndex * notesPerPlayer;
  const endIndex = Math.min(startIndex + notesPerPlayer, kalimbaNotes.length);

  playerKeys[currentPlayerId] = kalimbaNotes
    .slice(startIndex, endIndex)
    .map((note) => note.name);

  return playerKeys;
}
