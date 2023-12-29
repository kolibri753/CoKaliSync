import React, { useEffect, useRef } from "react";
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
  const containerClassName =
    playerKeys.length === 8 ? "eight-notes" : "nine-notes";

  return (
    <div className={`kalimba__container ${containerClassName}`}>
      {notes.map((note, index) => (
        <div
          key={index}
          className="kalimba__key"
          onClick={() => {
            onNoteClick(note.name);
            Rune.actions.playNote({ noteName: note.name });
          }}
          style={{
            display: playerKeys.includes(note.name) ? "flex" : "none",
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
