import { Link } from "react-router-dom";
import lettersImg from "../assets/images/letters.svg";
import { audioService, musicService } from "../assets/soundsMap";
import "./Home.scss"

function Home () {
  return (
    <div className="Home">
      <div className="Home-cnt">
        <Link to="/lettere" className="Home-button" onPointerEnter={() => audioService.playItem("LETTERE")} onClick={() => musicService.playItem("UI_Quirky_43")}>
            <img src={lettersImg} />
            LETTERE
        </Link>
        <Link to="/numeri" className="Home-button" onPointerEnter={() => audioService.playItem("NUMERI")} onClick={() => musicService.playItem("UI_Quirky_43")}>
            NUMERI
        </Link>
        <Link to="/Parole" className="Home-button" onPointerEnter={() => audioService.playItem("PAROLE")} onClick={() => musicService.playItem("UI_Quirky_43")}>
            PAROLE
        </Link>
        <Link to="/immagini" className="Home-button" onPointerEnter={() => audioService.playItem("IMMAGINI")} onClick={() => musicService.playItem("UI_Quirky_43")}>
            IMMAGINI
        </Link>
      </div>
    </div>
  );
}


export default Home;
