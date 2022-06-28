import { Link } from "react-router-dom";
import lettersImg from "../assets/images/letters.svg";
import "./Home.scss"

function Home () {
  return (
    <div className="Home">
      <div className="Home-cnt">
        <Link to="/letters" className="Home-button">
            <img src={lettersImg} />
            Lettere
        </Link>
        <Link to="/numbers" className="Home-button">
            Numeri
        </Link>
        <Link to="/words" className="Home-button">
            Parole
        </Link>
        <Link to="/images" className="Home-button">
            Immagini
        </Link>
      </div>
    </div>
  );
}


export default Home;
