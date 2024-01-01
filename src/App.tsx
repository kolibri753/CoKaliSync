import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import ScoreComponent from "./components/ScoreComponent/ScoreComponent";
import StartMenu from "./components/StartMenu/StartMenu";
import { Difficulty } from "./types/DifficultyTypes";
import playSounds from "./lib/playSounds";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, previousGame, action }) => {
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Updated game state:", game);
        console.log("Your Player ID:", yourPlayerId);

        playSounds(game, previousGame, action);
      },
    });
  }, []);

  useEffect(() => {
    const currentTab = game?.tabs[game?.currentNoteIndex];
    if (currentTab?.noteName === "P") {
      console.log("We are in pause");
      setTimeout(() => {
        const nextNote = game?.tabs[game?.currentNoteIndex + 1];
        if (nextNote) {
          Rune.actions.playNote({
            noteName: nextNote.noteName,
          });
        }
      }, currentTab?.duration || 0);
    }
  }, [game?.tabs, game?.currentNoteIndex]);

  const handleNoteClick = (note: string) => {
    console.log(`Clicked note: ${note}`);
  };

  const startGame = (difficulty: Difficulty) => {
    Rune.actions.startGame({ difficulty });
  };

  if (!game || !playerId) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container">
      {game.difficulty ? (
        <>
          <TabsComponent
            tabs={game.tabs}
            onNotePlayed={handleNoteClick}
            game={game}
          />
          <ScoreComponent score={game.score} />
          <KalimbaComponent
            notes={game.kalimbaNotes}
            onNoteClick={handleNoteClick}
            playerId={playerId}
            playerKeys={game.playerKeys[playerId]}
          />
        </>
      ) : (
        <StartMenu onSelectDifficulty={startGame} />
      )}
    </main>
  );
}

export default App;
