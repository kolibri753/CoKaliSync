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
  // Array of Audio refs for preloading
  const audioRefs: React.RefObject<HTMLAudioElement>[] = notes.map(() =>
    useRef<HTMLAudioElement>(null)
  );

  // Effect to preload audio files
  useEffect(() => {
    audioRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.src = notes[index].sound;
        ref.current.load();
      }
    });
  }, [notes]);

  // Function to play the sound
  const playSound = (soundRef: React.RefObject<HTMLAudioElement>) => {
    const audio = soundRef.current;
    if (audio) {
      audio.currentTime = 0; // Reset to the beginning
      const playPromise = audio.play();
      if (playPromise) {
        playPromise.catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  return (
    <div className="kalimba__container">
      {notes.map((note, index) => (
        <div
          key={index}
          className="kalimba__key"
          onClick={() => {
            onNoteClick(note.name);
            playSound(audioRefs[index]);
          }}
          style={{
            display: playerKeys.includes(note.name) ? "block" : "none",
            height: note.height,
          }}
        >
          {note.name}
          {/* Audio element for each note */}
          <audio ref={audioRefs[index]} />
        </div>
      ))}
    </div>
  );
};

export default KalimbaComponent;
