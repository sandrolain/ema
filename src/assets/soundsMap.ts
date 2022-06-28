import { AudioService } from "../services/AudioService";

const letters = "A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z".split(",");
const vocals  = "A,E,I,O,U".split(",");
const numbers = "1,2,3,4,5,6,7,8,9,0".split(",");
const words   = "MATILDE,CHIARA,EMILIA,GIOIA,LUDOVICA,MAMMA,PAPÀ,CIAO,PAPPA,ACQUA,PIZZA,SI,NO".split(",");

const soundsMap: Map<string, string> = new Map();

export {letters, vocals, numbers, words};

export default soundsMap;

export const audioService = new AudioService();

export async function preloadSounds() {
  const allSounds = [...letters, ...numbers, ...words];
  for(const n of allSounds) {
    await audioService
      .initItemFromURL((await import(`./sounds/${n}.mp3`)).default, n)
      .catch(() => null);
  }
}


export function wordToLetters (word: string) {
  const letters = word.split("");
  return letters;
}
