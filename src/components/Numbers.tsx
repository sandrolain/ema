import { audioService, numbers } from "../assets/soundsMap";
import { PageLayout } from "./PageLayout";
import "./shared.scss"

function Numbers () {
  return (
    <PageLayout title="NUMERI">
      <div className="Numbers">
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
