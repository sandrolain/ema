
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from "lit/directives/repeat.js";
import { getImage, images } from '../assets/images';
import { words } from '../assets/soundsMap';
import { buttonStyle } from '../styles/button';
import { BigLetterFinishEvent } from './ema-big-letter';

declare global {
  interface HTMLElementTagNameMap {
    'ema-words': EmaWordsElement
  }
}

type BigLetter = {letter: string; uid: number; onfinish?: () => void};

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

  private activeWord: string = "";

  private playWord (word: string, onfinish?: () => void) {
    this.activeWord = word;
    this.bigLetters = [];
    if(word.length > 0 && !onfinish) {
      onfinish = () => this.playLetter(word, 0);
    }
    this.addToPlay(word, onfinish);
  }

  private playLetter(word: string, i: number) {
    if(word != this.activeWord) {
      return;
    }
    if(i < word.length) {
      this.addToPlay(word[i], () => {
        this.playLetter(word, i + 1);
      });
    } else {
      this.addToPlay(word);
    }
  }

  private addToPlay(letter: string, onfinish?: () => void) {
    this.bigLetters.push({letter, uid: this.getLetterUID(), onfinish});
    this.requestUpdate();
  }

  render() {
    return html`
      <div id="words">${words.map((n) => html`<button @click=${() => this.playWord(n)}>${images[n] ? html`<img src=${getImage(images[n])} />` : null}${n}</button>`)}</div>
      <div id="big-words">
        ${repeat(this.bigLetters, (item) => item.uid, (item) => html`<ema-big-letter letter=${item.letter} uid=${item.uid} @finish=${(e: BigLetterFinishEvent) => this.onFinish(e, item)}></ema-big-letter>`)}
      </div>
    `
  }

  private onFinish(e: BigLetterFinishEvent, item: BigLetter) {
    this.bigLetters = this.bigLetters.filter((item) => (item.uid !== e.detail));
    if(item.onfinish) {
      item.onfinish();
    }
  }

}

