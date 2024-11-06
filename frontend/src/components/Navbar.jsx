import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav id="navbar" className="hidden md:block">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="hover:text-customTertiary">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className="hover:text-customTertiary">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className="hover:text-customTertiary">
            Profile
          </NavLink>
        </li>
        <li>
          <NavLink to="/canvas" className="hover:text-customTertiary">
            Canvas
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className="hover:text-customTertiary">
            Team
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistik" className="hover:text-customTertiary">
            Statistik
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;