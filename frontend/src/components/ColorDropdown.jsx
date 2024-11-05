import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import colors from "../utilities/colors";
import "../styles/ColorDropdown.scss";
import Cookies from "js-cookie";

const ColorDropdown = ({ position, onSelectColor }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("token_js");
    Cookies.remove("username");
    navigate("/login");
  };

  return (
    <div
      className="color-dropdown"
      style={{ top: position.y, left: position.x }}
    >
      <div className="color-options">
        {colors.map((color, index) => (
          <div
            key={index}
            className="color-option"
            style={{ backgroundColor: color }}
            onClick={() => onSelectColor(color)}
          />
        ))}
      </div>
      <hr className="dropdown-divider" />
      <nav className="dropdown-nav">
        <ul>
          <li onClick={() => navigate("/")}>Home</li>
          <li onClick={() => navigate("/profile")}>Profile</li>
          <li onClick={() => navigate("/statistik")}>Statistik</li>
          <li onClick={() => navigate("/devdesk")}>DevDesk</li>
          <li onClick={() => navigate("/team")}>Team</li>
          <li onClick={() => navigate("/agb")}>AGB</li>
        </ul>
      </nav>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

ColorDropdown.propTypes = {
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  onSelectColor: PropTypes.func.isRequired,
};

export default ColorDropdown;