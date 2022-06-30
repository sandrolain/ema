import { audioService, letters } from "../assets/soundsMap";
import { PageLayout } from "./PageLayout";

function Letters () {
  return (
    <PageLayout title="LETTERE">
      <div className="Letters">
        <div className="Letters-cnt Buttons-cnt">{letters.map((n) =>
          <button key={n} onClick={() => {
            audioService.getItem(n)?.play();
          }}>{n}</button>)}
        </div>
      </div>
    </PageLayout>
  )
}

export default Letters;
