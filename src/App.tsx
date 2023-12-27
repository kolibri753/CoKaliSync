import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import { tabs } from "./data/tabsData";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Updated game state:", game);
        console.log("Your Player ID:", yourPlayerId);
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
      <TabsComponent tabs={tabs} onNotePlayed={handleNoteClick} />
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
