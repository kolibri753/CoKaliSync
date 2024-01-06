import React, { useState } from "react";
import "./startMenu.css";
import {
  Difficulty,
  DifficultyTypes,
  DifficultyDescriptions,
} from "../../types/DifficultyTypes";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import HelpButton from "../common/HelpButton/HelpButton";

interface StartMenuProps {
  onSelectDifficulty: (difficulty: Difficulty) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onSelectDifficulty }) => {
  const difficulties: Difficulty[] = Object.values(DifficultyTypes);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

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

  const handleHelp = () => {
    setIsHelpModalOpen(true);
  };

  const closeHelpModal = () => {
    setIsHelpModalOpen(false);
  };

  return (
    <div className="menu__container">
      <div className="menu__header">
        <h2 className="menu__action">Choose Difficulty</h2>
        <HelpButton onClick={handleHelp} />
      </div>
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

      {isHelpModalOpen && (
        <ModalComponent isOpen={isHelpModalOpen} onClose={closeHelpModal} />
      )}
    </div>
  );
};

export default StartMenu;
