import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import { tabs } from "./data/tabsData";
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

  const handleNoteClick = (note: string) => {
    console.log(`Clicked note: ${note}`);
    // Add logic to check if the clicked note is correct
  };

  if (!game || !playerId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <TabsComponent tabs={tabs} onNotePlayed={handleNoteClick} game={game} />
      <div className="score-container">
        <p>Score: {game.score}</p>
      </div>
      <KalimbaComponent
        notes={game.kalimbaNotes}
        onNoteClick={handleNoteClick}
        playerId={playerId}
        playerKeys={game.playerKeys[playerId]}
      />
    </div>
  );
}

export default App;
