import { useEffect, useRef } from "react";
import "../styles/Home.scss"; // Dein CSS
import logocontroller from "../img/logocontroller.png";
import benniPixPortrait from "../assets/media/img/benniPixPortrait.png";
import NavbarBurger from "../components/NavbarBurger.jsx"; // burger-menu angeklatscht :)
import Navbar from "../components/Navbar.jsx";

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
      <NavbarBurger /> 
      <Navbar />
        <h1 className="overview">Algorithmus Anarchisten</h1>
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
            <img
              style={{
                height: "256px",
                width: "256px",
                borderRadius: "5px",
                display: "block",
                margin: "0 auto",
              }}
              src={benniPixPortrait}
              alt="ein pixeliger Benni"
            />
            <p className="names">Steven</p>
            <p className="names">Robert</p>
          </div>
        </div>
    </div>
  );
}

export default Team;