import { useState, useEffect, useCallback } from "react";
import { getProfile, editProfile, changePassword } from "../services/api.js";
import Cookies from "js-cookie";
import NavbarBurger from "../components/NavbarBurger.jsx";
import Navbar from "../components/Navbar.jsx";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [team, setTeam] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  // Error Nachricht nach 5 Sekunden ausblenden
  useEffect(() => {
    const timer = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(timer);
  }, [message]);

  // Die Profildaten beim Laden aufrufen
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
        setUsername(data.username);
        setEmail(data.email);
        setTeam(data.team);
      } catch (err) {
        setMessage({ type: "error", text: "Fehler beim Laden des Profils" });
      }
    };
    fetchProfile();
  }, []);

  // Handle profile edit
  const handleEditProfile = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        if (!username || !email || !team) {
          setMessage({ type: "error", text: "Bitte alle Felder ausfüllen" });
          return;
        }

        await editProfile(username, email, team); // Update profile via API
        setProfile({ ...profile, username, email, team });
        setEditing(false);
        setMessage({
          type: "success",
          text: "Profil erfolgreich aktualisiert!",
        });
      } catch (err) {
        setMessage({
          type: "error",
          text: "Profilaktualisierung fehlgeschlagen",
        });
      }
    },
    [username, email, team, profile]
  );

  // Handle password change
  const handleChangePassword = useCallback(
    async (e) => {
      e.preventDefault();
      if (!oldPassword || !newPassword) {
        setMessage({
          type: "error",
          text: "Beide Passwortfelder müssen ausgefüllt werden",
        });
        return;
      }

      try {
        await changePassword(oldPassword, newPassword); // Change password via API
        setOldPassword("");
        setNewPassword("");
        setMessage({ type: "success", text: "Passwort erfolgreich geändert!" });
      } catch (err) {
        setMessage({ type: "error", text: "Passwortänderung fehlgeschlagen" });
      }
    },
    [oldPassword, newPassword]
  );

  // Logout
  const handleLogout = useCallback(() => {
    Cookies.remove("token_js"); // Remove the token cookie
    window.location.href = "/login"; // Redirect to login
  }, []);

  return (
    <div id="profile-container">
      <NavbarBurger />
      <Navbar />
    <div className="p-6 bg-customSecondary text-white rounded-lg">  
      {message && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      {profile ? (
        <div className="profile-content">
          <h1 className="text-3xl mb-4 pixel-font text-customBeige">Profil</h1>
          <button
            className="bg-customTertiary text-white px-4 py-2 rounded mb-4"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? "Abbrechen" : "Bearbeiten"}
          </button>
          {editing ? (
            <form onSubmit={handleEditProfile} className="space-y-4">
              <input
                type="text"
                placeholder="Benutzername"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
              <select
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
              >
                <option value="" disabled hidden>
                  Team auswählen
                </option>
                {/* Beispielteams */}
                <option value="team1">Team 1</option>
                <option value="team2">Team 2</option>
                <option value="team3">Team 3</option>
              </select>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Profil speichern
              </button>
            </form>
          ) : (
            <div className="space-y-2">
              <p>
                <strong>Benutzername:</strong> {profile.username}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Team:</strong> {profile.team}
              </p>
            </div>
          )}

          <h2 className="text-2xl mt-6 mb-4 pixel-font text-customYellow">
            Passwort ändern
          </h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <input
              type="password"
              placeholder="Altes Passwort"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <input
              type="password"
              placeholder="Neues Passwort"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="bg-customTertiary text-white px-4 py-2 rounded"
            >
              Passwort ändern
            </button>
          </form>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-6"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>Profil wird geladen...</div>
      )}
      </div>
      </div>
  );
};

export default ProfilePage;