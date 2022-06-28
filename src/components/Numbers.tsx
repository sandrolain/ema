import { audioService, numbers } from "../assets/soundsMap";
import { PageLayout } from "./PageLayout";
import "./shared.scss"

function Numbers () {
  return (
    <PageLayout>
      <div className="Numbers">
        <h1 className="Numbers-title">Numbers</h1>
        <div className="Numbers-cnt Buttons-cnt">{numbers.map((n) =>
          <button key={n} onClick={() => {
            audioService.getItem(n)?.play();
          }}>{n}</button>)}
        </div>
      </div>
    </PageLayout>
  )
}

export default Numbers;
