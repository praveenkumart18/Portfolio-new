import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, AnimatePresence } from "framer-motion";

export default function SpicyNeonCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [sparks, setSparks] = useState([]);
  const shouldReduceMotion = useReducedMotion();

  // Pointer position (instant)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Mouse velocity for 3D tilt rotation
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, rot: 0 });

  useEffect(() => {
    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      window.innerWidth < 768 ||
      "ontouchstart" in window;

    if (isTouch || shouldReduceMotion) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);

      // Calculate tilt based on movement speed & direction
      const dx = x - lastX;
      const dy = y - lastY;
      lastX = x;
      lastY = y;

      const rotZ = Math.max(-25, Math.min(25, dx * 1.2));
      const rotX = Math.max(-15, Math.min(15, -dy * 0.8));
      setTilt({ rx: rotX, ry: rotZ, rot: rotZ });

      // Check if hovering interactive elements
      const target = e.target;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest(".button") ||
          target.closest("input") ||
          target.closest("textarea") ||
          target.closest("[role='button']") ||
          target.closest(".interactive") ||
          target.closest(".glass-card") ||
          target.closest(".project-image-wrapper"))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicked(true);

      // Create 3D spicy neon spark burst
      const newSparks = Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 + (Math.random() - 0.5);
        const dist = 18 + Math.random() * 22;
        return {
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist,
          size: 4 + Math.random() * 6,
          color: i % 2 === 0 ? "#00f0ff" : i % 3 === 0 ? "#2563eb" : "#38bdf8",
        };
      });

      setSparks((prev) => [...prev.slice(-16), ...newSparks]);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Clean up finished sparks
  useEffect(() => {
    if (sparks.length > 0) {
      const timer = setTimeout(() => {
        setSparks((prev) => prev.slice(8));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [sparks]);

  if (!enabled) return null;

  return (
    <>
      {/* Inject cursor hide style when component is active */}
      <style>{`
        html, body, button, a, input, select, textarea, [role="button"], .button, label {
          cursor: none !important;
        }
      `}</style>

      {/* Main 3D Spicy Neon Pepper / Pointer Cursor */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 99999,
          x: mouseX,
          y: mouseY,
          translateX: "-4px",
          translateY: "-2px",
        }}
      >
        <motion.div
          animate={{
            scale: isClicked ? 0.82 : isHovered ? 1.22 : 1,
            rotateZ: tilt.rot,
            rotateX: tilt.rx,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 22 }}
          style={{
            perspective: 600,
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 0 6px #00f0ff) drop-shadow(0 0 12px #2563eb) drop-shadow(0 0 18px #1d4ed8)",
          }}
        >
          {/* 3D Spicy Neon Chili Pepper Cursor Graphic */}
          <svg
            width="34"
            height="38"
            viewBox="0 0 34 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: "block" }}
          >
            <defs>
              {/* Vibrant 3D Spicy Blue Body Gradient */}
              <linearGradient id="spicyBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="40%" stopColor="#00a2ff" />
                <stop offset="75%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>

              {/* Glowing Neon Rim Lighting */}
              <linearGradient id="neonRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e0f2fe" />
                <stop offset="50%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>

              {/* 3D Stem Ice Blue Neon Gradient */}
              <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7dd3fc" />
                <stop offset="100%" stopColor="#0284c7" />
              </linearGradient>

              {/* Inner 3D Highlight Shine */}
              <linearGradient id="highlightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* 3D Outer Neon Aura Glow Path */}
            <path
              d="M 4 2 C 4 2, 8 10, 10 16 C 12 22, 14 28, 16 32 C 17 34, 18 36, 18 36 C 18 36, 21 28, 23 21 C 25 15, 26 9, 26 6 Z"
              fill="none"
              stroke="url(#neonRimGrad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.85"
            />

            {/* 3D Spicy Pepper Main Curved Body */}
            <path
              d="M 5 3 C 5 3, 11 11, 13 18 C 15 25, 17 31, 18 36 C 19 33, 22 25, 24 18 C 26 12, 27 6, 26 4 Z"
              fill="url(#spicyBodyGrad)"
              stroke="#00f0ff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* 3D Curved Stem (Top Tip / Pointer Arrow head) */}
            <path
              d="M 5 3 C 4 1.5, 2 1, 1 1.5 C 0.5 1.8, 1.2 3.2, 2.5 3.5 C 3.8 3.8, 5 3, 5 3 Z"
              fill="url(#stemGrad)"
              stroke="#38bdf8"
              strokeWidth="0.8"
            />

            {/* 3D Spicy Neon Curved Flame Ribs */}
            <path
              d="M 9 9 Q 12 16 13 24"
              stroke="url(#highlightGrad)"
              strokeWidth="1.6"
              strokeLinecap="round"
            />

            {/* Neon Tip Glow Point */}
            <circle cx="18" cy="36" r="2.5" fill="#38bdf8" />
            <circle cx="18" cy="36" r="1.2" fill="#ffffff" />
          </svg>
        </motion.div>
      </motion.div>

      {/* 3D Spicy Neon Click Sparks */}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.div
            key={spark.id}
            initial={{
              x: spark.x,
              y: spark.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              x: spark.x + spark.dx,
              y: spark.y + spark.dy,
              scale: 0.1,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            aria-hidden="true"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              pointerEvents: "none",
              zIndex: 999999,
              width: spark.size,
              height: spark.size,
              borderRadius: "50%",
              backgroundColor: spark.color,
              boxShadow: `0 0 10px ${spark.color}, 0 0 20px ${spark.color}`,
              translateX: "-50%",
              translateY: "-50%",
            }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}
