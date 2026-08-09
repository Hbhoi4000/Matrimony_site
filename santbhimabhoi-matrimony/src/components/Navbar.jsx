import { Link } from 'react-router-dom'
import { GiLotus } from "react-icons/gi";
import '../css/navbar.css'
import { ABOUT_ROUTE, BRIDES_ROUTE, CONTACT_ROUTE, GROOMS_ROUTE, HOME_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, WIDOWS_ROUTE } from '../constants/routes'
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to={HOME_ROUTE} className="navbar-logo">
          <GiLotus className="logo-icon" />
          <span>
            Bhoi <em>Milan</em>
          </span>
        </Link>

        <div className="navbar-auth">
          <Link to={LOGIN_ROUTE} className="btn-nav-outline">Login</Link>
          <Link to={REGISTER_ROUTE} className="btn-nav-filled">Register</Link>
        </div>
      </div>

      <div className="navbar-links">
        <Link to={HOME_ROUTE}>Home</Link>
        <Link to={BRIDES_ROUTE}>Bride</Link>
        <Link to={GROOMS_ROUTE}>Groom</Link>
        <Link to={WIDOWS_ROUTE}>Widow</Link>
        <Link to={ABOUT_ROUTE}>About</Link>
        <Link to={CONTACT_ROUTE}>Contact</Link>
      </div>
    </nav>
  );
}
