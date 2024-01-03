export type Tab = { noteName: string; duration: number };

export const createNote = (noteName: string, duration: number): Tab => ({
  noteName,
  duration,
});

export const createPause = (duration: number): Tab => createNote("P", duration);
