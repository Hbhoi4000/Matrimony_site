import { Link } from 'react-router-dom'
import { GiLotus } from "react-icons/gi";
import '../css/navbar.css'
export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <GiLotus className="logo-icon" />
          <span>
            Bhoi <em>Milan</em>
          </span>
        </Link>

        <div className="navbar-auth">
          <Link to="/login" className="btn-nav-outline">Login</Link>
          <Link to="/register" className="btn-nav-filled">Register</Link>
        </div>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/bride">Bride</Link>
        <Link to="/groom">Groom</Link>
        <Link to="/widow">Widow</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
}