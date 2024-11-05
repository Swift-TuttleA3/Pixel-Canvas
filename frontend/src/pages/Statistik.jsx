import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import banner from "../img/banner.png";
import { Link } from "react-router-dom";
function UserStats() {
  const [username, setUsername] = useState("");
  const [clicks, setClicks] = useState(0);
  const [tier, setTier] = useState(1);
  const [timer, setTimer] = useState(10000);
  const  [totalEntries, setTotalEntries] = useState(0);
  useEffect(() => {
    const fetchUserStats = async () => {
      const token = Cookies.get("token_js");
      if (!token) {
        console.error("Kein Token im lokalen Speicher gefunden.");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/api/user-stats", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Benutzerdaten");
        }
        const data = await response.json();
        setUsername(data.username);
        setClicks(data.clicks);
        setTier(data.tier);
        setTimer(data.timer);
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten:", error);
      }
    };
    const fetchTotalEntries = async () => {
      try {
        const token = Cookies.get("token_js");
        const response = await fetch("http://localhost:5000/api/canvas/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Fehler beim Abrufen der Gesamteinträge");
        }
        const data = await response.json();
        setTotalEntries(data.totalEntries);
      } catch (error) {
        console.error("Fehler beim Abrufen der Gesamteinträge:", error);
      }
    };
    fetchUserStats();
    fetchTotalEntries();
  }, []);

  return (
    <div className="user-stats">
      <h1>Hey {username}!</h1>
      <div className="data">Alle Pixel: <span>{totalEntries}</span></div>
      <div className="data">Anzahl deiner Pixel: <span>{clicks}</span></div>
      {/* <div>Dein Anteil am Ganzen: {percentage}%</div> */}
      <div className="data">Deine Stufe: <span>{tier}</span> von 4</div>
      <div className="data">Dein Timeout: <span>{timer}</span>ms</div>
      <div><img src={banner} alt="banner" /></div>
    </div>
  );
}

export default UserStats;