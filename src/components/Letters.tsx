import { useState } from "react";
import { audioService, letters } from "../assets/soundsMap";
import { wait } from "../services/utils";
import { BigLetter } from "./BigLetter";
import { PageLayout } from "./PageLayout";

let abort: AbortController | null;

function Letters () {
  const [state, setState] = useState({letter: "", show: false});

  const playLetter = (n: string) => {
    abort && abort.abort();
    abort = new AbortController()
    audioService.playItem(n, abort.signal, (letter) => wait(setState({letter, show: true})), async (letter) => {
      await wait();
      await wait(setState({letter, show: false}))
    }).then(() => (abort = null), () => setState({letter: "", show: false}));
  }

  return (
    <PageLayout title="LETTERE">
      <div className="Letters">
        <input type="text" onKeyDown={(e) => {
          const letter = e.key?.toUpperCase();
          if (letter && letter.length === 1) {
            playLetter(letter)
          }
          (e.target as HTMLInputElement).value = "";
        }} onKeyUp={(e) => {
          (e.target as HTMLInputElement).value = "";
        }} />
        <div className="Letters-cnt Buttons-cnt">{letters.map((n) =>
          <button key={n} onClick={() => playLetter(n)}>{n}</button>)}
        </div>
        <BigLetter {...state}></BigLetter>
      </div>
    </PageLayout>
  )
}

export default Letters;
