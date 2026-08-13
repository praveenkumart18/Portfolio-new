import { motion, useScroll, useSpring } from "framer-motion";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div className="scroll-progress" aria-hidden="true">
      <motion.span style={{ scaleX, transformOrigin: "0%" }} />
    </div>
  );
}

export default ScrollProgress;
