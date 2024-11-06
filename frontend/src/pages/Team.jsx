import { useEffect, useRef } from "react";
import "../styles/Home.scss"; // Dein CSS
import logocontroller from "../img/logocontroller.png";
import NavbarHome from "../components/NavbarHome.jsx"; // burger-menu angeklatscht :)

function Team() {
  // Verweise für die Elemente
  const titleRef = useRef(null);
  const catchphraseRef = useRef(null);
  const starsRef = useRef([]);
  const stars2Ref = useRef([]);
  const stars3Ref = useRef([]);

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

    const layers = [
      { elements: starsRef.current, movementFactor: 0.05 },
      { elements: stars2Ref.current, movementFactor: 0.1 },
      { elements: stars3Ref.current, movementFactor: 0.15 },
    ];

    const handleMouseMove = (e) => {
      let clientX, clientY;
      if (e.type === "touchmove") {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      layers.forEach((layer) => {
        layer.elements.forEach((star) => {
          const rect = star.getBoundingClientRect();
          const starX = rect.left + rect.width / 2;
          const starY = rect.top + rect.height / 2;
          const deltaX = clientX - starX;
          const deltaY = clientY - starY;
          const newX = deltaX * layer.movementFactor;
          const newY = deltaY * layer.movementFactor;
          star.style.transform = `translate(${newX}px, ${newY}px)`;
        });
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleMouseMove);
    };
  }, []);

  return (
    <div className="body">
      <NavbarHome /> 
      <div className="headerDiv">
        <div className="whiteDiv">
          <h1 id="title" ref={titleRef}>
            DCI
          </h1>
          <p id="catchphrase" ref={catchphraseRef}>
            DIGITAL CAREER INSTITUTE
          </p>
        </div>
        <div className="redDiv">
          <h1 id="titlePixel">Team</h1>
          <h1 id="titleWars">Space</h1>
        </div>
      </div>

      <div id="stars" ref={(el) => starsRef.current.push(el)}></div>
      <div id="stars2" ref={(el) => stars2Ref.current.push(el)}></div>
      <div id="stars3" ref={(el) => stars3Ref.current.push(el)}></div>

      <main>
        <h1 className="overview">Algorithmus Anarchisten</h1>
        <h2 className="teamTitle">TEAM</h2>
        <div className="teamWrapper">
          <div className="frontend">
            <h3 className="dev">FRONTEND</h3>
            <p className="names">Lea</p>
            <p className="names">Stina</p>
            <p className="names">Tim</p>
          </div>
          <img
            className="controller"
            src={logocontroller}
            alt="ein pixeliger controller"
          />
          <div className="backend">
            <h3 className="dev">BACKEND</h3>
            <p className="names">Benni</p>
            <p className="names">Steven</p>
            <p className="names">Robert</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Team;