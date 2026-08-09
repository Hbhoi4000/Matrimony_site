import { Link } from "react-router-dom";
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaHeart, 
  FaShieldAlt, 
  FaUserCheck, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaYoutube 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top-trust">
        <div className="trust-item">
          <FaShieldAlt className="trust-icon" />
          <div>
            <strong>100% Verified Profiles</strong>
            <span>Manual screening for authentic profiles</span>
          </div>
        </div>
        <div className="trust-item">
          <FaUserCheck className="trust-icon" />
          <div>
            <strong>Privacy Protection</strong>
            <span>Control who views your photos & details</span>
          </div>
        </div>
        <div className="trust-item">
          <FaHeart className="trust-icon" />
          <div>
            <strong>Trusted Matrimony</strong>
            <span>Helping families unite with sacred trust</span>
          </div>
        </div>
      </div>

      <div className="footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <h3 className="footer-brand">Sant Bhima Bhoi Matrimony</h3>
          <p className="brand-description">
            A dedicated community matrimony platform helping individuals find suitable life partners within the Sant Bhima Bhoi community with trust and simplicity.
          </p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://whatsapp.com" target="_blank" rel="noreferrer" aria-label="WhatsApp"><FaWhatsapp /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/register">Create Profile</Link></li>
            <li><Link to="/login">Member Login</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories / Profiles */}
        <div className="footer-col">
          <h4>Find Profiles</h4>
          <ul className="footer-links">
            <li><Link to="/bride">Brides</Link></li>
            <li><Link to="/groom">Grooms</Link></li>
            <li><Link to="/widow">Remarriage / Widow</Link></li>
            <li><Link to="/search">Advanced Search</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-col contact-col">
          <h4>Get in Touch</h4>
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <div>
              <span>Helpline / WhatsApp</span>
              <a href="tel:+919000000000">+91 90000 00000</a>
            </div>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <div>
              <span>Support Email</span>
              <a href="mailto:support@sbbmatrimony.org">support@sbbmatrimony.org</a>
            </div>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <div>
              <span>Location</span>
              <p>Odisha, India</p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Sant Bhima Bhoi Community Matrimony. All rights reserved.</p>
        <div className="legal-links">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms & Conditions</Link>
          <span>•</span>
          <Link to="/help">Help & FAQ</Link>
        </div>
      </div>
    </footer>
  );
}