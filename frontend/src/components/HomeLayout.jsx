import { Outlet } from "react-router-dom";
import "../styles/Home.scss";

function HomeLayout() {
  return (
    <div className="home-layout">
      <Outlet />
    </div>
  );
}

export default HomeLayout;