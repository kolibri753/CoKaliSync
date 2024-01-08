export class KalimbaNote {
  name: string;
  height: string;

  constructor(name: string, height: string) {
    this.name = name;
    this.height = height;
  }
}

export type KalimbaNoteType = {
  name: string;
  height: string;
};

export const notesDistribution: string[] = [
  "D6",
  "B5",
  "G5",
  "E5",
  "C5",
  "A4",
  "F4",
  "D4",
  "C4",
  "E4",
  "G4",
  "B4",
  "D5",
  "F5",
  "A5",
  "C6",
  "E6",
];

export const notesHeight: string[] = [
  "3.33em",
  "3.65em",
  "3.9em",
  "4.25em",
  "4.5em",
  "4.8em",
  "5.3em",
  "5.8em",
  "6.1em",
  "5.55em",
  "5.2em",
  "4.7em",
  "4.3em",
  "4.05em",
  "3.75em",
  "3.5em",
  "3.2em",
];
