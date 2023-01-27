
import { css, html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { images } from '../assets/images';
import { audioService } from '../assets/soundsMap';
import { wait } from '../services/utils';

declare global {
  interface HTMLElementTagNameMap {
    'ema-big-letter': EmaBigLetterElement
  }
}

export type BigLetterFinishEvent = CustomEvent<number>;


@customElement('ema-big-letter')
export class EmaBigLetterElement extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }
    #big-letter {
      font-size: 10em;
      line-height: 1em;
      font-weight: bold;
      transform: scale(0);
      opacity: 0;
      display: block;
      text-align: center;
      color: #FFFFFF;
      text-shadow: 0 0.05em 0.1em rgba(0, 0, 0, 0.5);
    }
    #big-letter.show {
      animation: letter-show 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }
    #big-letter.hide {
      animation: letter-hide 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    img {
      height: 1.5em;
      vertical-align: middle;
      aspect-ratio: 1/1;
      object-fit: cover;
    }

    @keyframes letter-show {
      0% {
        opacity: 0;
        transform: scale(0);
      }
      100% {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes letter-hide {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0);
      }
    }
  `;

  @property({
    type: String,
    attribute: true
  })
  letter: string = "";

  @property({
    type: Number,
    attribute: true
  })
  uid!: number;

  @state()
  visible: boolean = false;

  show(): Promise<void> {
    return audioService.playItem({
      name: this.letter,
      before: () => {
        this.visible = true;
        return wait(1000);
      },
      after: async () => {
        await wait();
        this.visible = false;
        await wait()
      }
    }).finally(() => {
      this.visible = false;
    });
  }

  render() {
    return html`
      <div id="big-letter" class=${classMap({show: this.visible, hide: !this.visible})}>
      ${(this.letter in images) ? html`<img src=${images[this.letter]} />` : null}
      ${this.letter}
      </div>
    `
  }

  protected firstUpdated(): void {
    this.show().
      finally(() => {
        this.dispatchEvent(new CustomEvent("finish", {
          detail: this.uid
        }));
      })
  }

}
