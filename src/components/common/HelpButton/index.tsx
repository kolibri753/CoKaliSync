import React from "react";
import "./styles.css";

interface HelpButtonProps {
  onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <button className="helpButton" onClick={onClick}>
      ?
    </button>
  );
};

export default HelpButton;