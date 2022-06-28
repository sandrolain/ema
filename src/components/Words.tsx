import { useState } from "react";
import { audioService, words, wordToLetters } from "../assets/soundsMap";
import { PageLayout } from "./PageLayout";
import "./Words.scss"

function wait(foo: any) {
  return new Promise((resolve) => setTimeout(resolve, 500));
}

function Words () {
  const [state, setState] = useState({letter: "", show: false});
  const cls: string = "BigLetter " + (state.show ? "show" : "hide");
  return (
    <PageLayout>
      <div className="Words">
        <h1 className="Words-title">Words</h1>
        <div className="Words-cnt Buttons-cnt">{words.map((n) =>
          <button key={n} onClick={async () => {
            await audioService.playItem(n);
            await audioService.playChain(wordToLetters(n), (letter) => wait(setState({letter, show: true})), (letter) => wait(setState({letter, show: false})));
            await audioService.playItem(n);
          }}>{n}</button>)}
        </div>
        <span className={cls}>{state.letter}</span>
      </div>
    </PageLayout>
  )
}

export default Words;
