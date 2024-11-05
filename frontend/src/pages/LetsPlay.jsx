import { useEffect, useRef } from 'react';
import "../styles/LetsPlay.scss"; // Dein CSS
import Music from '../img/Music.png';
import CanvaBild from '../img/canva.png';
import Ranking from '../img/ranking.png';
import Movie from '../img/movie.png';

function LetsPlay () {
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
    title.style.position = 'relative';
    title.style.zIndex = '10';
    catchphrase.style.position = 'relative';
    catchphrase.style.zIndex = '10';
  }

  const layers = [
    { elements: starsRef.current, movementFactor: 0.05 },
    { elements: stars2Ref.current, movementFactor: 0.1 },
    { elements: stars3Ref.current, movementFactor: 0.15 }
  ];

  const handleMouseMove = (e) => {
    let clientX, clientY; 
   if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
  
    layers.forEach(layer => {
      layer.elements.forEach(star => {
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

  // const handleMouseMove = (e) => {
  //   console.log("test")
  //   layers.forEach(layer => {
  //     layer.elements.forEach(star => {
  //       const rect = star.getBoundingClientRect();
  //       const starX = rect.left + rect.width / 2;
  //       const starY = rect.top + rect.height / 2;

  //       const deltaX = e.clientX - starX;
  //       const deltaY = e.clientY - starY;

  //       const newX = deltaX * layer.movementFactor;
  //       const newY = deltaY * layer.movementFactor;

  //       star.style.transform = `translate(${newX}px, ${newY}px)`;
  //     });
  //   });
  // };

  document.addEventListener('mousemove', handleMouseMove);

  document.addEventListener('touchmove', handleMouseMove);



  return () => {
    document.removeEventListener('mousemove', handleMouseMove);

    document.addEventListener('touchmove', handleMouseMove);
  };
}, []);

return (
  <div className='body'>
    <header>
      <nav>
        <ul>
          <li><a href="#">HOME</a></li>
          <li><a href="#">CANVA</a></li>
          <li><a href="#">TEAM</a></li>
          <li><a href="#">RANKING</a></li>
          <li><a href="#">AGB</a></li>
        </ul>
      </nav>
      <div className='headerWrapper'>
     <img id='musicBild' src= {Music} alt="" />
      <div className='redDiv'>
       <h1 id='lets'>LETS</h1>
       <h1 id='play'>PLAY</h1>
      </div>
      </div>
    </header>
    <main>
    <div className='canvaBild'>
        <img id='canva' src= {CanvaBild} alt="" />
      </div>
      <div className='bilderDiv'>
  <img id='rankingBild' src= {Ranking} alt="" />
  <img id='movieBild' src= {Movie} alt="" />
      </div>
<div className='counterDiv'>
  <h1 id='playercounter'>PLAYER COUNTER</h1>
<table>
    <tr>
      <td>1</td>
      <td>2</td>
      <td>3</td>
      <td>4</td>
      <td>5</td>
    </tr>
  </table>
</div>
    </main>

    {/* Sterne-Ebenen */}
    <div id="stars" ref={el => starsRef.current.push(el)}></div>
    <div id="stars2" ref={el => stars2Ref.current.push(el)}></div>
    <div id="stars3" ref={el => stars3Ref.current.push(el)}></div>
  </div>
)

}

export default LetsPlay
