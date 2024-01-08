import { KalimbaNoteType, notesDistribution } from "../types/KalimbaNote";

export function getKalimbaNotes(noteHeights: string[]): KalimbaNoteType[] {
  return notesDistribution.map((note, index) => {
    const height = noteHeights[index];
    return { name: note, height: height };
  });
}
