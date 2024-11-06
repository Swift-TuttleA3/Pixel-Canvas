import { useEffect, useRef, useState } from "react";
import "../styles/Home.scss"; // Dein CSS
import CarPixel from "../img/CarPixel.png";
import logocontroller from "../img/logocontroller.png";
import { Link } from "react-router-dom";
import Parallax from "../components/Parallax";

function Home() {
  // Verweise für die Elemente
  const titleRef = useRef(null);
  const catchphraseRef = useRef(null);
  const [docHeight, setDocHeight] = useState(0);

  useEffect(() => {
    setDocHeight(document.body.scrollHeight);
    console.log(docHeight);
  }, [docHeight]);

  return (
    <div className="body">
      <div className="parallax">
        <Parallax docHeight={docHeight} />
      </div>
      <div className="headerDiv">
        <div className="whiteDiv">
          <h1 id="title" ref={titleRef}>
            DCI
          </h1>
          <p id="catchphrase" ref={catchphraseRef}>
            DIGITAL CAREER INSTITUTE
          </p>
          {/*         <button className="play">
          <h1 className="playFont">PLAY</h1>
        </button> */}
        </div>
        <div className="redDiv">
          <h1 id="titlePixel">PIXEL</h1>
          <h1 id="titleWars">WARS</h1>
        </div>
      </div>

      <h1 className="overview">OVERVIEW</h1>
      <div className="container" id="midcontainer">
        <div className="side">
          <div className="topLeft">
            <h1 className="ranking">RANKING</h1>
          </div>
          <div className="bottomLeft">
            <h1 className="coding">CODING</h1>
          </div>
        </div>
        <div className="middle">
          <Link to="/canvas">
            <h1 className="game">ENTER GAME</h1>
          </Link>
        </div>
        <div className="side">
          <div className="topRight">
            <h1 className="team">TEAM</h1>
          </div>
          <div className="bottomRight">
            <h1 className="AGB">AGB</h1>
          </div>
        </div>
      </div>
      <h1 className="finalproject">FINAL PROJECT</h1>
      <p className="lorem">
        Lorem Ipsum ist in der Webentwicklung so beliebt, weil es einfach keine
        Meinung hat. Es streitet nicht über Designentscheidungen und beschwert
        sich nie über die Farbwahl oder die Typografie. Dazu klingt es noch
        richtig schick – wer hätte gedacht, dass ein paar lateinisch klingende
        Wörter einen simplen Platzhalter so intellektuell wirken lassen? Der
        eigentliche Clou ist aber: Niemand liest es! Perfekt für Entwickler,
        denn so müssen sie keine Sorge haben, dass der Text vom Layout ablenkt
        oder plötzlich jemand fragt: Was bedeutet das eigentlich? Außerdem steht
        Lorem Ipsum immer und überall bereit.
      </p>

      <div className="middleWrapper">
        <img
          className="bild"
          src={CarPixel}
          alt="a Pixled Car for a shop with a tree in background"
        />
      </div>

      <h1 className="teamTitle">TEAM</h1>
      <div className="teamWrapper">
        <div className="frontend">
          <h1 className="dev">FRONTEND</h1>
          <p className="names">Lea</p>
          <p className="names">Stina</p>
          <p className="names">Tim</p>
        </div>
        <img
          className="controller"
          src={logocontroller}
          alt="ein pixelier controller"
        />
        <div className="backend">
          <h1 className="dev">BACKEND</h1>
          <p className="names">Benni</p>
          <p className="names">Steven</p>
          <p className="names">Robert</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
