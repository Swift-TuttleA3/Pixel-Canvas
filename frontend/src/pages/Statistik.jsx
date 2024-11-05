import { useEffect, useRef } from 'react';
import '../styles/Statistik.scss';
import banner from '../img/banner.png';
import baum from '../img/baum.png';
import rankingfernseher from '../img/rankingfernseher.png';
import einhornbanner from '../img/einhornbanner.png';
import profilblau from '../img/profilblau.png';
import shop from '../img/shop.png';

function Statistik() {
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
 <img id='rankingfernseher' src= {rankingfernseher} alt="" />
  <div className='redDiv'>
   <h1 id='the'>THE</h1>
   <h1 id='best'>BEST</h1>
  </div>
  </div>
</header>
<main>
  <div className='eins'>
    <img id='banner' src={banner} alt="" />
    <div className="templang-image-box" id="templang">
      <span className="templang-image-text">Hier findest du die Rangliste der 10 besten Spieler, basierend auf ihren 
        herausragenden Leistungen und beeindruckenden Statistiken.</span>
    </div>
  </div>
  <div className='zwei'>
  <div className="tempranking-image-box" id="tempranking">
  <table className="custom-table">

  <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
      <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
      </tr>
     
    </table>
  </div>
  <img id='einhornbanner' src={einhornbanner} alt="" />
  </div>
  <div className="drei">
    <img id='shop' src={shop} alt="" />
    <div className='profil'>
      <h1 className='profil'>your profile</h1>
      <h2 className='at'>@User</h2>
      <img id='profilblau' src={profilblau} alt="" />
      <h1 id='place'>my place</h1>
      <table id='rankingtabelle'>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
      </table>
    </div>
    <img id='baum' src={baum} alt="" />
  </div>
</main>

   {/* Sterne-Ebenen */}
   <div id="stars" ref={el => starsRef.current.push(el)}></div>
    <div id="stars2" ref={el => stars2Ref.current.push(el)}></div>
    <div id="stars3" ref={el => stars3Ref.current.push(el)}></div>
  </div>

  )
}

export default Statistik;