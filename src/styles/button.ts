import { css } from "lit";

export const buttonStyle = css`
  button {
    font-family: inherit;
    font-size: var(--font-size, 40px);
    border-radius: 0.5em;
    border-width: 0;
    background: linear-gradient(180deg, hsl(var(--btn-tint), 40%), hsl(var(--btn-tint), 30%));
    cursor: pointer;
    padding: 0 0.5em;
    box-sizing: border-box;
    min-width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
    box-shadow: 0 0.25em 1em rgba(0, 0, 0, 0.5);
  }
  button:active {
    background: linear-gradient(0deg, hsl(var(--btn-tint), 40%), hsl(var(--btn-tint), 30%));
  }
  button img {
    height: 1.5em;
    vertical-align: middle;
    aspect-ratio: 1/1;
    object-fit: cover;
    margin: -0.25em 0.5em 0 -0.5em;
    border-radius: 0.5em;
    position: relative;
    mix-blend-mode: luminosity;
  }
`;
