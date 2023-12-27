import React, { useState, useEffect } from "react";
import "./TabsComponent.css";

interface TabsComponentProps {
  tabs: { noteName: string; duration: number }[];
  onNotePlayed: (note: string, isCorrect: boolean) => void;
}

const TabsComponent: React.FC<TabsComponentProps> = ({
  tabs,
  onNotePlayed,
}) => {
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [playedStatus, setPlayedStatus] = useState<boolean[]>(
    Array(tabs.length).fill(false)
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Mark the current tab as played
      setPlayedStatus((prevStatus) => {
        const newStatus = [...prevStatus];
        newStatus[currentNoteIndex] = true;
        return newStatus;
      });

      // Move to the next note
      setCurrentNoteIndex((prevIndex) => (prevIndex + 1) % tabs.length);
    }, tabs[currentNoteIndex].duration); // Use the duration of the current tab

    // Cleanup the timeout on component unmount or when the note is played
    return () => clearTimeout(timer);
  }, [tabs, currentNoteIndex]);

  return (
    <div className="tabs-container">
      <div className="tabs-line">
        {tabs.map((tab, index) =>
          !playedStatus[index] ? (
            <div
              key={index}
              className={`tab ${index === currentNoteIndex ? "current" : ""}`}
            >
              {tab.noteName}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default TabsComponent;
