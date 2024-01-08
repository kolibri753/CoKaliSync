import { useEffect, useState } from "react";
import { notesDistribution } from "../types/KalimbaNote";

export function useNoteHeights(notesHeight: string[], screenHeight: number): string[] {
  const [noteHeights, setNoteHeights] = useState<string[]>([]);

  useEffect(() => {
    // Create an array of KalimbaNote heights
    const adjustedHeights = notesDistribution.map((note, index) => {
      // Determine adjustment factor based on screen height
      const adjustmentFactor = screenHeight < 460 ? 2 : 3;

      // Calculate adjusted height
      const adjustedHeight = parseFloat(notesHeight[index]) * adjustmentFactor;
      return adjustedHeight.toString() + "em";
    });

    setNoteHeights(adjustedHeights);
  }, [screenHeight, notesHeight]);

  return noteHeights;
}
