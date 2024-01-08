import { KalimbaNote, notesDistribution } from "../types/KalimbaNote";

export function getKalimbaNotes(noteHeights: string[]): KalimbaNote[] {
  return notesDistribution.map((note, index) => {
    const height = noteHeights[index];
    return new KalimbaNote(note, height);
  });
}
