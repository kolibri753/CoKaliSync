import React from "react";
import "./TabsComponent.css";
import { GameState } from "../../logic"; // Import GameState from the logic file

interface TabsComponentProps {
  tabs: { noteName: string; duration: number }[];
  onNotePlayed: (note: string, isCorrect: boolean) => void;
  game: GameState;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  onNotePlayed,
  game,
}) => {
  return (
    <div className="tabs-container">
      <div className="tabs-line">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${
              index === game.currentNoteIndex ? "current" : ""
            } ${index < game.currentNoteIndex ? "played" : ""} ${
              index === game.currentNoteIndex && !game.isCorrect
                ? "incorrect"
                : ""
            }`}
            onClick={() => onNotePlayed(tab.noteName, false)} // assuming false for incorrect
          >
            {tab.noteName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
