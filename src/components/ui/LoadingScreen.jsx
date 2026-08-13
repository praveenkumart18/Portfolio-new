import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./LoadingScreen.css";

function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    // Lock scroll during loading
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let animationFrameId;
    let startTime = null;
    const duration = 1200; // 1.2s smooth count-up

    const updateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const current = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(current);

      if (current < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // Complete and fade out
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(() => {
            setIsMounted(false);
            document.body.style.overflow = originalOverflow;
            if (onComplete) onComplete();
          }, 450); // Fade animation duration
        }, 180); // Brief hold at 100%
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          className="loading-screen-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
        >
          {/* Ambient background glow */}
          <div className="loading-bg-glow" />

          <div className="loading-content">
            {/* Monogram Badge */}
            <motion.div
              className="loading-brand-badge"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="loading-mark-box">
                <span className="loading-mark-text">PK</span>
              </div>
              <div className="loading-pulse-ring" />
            </motion.div>

            {/* Title / Eyebrow */}
            <motion.div
              className="loading-text-group"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.35 }}
            >
              <span className="loading-title">PRAVEEN KUMAR T</span>
              <span className="loading-subtitle">
                PORTFOLIO <span className="loading-cursor">_</span>
              </span>
            </motion.div>

            {/* Progress Bar & Counter */}
            <div className="loading-progress-wrapper">
              <div className="loading-progress-track">
                <div
                  className="loading-progress-fill"
                  style={{ width: `${progress}%` }}
                >
                  <div className="loading-progress-glow-tip" />
                </div>
              </div>

              <div className="loading-meta-row">
                <span className="loading-status-msg">
                  {progress < 40
                    ? "INITIALIZING SYSTEM"
                    : progress < 80
                    ? "LOADING MODULES"
                    : "READY"}
                </span>
                <span className="loading-percentage">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default LoadingScreen;
