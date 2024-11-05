import { useEffect, useRef } from 'react';
import '../styles/AGB.scss';





function AGB() {
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
    <div className="headerDiv">
      <div className="whiteDiv">
        <h1 id="title" ref={titleRef}>DCI</h1>
        <p id="catchphrase" ref={catchphraseRef}>DIGITAL CAREER INSTITUTE</p>
      </div>
      <div className="redDiv">
        <h1 id="DIE">DIE</h1>
        <h1 id="AGB">AGB</h1>
      </div>
    </div>
</header>
<main>
  <div className='Allgemein'>
    <h1 className='allgemein'>ALLGEMEINE GESCHÄFTSBEDINGUNGEN</h1>
    <h2 className='fuer'>FÜR PIXELWARS</h2>
  </div>
  <div className='bedingungen'>
    <h1 className='ueberschrifteins'>1. Allgemeine Bestimmungen</h1>
    <p className='text'>1.1. Diese Allgemeinen Geschäftsbedingungen (AGB) regeln die Nutzung des Spiels PixelWars (im Folgenden „Spiel“), das von [Ihr Unternehmen] entwickelt und bereitgestellt wird. <br /><br />

1.2. Mit der Registrierung und Nutzung des Spiels akzeptiert der Nutzer die nachfolgenden AGB. Sollte der Nutzer mit den AGB nicht einverstanden sein, ist ihm die Nutzung des Spiels untersagt.<br /><br />

1.3. [Ihr Unternehmen] behält sich das Recht vor, die AGB jederzeit zu ändern. Änderungen werden dem Nutzer im Spiel und/oder per E-Mail bekanntgegeben. Fortgesetzte Nutzung des Spiels gilt als Zustimmung zu den Änderungen.
</p>
    <h1 className='ueberschriftzwei'>2. Teilnahmeberechtigung</h1>
    <p className='text'>2.1. Die Nutzung des Spiels ist nur Personen gestattet, die das Mindestalter von [Mindestalter, z. B. 13 oder 16 Jahren] erreicht haben. Bei Minderjährigen ist die Zustimmung eines Erziehungsberechtigten erforderlich.<br /><br />

2.2. Nutzer müssen bei der Registrierung wahrheitsgemäße Angaben machen und sind verpflichtet, ihr Konto und ihre Zugangsdaten sicher zu verwahren.
</p>
<h1 className='ueberschrifteins'>3. Spielbeschreibung und Nutzungsrechte</h1>
    <p className='text'>3.1. PixelWars ist ein interaktives, gemeinschaftsbasiertes Online-Spiel, bei dem Nutzer auf einer gemeinsamen Pixeloberfläche (Canvas) einzelne Pixel platzieren können, um gemeinsam Bilder oder Muster zu gestalten.<br /><br />

3.2. Durch die Teilnahme am Spiel erhält der Nutzer das zeitlich begrenzte, nicht exklusive, widerrufbare und nicht übertragbare Recht, das Spiel zu nutzen.<br /><br />

3.3. Jegliche im Spiel erstellten Inhalte sind Eigentum von [Ihr Unternehmen]. Die Spieler räumen [Ihr Unternehmen] ein unwiderrufliches, zeitlich und räumlich unbegrenztes Nutzungsrecht an allen erstellten Inhalten ein.
</p>
<h1 className='ueberschriftzwei'>4. Verhaltensregeln</h1>
    <p className='text'>4.1. Jeder Nutzer ist verpflichtet, sich respektvoll gegenüber anderen Spielern zu verhalten und die Spielregeln einzuhalten.<br /><br />

4.2. Das Platzieren von anstößigen, rassistischen, diskriminierenden, gewaltverherrlichenden oder urheberrechtlich geschützten Inhalten ist verboten. Bei Verstößen behält sich [Ihr Unternehmen] das Recht vor, den Nutzer zu sperren oder Inhalte zu entfernen.<br /><br />

4.3. Jegliche Art der Manipulation, insbesondere durch die Verwendung von Bots, Scripten oder anderen automatisierten Verfahren zur Platzierung von Pixeln, ist untersagt.
</p>
<h1 className='ueberschrifteins'>5. Premium-Dienste und In-Game-Käufe</h1>
    <p className='text'>5.1. [Ihr Unternehmen] bietet möglicherweise Premium-Dienste oder In-Game-Käufe an, die den Nutzern zusätzliche Funktionen oder Vorteile im Spiel bieten.<br /><br />

5.2. Käufe im Spiel sind endgültig und nicht erstattungsfähig, es sei denn, gesetzliche Vorschriften verlangen dies.<br /><br />

5.3. Premium-Dienste und Käufe sind ausschließlich für den persönlichen Gebrauch des Nutzers bestimmt und dürfen nicht an Dritte weitergegeben oder verkauft werden.
</p>
<h1 className='ueberschriftzwei'>6. Haftung und Gewährleistung</h1>
    <p className='text'>6.1. [Ihr Unternehmen] haftet nur für Schäden, die durch vorsätzliches oder grob fahrlässiges Verhalten verursacht wurden.<br /><br />

6.2. [Ihr Unternehmen] übernimmt keine Haftung für Schäden, die aus einer unsachgemäßen Nutzung des Spiels oder der Nichtverfügbarkeit des Spiels entstehen.<br /><br />

6.3. Das Spiel wird „wie besehen“ zur Verfügung gestellt. [Ihr Unternehmen] übernimmt keine Gewährleistung für die permanente Erreichbarkeit oder Fehlerfreiheit des Spiels.
</p>
<h1 className='ueberschrifteins'>7. Datenschutz</h1>
    <p className='text'>7.1. Die Nutzung des Spiels erfordert die Erhebung, Verarbeitung und Speicherung personenbezogener Daten. Die Datenschutzbestimmungen finden sich unter [Link zur Datenschutzerklärung].<br /><br />

7.2. [Ihr Unternehmen] verpflichtet sich, die Daten der Nutzer vertraulich zu behandeln und ausschließlich im Rahmen der gesetzlichen Bestimmungen zu verwenden.
</p>
<h1 className='ueberschriftzwei'>8. Laufzeit und Kündigung</h1>
    <p className='text'>8.1. Diese Vereinbarung wird auf unbestimmte Zeit geschlossen und kann von beiden Seiten jederzeit beendet werden.<br /><br />

8.2. [Ihr Unternehmen] behält sich das Recht vor, das Konto eines Nutzers ohne Vorankündigung zu sperren oder zu löschen, wenn dieser gegen die AGB verstößt.
</p>

 <h1 className='ueberschrifteins'>9. Schlussbestimmungen</h1>
    <p className='text'>7.1. Die Nutzung des Spiels erfordert die Erhebung, Verarbeitung und Speicherung personenbezogener Daten. Die Datenschutzbestimmungen finden sich unter [Link zur Datenschutzerklärung].<br /><br />

7.2. [Ihr Unternehmen] verpflichtet sich, die Daten der Nutzer vertraulich zu behandeln und ausschließlich im Rahmen der gesetzlichen Bestimmungen zu verwenden. 
</p>
</div>
</main>


   {/* Sterne-Ebenen */}
   <div id="stars" ref={el => starsRef.current.push(el)}></div>
    <div id="stars2" ref={el => stars2Ref.current.push(el)}></div>
    <div id="stars3" ref={el => stars3Ref.current.push(el)}></div>
  </div>

  )
}

export default AGB
