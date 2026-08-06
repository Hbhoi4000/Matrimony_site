import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaHome,
  FaSearch,
  FaHeart,
  FaBell,
  FaEnvelope,
  FaChevronDown,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { GiLotus } from "react-icons/gi";
import { logout } from "../slice/Registration";

import "./../css/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.registration);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const displayName = user?.full_name?.split(" ")[0] || "Member";
  const displayPhoto = user?.image_url || "/images/profile.jpg";

  // Close the profile dropdown when clicking outside it
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu whenever the page changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Helper: adds "active" class if this link matches current page
  function linkClass(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">
      {/* Top row: logo + icons + profile */}
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          <GiLotus className="logo-icon" />
          <span>
            Bhoi <em>Milan</em>
          </span>
        </Link>

        <div className="navbar-actions">
          <button className="icon-btn" aria-label="Messages">
            <FaEnvelope />
            <span className="badge">2</span>
          </button>

          <button className="icon-btn" aria-label="Notifications">
            <FaBell />
            <span className="badge">5</span>
          </button>

          <button className="icon-btn" aria-label="Interests">
            <FaHeart />
            <span className="badge">12</span>
          </button>

          {!user ? (
            <div className="navbar-auth">
              <Link to="/login" className="btn-nav-outline">
                Login
              </Link>
              <Link to="/register" className="btn-nav-filled">
                Register
              </Link>
            </div>
          ) : (
            <div className="profile" ref={profileRef}>
              <button
                className="profile-trigger"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={displayPhoto}
                  alt="Profile"
                  className="profile-img"
                />
                <span className="profile-name">{displayName}</span>
                <FaChevronDown
                  className={profileOpen ? "chevron chevron-up" : "chevron"}
                />
              </button>

              {profileOpen && (
                <div className="profile-dropdown">
                  <Link to="/profile">My Profile</Link>
                  <button
                    type="button"
                    className="dropdown-button"
                    onClick={() => {
                      dispatch(logout());
                      setProfileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className="hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Bottom row: page links */}
      <div className={mobileOpen ? "navbar-links navbar-links-open" : "navbar-links"}>
        <Link to="/" className={linkClass("/")}>
          <FaHome /> Home
        </Link>
        <Link to="/search" className={linkClass("/search")}>
          <FaSearch /> Search
        </Link>
        <Link to="/bride" className={linkClass("/bride")}>
          Bride
        </Link>
        <Link to="/groom" className={linkClass("/groom")}>
          Groom
        </Link>
        <Link to="/widow" className={linkClass("/widow")}>
          Widow
        </Link>
        <Link to="/about" className={linkClass("/about")}>
          About
        </Link>
        <Link to="/contact" className={linkClass("/contact")}>
          Contact
        </Link>
      </div>
    </nav>
  );
}

// import { Link } from 'react-router-dom'
// import { GiLotus } from "react-icons/gi";
// import '../css/navbar.css'
// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="navbar-top">
//         <Link to="/" className="navbar-logo">
//           <GiLotus className="logo-icon" />
//           <span>
//             Bhoi <em>Milan</em>
//           </span>
//         </Link>

//         <div className="navbar-auth">
//           <Link to="/login" className="btn-nav-outline">Login</Link>
//           <Link to="/register" className="btn-nav-filled">Register</Link>
//         </div>
//       </div>

//       <div className="navbar-links">
//         <Link to="/">Home</Link>
//         <Link to="/bride">Bride</Link>
//         <Link to="/groom">Groom</Link>
//         <Link to="/widow">Widow</Link>
//         <Link to="/about">About</Link>
//         <Link to="/contact">Contact</Link>
//       </div>
//     </nav>
//   );
// }