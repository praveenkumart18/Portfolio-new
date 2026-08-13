import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { navItems } from "../../constants/portfolio";
import { useActiveSection } from "../../hooks/useActiveSection";
import MagneticButton from "../ui/MagneticButton";

function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sectionIds = useMemo(() => navItems.map((item) => item.href.replace("#", "")), []);
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavigate = () => setOpen(false);

  return (
    <motion.header
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <nav className="nav-shell" aria-label="Primary navigation">
        <a className="brand" href="#home" onClick={handleNavigate} aria-label="Go to home">
          <span>PK</span>
          <strong>Praveen Kumar</strong>
        </a>

        <div className={`nav-links ${open ? "is-open" : ""}`}>
          {navItems.map((item) => {
            const id = item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === id ? "active" : ""}
                onClick={handleNavigate}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        <div className="nav-actions">
          <MagneticButton distance={8}>
            <button
              className="icon-button"
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
            </button>
          </MagneticButton>
          <button
            className="icon-button menu-button"
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <HiX aria-hidden="true" /> : <HiMenuAlt3 aria-hidden="true" />}
          </button>
        </div>
      </nav>
    </motion.header>
  );
}

export default Navbar;
