import React from "react";
import "./kalimbaComponent.css";
import { KalimbaNote } from "../../types/KalimbaNote";

interface KalimbaComponentProps {
  notes: KalimbaNote[];
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
          onClick={() => onNoteClick(note.name)}
          style={{
            display: playerKeys.includes(note.name) ? "block" : "none",
            height: note.height,
          }}
        >
          {note.name}
        </div>
      ))}
    </div>
  );
};

export default KalimbaComponent;
