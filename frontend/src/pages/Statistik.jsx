import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import banner from "../img/banner.png";

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

  const percentage = ((clicks / totalEntries) * 100).toFixed(2);
  return (
    <div className="user-stats p-6 bg-gray-800 text-white rounded-lg">
      <h1 className="text-3xl mb-4 pixel-font text-yellow-500">Hey {username}!</h1>
      <div className="data mb-4">Dein Timeout: <span>{timer / 1000}</span> Sekunden</div>
      <div className="data mb-2">Deine Stufe: <span>{tier}</span> von 4</div>
      <div className="data mb-2">Alle Pixel: <span>{totalEntries}</span></div>
      <div className="data mb-2">Anzahl deiner Pixel: <span>{clicks}</span></div>
      <div className="data mb-2">Dein Anteil am Ganzen:</div>
      <div className="w-full bg-gray-700 rounded-md h-6 mb-2">
        <div
          className="bg-customTertiary h-full rounded-md"
          style={{ width: `${percentage}%` }}
        >{percentage}%</div>
      </div>
      <div><img src={banner} alt="banner" className="rounded-md mt-4" /></div>
    </div>
  );
}

export default UserStats;
