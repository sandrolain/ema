
import { css, html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from "lit/directives/repeat.js";
import { audioService, letters } from '../assets/soundsMap';
import { buttonStyle } from '../styles/button';
import { BigLetterFinishEvent } from './ema-big-letter';

declare global {
  interface HTMLElementTagNameMap {
    'ema-letters': EmaLettersElement
  }
}

type BigLetter = {letter: string; uid: number};

const VOCALS = ["A", "E", "I", "O", "U"];

@customElement('ema-letters')
export class EmaLettersElement extends LitElement {
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

    button.vocal {
      --btn-tint: 0, 60%;
    }

    #letters {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      justify-content: center;
      padding: 32px;
    }

    #big-letters {
      display: flex;
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
    this.bigLetters.push({letter, uid: this.getLetterUID()});
    this.requestUpdate();
  }

  render() {
    return html`
      <div id="letters">${letters.map((n) => html`<button class=${classMap({vocal: VOCALS.includes(n)})} @click=${() => this.playLetter(n)}>${n}</button>`)}</div>
      <div id="big-letters">
        ${repeat(this.bigLetters, (item) => item.uid, (item) => html`<ema-big-letter letter=${item.letter} uid=${item.uid} @finish=${(e: BigLetterFinishEvent) => {
          this.bigLetters = this.bigLetters.filter((item) => (item.uid !== e.detail));
        }}></ema-big-letter>`)}
      </div>
    `
  }

  private keydownListener!: (e: KeyboardEvent) => void;

  connectedCallback(): void {
    super.connectedCallback();
    this.keydownListener = (e: KeyboardEvent) => {
      const letter = e.key.toUpperCase();
      if (audioService.getItem(letter)) {
        this.playLetter(letter)
      }
    };
    document.addEventListener("keyup", this.keydownListener);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("keyup", this.keydownListener);
  }

}

