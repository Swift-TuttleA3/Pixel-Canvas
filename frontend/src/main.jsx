import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./styles/Main.scss";
import "./styles/Login.scss";
import "./styles/Navbar.scss";
import "./styles/Canvas.scss";
import "./styles/ColorDropdown.scss";
import "./styles/Home.scss";
import "./styles/Statistik.scss";
import "./styles/DevDesk.scss";
import "./styles/Profile.scss";
import "./styles/Team.scss";
import "./styles/AGB.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
