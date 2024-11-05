import { useState } from "react";
import teams from "../data/teams";
import { register, login, loginWithGoogle } from "../services/api.js";
import Cookies from "js-cookie"; // Import js-cookie

// Login und Signup 

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [team, setTeam] = useState("");
  const [message, setMessage] = useState(null);

  const handleCheckboxChange = () => {
    setIsSignup(!isSignup);
  };

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
    const token = data.credentials; // Token aus dem Header extrahieren
    Cookies.set('token', token, { path: '/' }); // Token im Cookie speichern
    
    const localSavedToken = Cookies.get('token'); // Token aus dem Cookie lesen
    console.log('Gespeicherter Token:', localSavedToken); // Token im Browser anzeigen
    
    setMessage({ type: 'success', text: "Erfolgreicher Login!" });
    window.location.href = "/canvas"; // Weiterleitung zur Profilseite
  } catch (err) {
    setMessage({ type: 'error', text: err.message });
  }
  };
  

  return (
    <div className="loginwrap">
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <div className="formwrap">
        <input
          type="checkbox"
          id="chk"
          aria-hidden="true"
          checked={isSignup}
          onChange={handleCheckboxChange}
        />

        <div className={`signup ${isSignup ? "active" : ""}`}>
          <form onSubmit={handleSignupSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              name="txt"
              placeholder="User name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
            <button type="submit">Sign up</button>
          </form>
        </div>

        <div className={`login ${!isSignup ? "active" : ""}`}>
          <form onSubmit={handleLoginSubmit}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
            <button type="button" onClick={loginWithGoogle}>Login with Google</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;