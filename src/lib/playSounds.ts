import { OnChangeAction } from "rune-games-sdk";
import { GameActions } from "../logic";
import { notesDistribution } from "../types/KalimbaNote";

export default function playSounds(
  action: OnChangeAction<GameActions> | undefined
) {
  if (action?.name === "playNote") {
    const noteName = action.params.noteName;

    if (!notesDistribution.includes(noteName)) {
      console.error("Note could not be determined");
      return;
    }

    const audio = new Audio(`kalimbaKeySounds/${noteName}.m4a`);

    audio.play();
  }
}
