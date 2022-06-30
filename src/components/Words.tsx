import { useState } from "react";
import { audioService, words } from "../assets/soundsMap";
import { PageLayout } from "./PageLayout";
import "./Words.scss"

function wait(foo: any) {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

let actWord: string;

function Words () {
  const [state, setState] = useState({letter: "", show: false});
  const cls: string = "BigLetter " + (state.show ? "show" : "hide");

  return (
    <PageLayout title="PAROLE">
      <div className="Words">
        <div className="Words-cnt Buttons-cnt">{words.map((n) =>
          <button key={n} onClick={() => audioService.playWord(n, (letter) => wait(setState({letter, show: true})), (letter) => wait(setState({letter, show: false}))).catch(() => setState({letter: "", show: false}))}>{n}</button>)}
        </div>
        <span className={cls}>{state.letter}</span>
      </div>
    </PageLayout>
  )
}

export default Words;
