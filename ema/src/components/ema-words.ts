
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from "lit/directives/repeat.js";
import { audioService, words } from '../assets/soundsMap';
import { buttonStyle } from '../styles/button';
import { BigLetterFinishEvent } from './ema-big-letter';

declare global {
  interface HTMLElementTagNameMap {
    'ema-words': EmaWordsElement
  }
}

type BigLetter = {letter: string; uid: number};

let abort: AbortController | null;

@customElement('ema-words')
export class EmaWordsElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      font-family: var(--font-main);
    }

    * {
      font-family: inherit;
    }

    #words {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 32px;
    }

    #big-words {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    ${buttonStyle}
  `;

  @state()
  private bigLetters: BigLetter[] = [];

  private letterUID = 0;
  private getLetterUID() {
    this.letterUID++;
    return this.letterUID;
  }

  private playLetter (letter: string) {
    abort && abort.abort();
    abort = new AbortController()
    this.bigLetters.push({letter, uid: this.getLetterUID()});
    this.requestUpdate();
  }

  render() {
    return html`
      <div id="words">${words.map((n) => html`<button @click=${() => this.playLetter(n)}>${n}</button>`)}</div>
      <div id="big-words">
        ${repeat(this.bigLetters, (item) => item.uid, (item) => html`<ema-big-letter letter=${item.letter} uid=${item.uid} @finish=${(e: BigLetterFinishEvent) => {
          this.bigLetters = this.bigLetters.filter((item) => (item.uid !== e.detail));
        }}></ema-big-letter>`)}
      </div>
    `
  }

}

