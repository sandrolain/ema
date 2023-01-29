import PIZZA from "./pizza.jpg";
import ACQUA from "./acqua.jpg";
import CHIARA from "./CHIARA.jpg";
import DANIELA from "./DANIELA.jpg";
import EMA from "./EMA.jpg";
import EMANUELA from "./EMANUELA.jpg";
import EMILIA from "./EMILIA.jpg";
import FABIO from "./FABIO.jpg";
import FRANCO from "./FRANCO.jpg";
import LUISA from "./LUISA.jpg";
import MAMMA from "./MAMMA.jpg";
import MATILDE from "./MATILDE.jpg";
import NONNA from "./NONNA.jpg";
import NONNO_1 from "./NONNO_1.jpg";
import NONNO_2 from "./NONNO_2.jpg";
import PAPA from "./PAPA.jpg";
import PONE from "./PONE.jpg";
import RICCARDO from "./RICCARDO.jpg";
import SANDRO from "./SANDRO.jpg";


export const images: Record<string, string | string[]> = {
  PIZZA,
  ACQUA,
  CHIARA,
  DANIELA,
  EMA,
  EMANUELA,
  EMILIA,
  FABIO,
  FRANCO,
  LUISA,
  MAMMA,
  MATILDE,
  NONNA,
  NONNO: [NONNO_1, NONNO_2],
  "PAPÀ": PAPA,
  PONE,
  RICCARDO,
  SANDRO
};


export function getImage(src: string | string[]): string {
  if(Array.isArray(src)) {
    return src[Math.floor(Math.random() * src.length)];
  }
  return src;
}
