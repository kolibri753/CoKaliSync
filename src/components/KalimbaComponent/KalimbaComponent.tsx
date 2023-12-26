import React from "react";
import "./kalimbaComponent.css";

interface KalimbaComponentProps {
  notes: string[];
  onNoteClick: (note: string) => void;
  playerId: string;
  playerKeys: string[];
}

const KalimbaComponent: React.FC<KalimbaComponentProps> = ({
  notes,
  onNoteClick,
  playerId,
  playerKeys,
}) => {
  return (
    <div className="kalimba__container">
      {notes.map((note, index) => (
        <div
          key={index}
          className="kalimba__key"
          onClick={() => onNoteClick(note)}
          style={{
            display: playerKeys.includes(note) ? "block" : "none",
          }}
        >
          {note}
        </div>
      ))}
    </div>
  );
};

export default KalimbaComponent;
