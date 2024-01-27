import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent";
import TabsComponent from "./components/TabsComponent";
import ScoreComponent from "./components/ScoreComponent";
import StartMenu from "./components/StartMenu";
import ModalComponent from "./components/ModalComponent";
import HelpButton from "./components/common/HelpButton";
import Timer from "./components/common/Timer";
import { Difficulty } from "./types/DifficultyTypes";
import { notesHeight } from "./types/KalimbaNote";
import { getKalimbaNotes } from "./lib/getKalimbaNotes";
import { useScreenHeight } from "./lib/useScreenHeight";
import playSounds from "./lib/playSounds";
import { useNoteHeights } from "./lib/useNoteHeights";
import "./generated/preload";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const screenHeight = useScreenHeight();
  const adjustedNoteHeights = useNoteHeights(notesHeight, screenHeight);

  useEffect(() => {
    Rune.initClient({
      onChange: ({ game, yourPlayerId, action }) => {
        setGame(game);
        setPlayerId(yourPlayerId);
        console.log("Game state:", game);
        playSounds(action);
      },
    });
  }, []);

  const kalimbaNotes = getKalimbaNotes(adjustedNoteHeights);

  const handleNoteClick = (note: string) => {
    console.log(`Clicked note: ${note}`);
  };

  const handleHelp = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  const startGame = (difficulty: Difficulty) => {
    Rune.actions.startGame({ difficulty });
  };

  return (
    <main className="container">
      {game?.difficulty ? (
        <>
          <TabsComponent
            tabs={game.tabs}
            onNotePlayed={handleNoteClick}
            game={game}
          />
          <div className="container__stats">
            <HelpButton onClick={handleHelp} />
            <ScoreComponent score={game.score} difficulty={game.difficulty} />
            <Timer game={game} />
          </div>
          <KalimbaComponent
            notes={kalimbaNotes}
            onNoteClick={handleNoteClick}
            playerKeys={
              (game.playerKeys.find(
                (keys) =>
                  keys &&
                  Object.prototype.hasOwnProperty.call(keys, playerId || "")
              ) || {})[playerId || ""]
            }
          />
        </>
      ) : (
        <StartMenu onSelectDifficulty={startGame} />
      )}
      {isHelpModalOpen && (
        <ModalComponent isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      )}
    </main>
  );
}

export default App;
