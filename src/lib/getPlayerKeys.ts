import { PlayerKeys } from "../types/PlayerKeys";
import { getKalimbaNotes } from "./getKalimbaNotes";

export function getPlayerKeys(
  allPlayerIds: string[],
  currentPlayerId: string,
  noteHeights: string[]
): PlayerKeys {
  const kalimbaNotes = getKalimbaNotes(noteHeights);

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

  return playerKeys;
}