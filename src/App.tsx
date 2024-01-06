import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import ScoreComponent from "./components/ScoreComponent/ScoreComponent";
import StartMenu from "./components/StartMenu/StartMenu";
import { Difficulty } from "./types/DifficultyTypes";
import { assignNotesToPlayers } from "./lib/assignNotesToPlayers";
import { useScreenHeight } from "./lib/useScreenHeight";
import playSounds from "./lib/playSounds";
import "./generated/preload";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const screenHeight = useScreenHeight();

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, action }) => {
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Updated game state:", game);
        console.log("Your Player ID:", yourPlayerId);

        playSounds(action);
      },
    });
  }, []);

  const { kalimbaNotes, playerKeys } = assignNotesToPlayers(
    game?.allPlayerIds || [],
    screenHeight
  );

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
            notes={kalimbaNotes}
            onNoteClick={handleNoteClick}
            playerKeys={playerKeys[playerId]}
          />
        </>
      ) : (
        <StartMenu onSelectDifficulty={startGame} />
      )}
    </main>
  );
}

export default App;
