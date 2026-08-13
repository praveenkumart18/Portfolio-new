import { motion } from "framer-motion";
import { FaArrowRight, FaDownload, FaPaperPlane } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { heroStats, roles, profile, socials } from "../../constants/portfolio";
import { useTypingText } from "../../hooks/useTypingText";
import MagneticButton from "../ui/MagneticButton";

const easeCustom = [0.25, 0.1, 0.25, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeCustom },
  },
};

const headingReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeCustom },
  },
};

function Hero() {
  const typedRole = useTypingText(roles);

  return (
    <section id="home" className="hero section-block">
      <div className="container">
        <motion.div
          className="hero-utility"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeCustom }}
        >
          <span className="status-pill">{profile.availability}</span>
          <span><FaLocationDot aria-hidden="true" /> {profile.location}</span>
        </motion.div>

        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span className="hero-overline" variants={itemUp}>
              Praveen Kumar T / Full-Stack Developer
            </motion.span>

            <motion.h1 variants={headingReveal}>
              I build <span>full-stack products</span> that make complex workflows feel simple.
            </motion.h1>

            <motion.p className="typing-line" variants={itemUp} aria-label={`Role: ${typedRole}`}>
              <small>Currently exploring</small>
              <span>{typedRole}</span>
              <i aria-hidden="true" />
            </motion.p>

            <motion.p className="hero-summary" variants={itemUp}>
              {profile.summary}
            </motion.p>

            <motion.div className="hero-stat-strip" variants={itemUp} aria-label="Portfolio quick facts">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>

            <motion.div className="hero-actions" variants={itemUp} aria-label="Primary actions">
              <MagneticButton distance={10}>
                <a className="button primary" href="#projects">
                  Explore my work <FaArrowRight aria-hidden="true" />
                </a>
              </MagneticButton>
              <MagneticButton distance={10}>
                <a className="button secondary" href={profile.resume} download="Praveen_Kumar_Resume.pdf">
                  Download Resume <FaDownload aria-hidden="true" />
                </a>
              </MagneticButton>
              <MagneticButton distance={10}>
                <a className="button ghost" href="#contact">
                  Hire Me <FaPaperPlane aria-hidden="true" />
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          <motion.aside
            className="identity-panel"
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: easeCustom }}
          >
            <div className="identity-heading">
              <span>Candidate profile</span>
              <strong>01 / 06</strong>
            </div>
            <div className="identity-photo">
              <img
                src={profile.avatar || "/pk.png"}
                alt={profile.name}
                loading="eager"
                onError={(e) => {
                  if (e.currentTarget.src.endsWith(".png")) {
                    e.currentTarget.src = "/pk.jpg";
                  }
                }}
              />
              <span>OPEN TO WORK</span>
            </div>
            <div className="identity-data">
              <div>
                <span>Primary stack</span>
                <strong>React / Node / MongoDB</strong>
              </div>
              <div>
                <span>Education</span>
                <strong>MCA / 2026</strong>
              </div>
              <div>
                <span>Focus</span>
                <strong>Product-minded engineering</strong>
              </div>
            </div>
            <div className="identity-socials">
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer">
                  <social.icon aria-hidden="true" />
                  {social.label}
                </a>
              ))}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

export default Hero;
