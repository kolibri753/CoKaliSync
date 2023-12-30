import React from "react";
import "./TabsComponent.css";
import { GameState } from "../../logic";

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
    <div className="tabs__container">
      <div className="tabs__line">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tabs__tab ${
              index === game.currentNoteIndex ? "current" : ""
            } ${index < game.currentNoteIndex ? "played" : ""} ${
              index === game.currentNoteIndex && !game.isCorrect
                ? "incorrect"
                : ""
            }`}
            onClick={() => onNotePlayed(tab.noteName, false)}
          >
            {tab.noteName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsComponent;
