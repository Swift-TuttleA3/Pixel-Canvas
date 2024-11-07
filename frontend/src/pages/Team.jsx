import { useEffect, useRef } from "react";
import "../styles/Home.scss"; 
import benniPixPortrait from "../assets/media/img/benni.png";
import stevenPixPortrait from "../assets/media/img/steven2.png";
import robertPixPortrait from "../assets/media/img/robert.png";
import leaPixPortrait from "../assets/media/img/lea.png";
import stinaPixPortrait from "../assets/media/img/stina.png";
import timPixPortrait from "../assets/media/img/tim.png";
import teamImage from "../assets/media/img/algo_anarch_FF.png";
import NavbarBurger from "../components/NavbarBurger.jsx"; // burger-menu angeklatscht :)
import Navbar from "../components/Navbar.jsx";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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

  const teamMembers = [
    { name: "Lea", img: leaPixPortrait, scale: 1.5 },
    { name: "Stina", img: stinaPixPortrait, scale: 1 },
    { name: "Tim", img: timPixPortrait, scale: 1 },
    { name: "Benni", img: benniPixPortrait, scale: 1 },
    { name: "Steven", img: stevenPixPortrait, scale: 1.5 },
    { name: "Robert", img: robertPixPortrait, scale: 1 },
  ];

  return (
    <div className="body">
      <NavbarBurger />
      <Navbar />
      <h1 className="text-6xl text-center names m-5 pt-5 pb-2">Algorithmus Anarchisten</h1>
      <div className="h-3 bg-gradient-to-r from-customTertiary via-customSecondary to-customTertiary my-10"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <img
              className={`w-32 h-32 mx-auto rounded-full transform ${member.scale === 1.5 ? 'scale-150' : ''}`}
              src={member.img}
              alt={`ein pixeliger ${member.name}`}
            />
            <p className="names mt-2">{member.name}</p>
            <div className="flex justify-center space-x-4 mt-1">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-900">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-red-600 hover:text-red-900">
                <FaEnvelope size={20} />
              </a>
            </div>
              
      
        
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;

/*    team-image

                <div className="vignette mx-4">
          <img
            className="w-64 h-64 rounded-full"
            src={teamImage}
            alt="Algorithmus Anarchisten Logo"
          />
        </div>
*/