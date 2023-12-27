import { OnChangeAction } from "rune-games-sdk";
// import { IRuneGameState } from "../interfaces/IRuneGameState";
import { GameActions, GameState } from "../logic";
// import { EResult } from "../enum/EResult";
// import { EGamePhase } from "../enum/EGamePhase";
// import { store } from "../store";
// import { setPlayingMusic } from "../features/core";

// let playingMusic = false;

export default function playSounds(
  game: GameState,
  previousGame: GameState,
  action: OnChangeAction<GameActions> | undefined
  //   yourPlayerId: string | undefined
) {
  console.log(action);
  // pickup pipe with volume based on player
  //   if (action?.name === "playNote") {
  //     const audio = new Audio("./audio/pick-pipe.mp3");
  //     audio.volume = action?.playerId === yourPlayerId ? 1 : 0.5;
  //     audio.play();
  //   }
}
