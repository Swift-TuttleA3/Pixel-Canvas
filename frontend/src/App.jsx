import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import CanvasLayout from "./components/CanvasLayout.jsx";
import Canvas from "./pages/Canvas.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Statistik from "./pages/Statistik.jsx";
import Profile from "./pages/Profile.jsx";
import DevDesk from "./pages/DevDesk.jsx";
import Team from "./pages/Team.jsx";
import AGB from "./pages/AGB.jsx";
import Pagenotfound from "./components/Pagenotfound.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/statistik"
          element={
            <PrivateRoute>
              <Statistik />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/devdesk"
          element={
            <PrivateRoute>
              <DevDesk />
            </PrivateRoute>
          }
        />
        <Route path="/team" element={<Team />} />
        <Route path="/agb" element={<AGB />} />
        <Route path="*" element={<Pagenotfound />} />
      </Route>
      <Route path="/canvas" element={<CanvasLayout />}>
        <Route index element={<Canvas />} />
      </Route>
    </Routes>
  );
}

export default App;