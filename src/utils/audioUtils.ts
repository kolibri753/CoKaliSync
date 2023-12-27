// export const playSound = (audioRef: React.RefObject<HTMLAudioElement>) => {
//   const audio = audioRef.current;
//   if (audio) {
//     audio.currentTime = 0; // Reset to the beginning
//     const playPromise = audio.play();
//     if (playPromise) {
//       playPromise.catch((error) => {
//         console.error("Error playing audio:", error);
//       });
//     }
//   }
// };

export const sounds = {
  D6: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/1.m4a"
  ),
  B5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/2.m4a"
  ),
  G5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/3.m4a"
  ),
  E5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/4.m4a"
  ),
  C5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/5.m4a"
  ),
  A4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/6.m4a"
  ),
  F4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/7.m4a"
  ),
  D4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/8.m4a"
  ),
  C4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/9.m4a"
  ),
  E4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/10.m4a"
  ),
  G4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/11.m4a"
  ),
  B4: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/12.m4a"
  ),
  D5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/13.m4a"
  ),
  F5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/14.m4a"
  ),
  A5: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/15.m4a"
  ),
  C6: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/16.m4a"
  ),
  E6: new Audio(
    import.meta.env.BASE_URL + "src/assets/kalimbaKeySounds/17.m4a"
  ),
};

export const playSound = (name: keyof typeof sounds) => {
  const sound = sounds[name];
  try {
    sound.currentTime = 0; // Reset to the beginning
    sound.play();
  } catch (_e) {
    // Sounds may be blocked by the browser
  }
};
