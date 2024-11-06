
import { NavLink } from 'react-router-dom'

function NavbarLogin() {
  return (
    <nav id="navbar" className="hidden md:block">
      <ul className="flex space-x-4">
        <li>
          <NavLink to="/" className="hover:text-customTertiary">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/team" className="hover:text-customTertiary">
            Team
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavbarLogin