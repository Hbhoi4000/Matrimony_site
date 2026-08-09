import { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { logout } from "../slice/loging";
import { fetchMyInterests } from "../slice/interestSlice";

import "./../css/navbar.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth || state.login || {});
  const { receivedInterests } = useSelector(
    (state) => state.interest || { receivedInterests: [] }
  );

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const displayName = user?.full_name?.split(" ")[0] || "Member";
  const displayPhoto = user?.image_url || "/images/profile.jpg";

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchMyInterests(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  function linkClass(path) {
    return location.pathname === path ? "active" : "";
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to={user ? "/home" : "/"} className="navbar-logo">
          <GiLotus className="logo-icon" />
          <span>
            Bhoi <em>Milan</em>
          </span>
        </Link>

        {/* Guest Nav & Member Actions */}
        <div className="navbar-actions">
          {user ? (
            <>
              <button className="icon-btn" aria-label="Messages">
                <FaEnvelope />
                <span className="badge">2</span>
              </button>

              <button className="icon-btn" aria-label="Notifications">
                <FaBell />
                <span className="badge">5</span>
              </button>

              <button
                className="icon-btn"
                aria-label="Interests"
                onClick={() => navigate("/my-interests")}
              >
                <FaHeart />
                {receivedInterests?.length > 0 && (
                  <span className="badge">{receivedInterests.length}</span>
                )}
              </button>

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
                    <Link to="/MyProfile" onClick={() => setProfileOpen(false)}>
                      My Profile
                    </Link>
                    <Link to="/my-interests" onClick={() => setProfileOpen(false)}>
                      My Interests
                    </Link>
                    <button
                      type="button"
                      className="dropdown-button"
                      onClick={() => {
                        dispatch(logout());
                        setProfileOpen(false);
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>

              <button
                className="hamburger"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </>
          ) : (
            <div className="navbar-guest-menu">
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>
              <Link to="/login" className="btn-nav-outline">
                Login
              </Link>
              <Link to="/register" className="btn-nav-filled">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Logged-In Sub Menu */}
      {user && (
        <div className={mobileOpen ? "navbar-links navbar-links-open" : "navbar-links"}>
          <Link to="/home" className={linkClass("/home")}>
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
      )}
    </nav>
  );
}