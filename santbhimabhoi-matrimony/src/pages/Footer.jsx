import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h4>Sant Bhima Bhoi Matrimony</h4>
          <p>A trusted matrimony platform serving the Sant Bhima Bhoi community.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/bride">Bride</Link>
          <Link to="/groom">Groom</Link>
          <Link to="/widow">Widow</Link>
        </div>
        <div>
          <h4>Contact</h4>
          <p>support@sbbmatrimony.org</p>
          <p>+91 90000 00000</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Sant Bhima Bhoi Community Matrimony. All rights reserved.
      </div>
    </footer>
  );
}
