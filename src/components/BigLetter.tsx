import "./BigLetter.scss"

export function BigLetter (props: {show: boolean; letter: string}) {
  const cls: string = "BigLetter " + (props.show ? "show" : "hide");

  return (
    <div className={cls}>{props.letter}</div>
  )
}
