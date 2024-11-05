import { useEffect, useState } from "react";
import Cookies from "js-cookie";

function UserStats() {
  const [username, setUsername] = useState("");
  const [clicks, setClicks] = useState(0);
  const [tier, setTier] = useState(1);
  const [timer, setTimer] = useState(10000);
  const [totalEntries, setTotalEntries] = useState(0);

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

  const percentage = totalEntries ? ((clicks / totalEntries) * 100).toFixed(2) : 0;

  return (
    <div className="user-stats">
      <h1>Hey {username}!</h1>
      <div>Alle Pixel: {totalEntries}</div>
      <div>Anzahl deiner Pixel: {clicks}</div>
      <div>Dein Anteil am Ganzen: {percentage}%</div>
      <div>Deine Stufe: {tier} von 4</div>
      <div>Dein Timeout: {timer}ms</div>
    </div>
  );
}

export default UserStats;