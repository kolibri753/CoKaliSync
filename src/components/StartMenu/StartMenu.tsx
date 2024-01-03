import React, { useState } from "react";
import "./startMenu.css";
import { Difficulty, DifficultyTypes, DifficultyDescriptions } from "../../types/DifficultyTypes";

interface StartMenuProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onSelectDifficulty }) => {
  const difficulties: Difficulty[] = Object.values(DifficultyTypes);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const handleSelect = (difficulty: Difficulty) => {
    console.log("Selected Difficulty:", difficulty);
    setSelectedDifficulty(difficulty);
  };

  const handleStart = () => {
    if (selectedDifficulty) {
      console.log("Starting game with difficulty:", selectedDifficulty);
      onSelectDifficulty(selectedDifficulty);
    }
  };

  return (
    <div className="menu__container">
      <h2 className="menu__action">Choose Difficulty</h2>
      <ul className="menu__list">
        {difficulties.map((difficulty) => (
          <li key={difficulty} className="menu__item">
            <button
              className={`menu__button ${
                selectedDifficulty === difficulty ? "selected" : ""
              }`}
              onClick={() => handleSelect(difficulty)}
            >
              <span className="menu__title">{difficulty}</span>
              <p className="menu__description">
                {DifficultyDescriptions[difficulty]}
              </p>
            </button>
          </li>
        ))}
      </ul>
      <button
        className="start__button"
        onClick={handleStart}
        disabled={!selectedDifficulty}
      >
        Start Game
      </button>
    </div>
  );
};

export default StartMenu;
