import { useState, useEffect, useRef } from 'react';
import '../styles/Login.scss';
import loginbild from '../img/loginbild.png';
import einhorn from '../img/einhorn.png';
import hund from '../img/Hund.png';
import kopfhörer from '../img/kopfhörer.png';
import teams from '../data/teams';
import { register, login, loginWithGoogle } from '../services/api.js';
import NavbarHome from '../components/NavbarHome.jsx';

function LoginPage() {
  // Use States 
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [message, setMessage] = useState(null);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, team);
      setMessage({ type: "success", text: "Registrierung erfolgreich!" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token); 
      setMessage({ type: 'success', text: "Erfolgreicher Login!" });
      window.location.href = "/canvas";
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

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
      document.removeEventListener('touchmove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <header>
        
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </header>
      <NavbarHome />
      {/* <!--Login Page--> */}
      <main>
        {/* <!--Login Bereich--> */}
        <div className='login-container'>
        <div className="login-box">
          <div className="login-formula">
            <h1>{isSignup ? "User Signup" : "User Login"}</h1>
            {message && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
            <form onSubmit={isSignup ? handleSignupSubmit : handleLoginSubmit}>
              {isSignup && (
                <>
                  <label htmlFor="username"></label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  /><br /><br />
                  <select
                    name="team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select your Class
                    </option>
                    {Object.keys(teams).map((key) => (
                      <option key={key} value={key}>
                        {teams[key]}
                      </option>
                    ))}
                  </select>
                </>
              )}
              <label htmlFor="email"></label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              /><br /><br />

              <label htmlFor="password"></label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /><br /><br />

              <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
              <p>
                {isSignup 
                  ? "Already have an account? " 
                  : "Don't have an account? "}
                <a 
                  className="sign-up" 
                  href="#" 
                  onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? "Login" : "Sign Up"}
                </a>
              </p>
              <a className="forget-password" href="">Forget Password?</a>
            </form>
          </div>

          <img
            src={loginbild}
            alt="Zwei Pixelbilder"
            className="login-bild"
          />
        </div>

        {/* <!--Pixel Wars Info--> */}
        <div className="box1">
          <h2 className="h2-pixel-headline">PIXEL WARS</h2>
          <p className="box-info">
            Dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat
            auch keine relevanz, und deswegen ist das egal. er dient lediglich als
            platzhalter. um mal zu zeigen, wie diese stelle der seite aussieht
          </p>
          <div className="img-boxen">
            <div className="img-box">
              <img className="box1-img"
                src={hund}
                alt="Pixelbild eines Hundes"
              />
              <h3>PLAYFUL</h3>
              <p>
                Dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat
                auch keine relevanz, und deswegen ist das egal.
              </p>
            </div>

            <div className="img-box">
              <img className="box1-img"
                src={kopfhörer}
                alt="Pixelbild von Kopfhörern"
              />
              <h3>RELAXED</h3>
              <p>
                Dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat
                auch keine relevanz, und deswegen ist das egal.
              </p>
            </div>

            <div className="img-box">
              <img className="box1-img"
                src={einhorn}
                alt="Pixelbild eines Einhorns"
              />
              <h3>CREATIVE</h3>
              <p>
                Dieser text hat eigentlich gar keinen wirklichen inhalt. aber er hat
                auch keine relevanz, und deswegen ist das egal.
              </p>
            </div>
          </div>
        </div>

        {/* <!--2 Info-->
        <div className="info-box">
          <h2>Let the Pixels Fly</h2>
          <p>
            Du hast die Möglichkeit, auf einer Fläche mit vielen anderen zu interagieren.
            Bei uns hast du die Chance, die Pixel zu setzen und damit die Chance,
            bei der ersten Pixel-Wars Runde dabei zu sein!
          </p>
        </div> */}
      </div	>
      </main>
    </>
  );
}

export default LoginPage;