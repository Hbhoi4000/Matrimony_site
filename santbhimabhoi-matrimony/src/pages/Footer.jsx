import { Link } from "react-router-dom";
import { ABOUT_ROUTE, BRIDES_ROUTE, GROOMS_ROUTE, HOME_ROUTE, WIDOWS_ROUTE } from '../constants/routes';


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
          <Link to={HOME_ROUTE}>Home</Link>
          <Link to={ABOUT_ROUTE}>About</Link>
          <Link to={BRIDES_ROUTE}>Bride</Link>
          <Link to={GROOMS_ROUTE}>Groom</Link>
          <Link to={WIDOWS_ROUTE}>Widow</Link>
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
