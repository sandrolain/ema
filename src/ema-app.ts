import { css, html, LitElement, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { musicService, preloadMusic, preloadSounds } from './assets/soundsMap';
import "./components/ema-big-letter";
import "./components/ema-letters";
import "./components/ema-numbers";
import "./components/ema-words";
import { buttonStyle } from './styles/button';

declare global {
  interface HTMLElementTagNameMap {
    'ema-app': EmaAppElement
  }
}

const SECTIONS = [
  "letters",
  "numbers",
  "words"
] as const;

type Section = typeof SECTIONS[number];


@customElement('ema-app')
export class EmaAppElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100vw;
      height: 100vh;
      font-family: var(--font-main);
    }
    #init {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
    #inner {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
    }
    #head {
      height: auto;
      padding: 1em 0;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1em;
      --btn-tint: 180, 50%;
    }
    #body {
      flex: 1;
    }

    ${buttonStyle}
  `;

  @state()
  private initialized: boolean = false;

  render() {
    if (!this.initialized) {
      return html`
        <div id="init">
          <button @click=${this.initSounds}>Inizia</button>
        </div>
      `
    }
    return html`
      <div id="inner">
        <div id="head">
          <button @click=${() => this.selectSection("letters")}>Lettere</button>
          <button @click=${() => this.selectSection("numbers")}>Numeri</button>
          <button @click=${() => this.selectSection("words")}>Parole</button>
        </div>
        <div id="body">${this.getSectionTemplate()}</div>
      </div>
    `;
  }

  protected async firstUpdated() {
    await preloadMusic();
    await preloadSounds();
  }

  private async initSounds() {
    this.initialized = true;
    musicService.playLoop("Pixel-Puppies", {volume: 0.2});
  };

  private selectSection(section: Section): void {
    localStorage.setItem("section", section);
    this.requestUpdate();
  }

  private getSectionTemplate(): TemplateResult {
    const section = this.getSelectedSection();
    switch(section) {
      case "letters": return html`<ema-letters></ema-letters>`;
      case "numbers": return html`<ema-numbers></ema-numbers>`;
      case "words": return html`<ema-words></ema-words>`;
    }
  }

  private getSelectedSection(): Section {
    const section = (localStorage.getItem("section") ?? "letters") as Section;
    return section;
  }

}

