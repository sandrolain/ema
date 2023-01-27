import { AudioService } from "../services/AudioService";

// Sounds from https://ttsmp3.com/

const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"] as const;
const vocals  = ["A", "E", "I", "O", "U"] as const;
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"] as const;
const menu    = ["LETTERE", "NUMERI", "PAROLE", "IMMAGINI"] as const;
const words   = ["MATILDE", "CHIARA", "EMILIA", "GIOIA", "LAIN", "LUDOVICA", "MAKI", "MAMMA", "LUISA", "PAPÀ", "SANDRO", "ZIO", "FABIO", "RICCARDO", "NONNO", "FRANCO", "NONNA", "DANIELA", "EMANUELA", "EMA",  "CIAO", "PAPPA", "ACQUA", "PIZZA", "SI", "NO"] as const;

const music = ["Pixel-Puppies", "UI_Quirky_43"];

const soundsMap: Map<string, string> = new Map();

export {letters, vocals, numbers, menu, words};

export default soundsMap;

export const musicService = new AudioService();
export const audioService = new AudioService();

export async function preloadMusic() {
  musicService.init();
  for(const n of music) {
    await musicService
      .initItemFromURL((await import(`./music/${n}.mp3`)).default, n)
      .catch(() => null);
  }
}

export async function preloadSounds() {
  audioService.init();
  const allSounds = [...menu, ...letters, ...numbers, ...words];
  for(const n of allSounds) {
    await audioService
      .initItemFromURL((await import(`./sounds/${n}.mp3`)).default, n)
      .catch(() => null);
  }
}
