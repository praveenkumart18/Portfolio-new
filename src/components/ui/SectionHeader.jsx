import { motion } from "framer-motion";

const headerReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.25, 0.1, 0.25, 1] },
  },
};

function SectionHeader({ number, eyebrow, title, description }) {
  return (
    <motion.div
      className="section-header"
      variants={headerReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="section-label">
        <span>{number}</span>
        <strong>{eyebrow}</strong>
      </div>
      <h2>{title}</h2>
      {description ? <p>{description}</p> : null}
    </motion.div>
  );
}

export default SectionHeader;
