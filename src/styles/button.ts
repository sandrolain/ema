import { css } from "lit";

export const buttonStyle = css`
  button {
    font-family: inherit;
    font-size: var(--font-size, 40px);
    border-radius: 0.5em;
    border-width: 0;
    background: linear-gradient(180deg, hsl(var(--btn-tint), 30%), hsl(var(--btn-tint), 20%));
    cursor: pointer;
    padding: 0 0.5em;
    box-sizing: border-box;
    min-width: 1.5em;
    height: 1.5em;
    line-height: 1.5em;
  }
  button:active {
    background: linear-gradient(0deg, hsl(var(--btn-tint), 30%), hsl(var(--btn-tint), 20%));
  }
`;
