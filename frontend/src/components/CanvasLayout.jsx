import { Outlet } from "react-router-dom";
import "../styles/Canvas.scss";

function CanvasLayout() {
  return (
    <div className="canvas-layout overflow-hidden">
      <Outlet />
    </div>
  );
}

export default CanvasLayout;