import { useEffect, useRef, useState } from "react";
import "../styles/Home.scss"; // Dein CSS
import CarPixel from "../img/CarPixel.png";
import logocontroller from "../img/logocontroller.png";
import NavbarBurger from "../components/NavbarBurger.jsx"; // burger-menu angeklatscht :)
import Navbar from "../components/Navbar.jsx";
import Parallax from "../components/Parallax.jsx";
import { Link } from "react-router-dom";

function Home() {
  // Verweise für die Elemente
  const titleRef = useRef(null);
  const catchphraseRef = useRef(null);
  const [docHeight, setDochHeight] = useState(0);

  // Parallax-Effekt mit useEffect hinzufügen
  useEffect(() => {
    const title = titleRef.current;
    const catchphrase = catchphraseRef.current;

    if (title && catchphrase) {
      title.style.position = "relative";
      title.style.zIndex = "10";
      catchphrase.style.position = "relative";
      catchphrase.style.zIndex = "10";
    }
    setDochHeight(document.body.scrollHeight);
  }, []);

  return (
    <div className="body">
      <NavbarBurger />
      <Navbar />
      <div className="parallax-home pointer-events-auto absolute">
        <Parallax docHeight={docHeight} pixelCount={100} />
      </div>
      <div className="headerDiv pointer-events-none">
        <div className="whiteDiv">
          <h1 id="title" ref={titleRef}>
            DCI
          </h1>
          <p id="catchphrase" ref={catchphraseRef}>
            DIGITAL CAREER INSTITUTE
          </p>
        </div>
        <div className="redDiv">
          <p id="titlePixel">PIXEL</p>
          <p id="titleWars">WARS</p>
        </div>
      </div>

      <p className="overview">OVERVIEW</p>
      <div className="container" id="midcontainer">
        <div className="side">
          <div className="topLeft">
            <p className="ranking">RANKING</p>
          </div>
          <div className="bottomLeft">
            <p className="coding">CODING</p>
          </div>
        </div>
        <div className="middle">
          <Link to="/canvas">
            <p className="game pointer-events-auto">ENTER GAME</p>
          </Link>
        </div>
        <div className="side">
          <div className="topRight">
            <p className="team">TEAM</p>
          </div>
          <div className="bottomRight">
            <p className="AGB">AGB</p>
          </div>
        </div>
      </div>
      <p className="finalproject">FINAL PROJECT</p>
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

      <p className="teamTitle">TEAM</p>
      <div className="teamWrapper">
        <div className="frontend">
          <p className="dev">FRONTEND</p>
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
          <p className="dev">BACKEND</p>
          <p className="names">Benni</p>
          <p className="names">Steven</p>
          <p className="names">Robert</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
