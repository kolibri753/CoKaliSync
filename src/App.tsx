import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import { Note } from "./types/KalimbaNote";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const [noteToPlay, setNoteToPlay] = useState<Note | null>(null);
  const [isProcessingChange, setIsProcessingChange] = useState(false);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, action }) => {
        if (isProcessingChange) {
          return; // Skip the handler if it's already processing
        }

        setIsProcessingChange(true);
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Updated game state:", game);
        console.log("Your Player ID:", yourPlayerId);

        // Check if the action is related to playing a note
        if (action && action.name === "playNote") {
          const { note, yourPlayerId } = action.params;

          // If the player who played the note is not the current player
          if (yourPlayerId !== playerId) {
            setNoteToPlay(note);
          }
        }

        setIsProcessingChange(false);
      },
    });
  }, [playerId, isProcessingChange]);

  useEffect(() => {
    // Check if there's a note to play
    if (noteToPlay && playerId) {
      Rune.actions.playNote({ note: noteToPlay, yourPlayerId: playerId });
      // Add logic to play sound if needed
      setNoteToPlay(null); // Reset the note after playing
    }
  }, [noteToPlay, playerId]);

  const handleNoteClick = (note: Note) => {
    console.log(`Clicked note: ${note}`);
    // Add logic to check if the clicked note is correct
    // and set the note to play for the current player
    if (playerId) {
      setNoteToPlay(note);
    }
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
