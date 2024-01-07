import React, { useEffect, useState } from "react";
import "./App.css";
import { GameState } from "./logic";
import KalimbaComponent from "./components/KalimbaComponent/KalimbaComponent";
import TabsComponent from "./components/TabsComponent/TabsComponent";
import ScoreComponent from "./components/ScoreComponent/ScoreComponent";
import StartMenu from "./components/StartMenu/StartMenu";
import ModalComponent from "./components/ModalComponent/ModalComponent";
import HelpButton from "./components/common/HelpButton/HelpButton";
import Timer from "./components/common/Timer/Timer";
import { Difficulty } from "./types/DifficultyTypes";
import { assignNotesToPlayers } from "./lib/assignNotesToPlayers";
import { useScreenHeight } from "./lib/useScreenHeight";
import playSounds from "./lib/playSounds";
import "./generated/preload";

function App() {
  const [game, setGame] = useState<GameState | undefined>(undefined);
  const [playerId, setPlayerId] = useState<string | undefined>(undefined);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
  const screenHeight = useScreenHeight();

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

  const { kalimbaNotes, playerKeys } = assignNotesToPlayers(
    game?.allPlayerIds || [],
    screenHeight
  );

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
          <div className="container__stats">
            <HelpButton onClick={handleHelp} />
            <ScoreComponent score={game.score} />
            <Timer game={game} />
          </div>
          <KalimbaComponent
            notes={kalimbaNotes}
            onNoteClick={handleNoteClick}
            playerKeys={playerKeys[playerId]}
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
