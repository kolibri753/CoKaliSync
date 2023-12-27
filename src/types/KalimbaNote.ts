export class KalimbaNote {
  name: Note;
  height: string;
  sound: string;

  constructor(name: Note, height: string, sound: string) {
    this.name = name;
    this.height = height;
    this.sound = sound;
  }
}

export type Note =
  | "D6"
  | "B5"
  | "G5"
  | "E5"
  | "C5"
  | "A4"
  | "F4"
  | "D4"
  | "C4"
  | "E4"
  | "G4"
  | "B4"
  | "D5"
  | "F5"
  | "A5"
  | "C6"
  | "E6";
