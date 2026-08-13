import { FaHeart } from "react-icons/fa";
import { navItems, profile, socials } from "../../constants/portfolio";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand footer-brand" href="#home">
            <span>PK</span>
            <strong>Praveen Kumar</strong>
          </a>
          <p>
            Full-stack developer focused on practical MERN applications, clean interfaces,
            and dependable backend workflows.
          </p>
        </div>

        <div>
          <h3>Navigate</h3>
          <div className="footer-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3>Connect</h3>
          <div className="footer-links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span className="built-line">
          Built with React, Vite, Framer Motion <FaHeart aria-hidden="true" />
        </span>
      </div>
    </footer>
  );
}

export default Footer;
