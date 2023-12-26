import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Initialize the Rune client and set up event handlers
    // Adjust this based on your specific initialization needs
    Rune.initClient({
      onChange: ({ game, yourPlayerId }) => {
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Updated game state:", game);
        const playerIds = Object.keys(game.playerKeys);
        console.log("Player IDs:", playerIds);
        console.log("Your Player ID:", yourPlayerId);
      },
    });
  }, []);

  const handleNoteClick = (note: string) => {
    console.log(`Clicked note: ${note}`);
  };

  if (!game || !playerId) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
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
