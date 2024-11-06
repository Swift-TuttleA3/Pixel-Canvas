import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavbarHome() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-4 right-4 z-50">
      <div>
        <button
          className="bg-gray-400 text-white p-2 rounded-lg focus:outline-none md:hidden"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } bg-customQuintiary text-white rounded-lg absolute right-0 mt-2 py-2 w-48 md:hidden`}
      >
        <ul className="flex flex-col items-start p-2 space-y-2">
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
          <li>
            <NavLink to="/devdesk" className="hover:text-customTertiary">
              DevDesk
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarHome;
