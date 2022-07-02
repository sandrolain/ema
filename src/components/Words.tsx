import { useState } from "react";
import { audioService, words } from "../assets/soundsMap";
import { wait } from "../services/utils";
import { BigLetter } from "./BigLetter";
import { PageLayout } from "./PageLayout";
import "./Words.scss"

let actWord: string;

function Words () {
  const [state, setState] = useState({letter: "", show: false});
  return (
    <PageLayout title="PAROLE">
      <div className="Words">
        <div className="Words-cnt Buttons-cnt">{words.map((n) =>
          <button key={n} onClick={() => audioService.playWord(n, (letter) => wait(setState({letter, show: true})), async (letter) => {
            await wait();
            await wait(setState({letter, show: false}))
          }).catch(() => setState({letter: "", show: false}))}>{n}</button>)}
        </div>
        <BigLetter {...state}></BigLetter>
      </div>
    </PageLayout>
  )
}

export default Words;
