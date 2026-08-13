import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <motion.span style={{ opacity, display: "inline-block", marginRight: "0.28em" }}>
      {children}
    </motion.span>
  );
}

export default function ScrollWordReveal({ text, className = "", as = "p" }) {
  const containerRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "end 50%"],
  });

  const words = text.split(" ");
  const Component = motion[as] || motion.p;

  if (shouldReduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + 1 / words.length);
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </Component>
  );
}
