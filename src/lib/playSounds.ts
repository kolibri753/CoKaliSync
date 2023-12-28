import { OnChangeAction } from "rune-games-sdk";
import { GameActions, GameState } from "../logic";

export default function playSounds(
  game: GameState,
  previousGame: GameState,
  action: OnChangeAction<GameActions> | undefined
) {
  if (action?.name === "playNote") {
    const note = game.kalimbaNotes.find(
      (note) => note.name === action.params.noteName
    );
    if (!note) return console.error("Note could not be determined");
    const audio = new Audio(import.meta.env.BASE_URL + `src/assets/kalimbaKeySounds/${note.name}.m4a`);
    audio.play();
  }
}
