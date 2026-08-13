import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./IntroLoader.css";

const VIDEO_SOURCES = [
  "/assets/pk-loader/intro.mp4",
  "/intro.mp4",
  "/loader-frames/intro.mp4"
];

const TOTAL_FRAMES = 24;
const FRAME_INTERVAL_MS = 80;
const FRAME_HOLD_MS = 400;
const FADE_OUT_MS = 500;
const PRELOAD_TIMEOUT_MS = 2500;

const getFrameUrls = (frameIndex) => {
  const paddedIndex = String(frameIndex).padStart(3, "0");
  return [
    `/assets/pk-loader/ezgif-frame-${paddedIndex}.png`,
    `/loader-frames/ezgif-frame-${paddedIndex}.png`
  ];
};

function IntroLoader({ onComplete }) {
  const [useVideo, setUseVideo] = useState(false);
  const [activeVideoSrc, setActiveVideoSrc] = useState("");
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [useFallbackSvg, setUseFallbackSvg] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const preloadedImages = useRef([]);
  const animTimerRef = useRef(null);
  const videoRef = useRef(null);
  const isFinishedRef = useRef(false);

  // Lock page scroll while intro is visible
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Completion sequence: hold -> fade out -> unmount
  const triggerCompletion = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;

    const holdTimer = setTimeout(() => {
      setIsFadingOut(true);

      const fadeTimer = setTimeout(() => {
        setIsUnmounted(true);
        if (onComplete) onComplete();
      }, FADE_OUT_MS);

      return () => clearTimeout(fadeTimer);
    }, FRAME_HOLD_MS);

    return () => clearTimeout(holdTimer);
  }, [onComplete]);

  // Check for video availability first
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setReducedMotion(true);
      triggerCompletion();
      return;
    }

    let isMounted = true;

    const checkVideo = async () => {
      for (const src of VIDEO_SOURCES) {
        try {
          const response = await fetch(src, { method: "HEAD" });
          if (response.ok && isMounted) {
            setActiveVideoSrc(src);
            setUseVideo(true);
            setIsPreloaded(true);
            return true;
          }
        } catch {
          // Continue checking next video source or fallback to frames
        }
      }
      return false;
    };

    checkVideo().then((hasVideo) => {
      if (hasVideo || !isMounted) return;

      // Preload PNG frames if no video is available
      let loadedCount = 0;
      let failedCount = 0;
      const images = [];

      const handleFrameDone = () => {
        if (!isMounted) return;
        loadedCount++;
        const progress = Math.round((loadedCount / TOTAL_FRAMES) * 100);
        setLoadProgress(progress);

        if (loadedCount >= TOTAL_FRAMES) {
          if (failedCount >= TOTAL_FRAMES) {
            setUseFallbackSvg(true);
          }
          setIsPreloaded(true);
        }
      };

      const preloadTimeout = setTimeout(() => {
        if (!isMounted) return;
        if (failedCount >= TOTAL_FRAMES * 0.5) {
          setUseFallbackSvg(true);
        }
        setIsPreloaded(true);
      }, PRELOAD_TIMEOUT_MS);

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        const urls = getFrameUrls(i);

        img.src = urls[0];
        img.onload = () => handleFrameDone();
        img.onerror = () => {
          const fallbackImg = new Image();
          fallbackImg.src = urls[1];
          fallbackImg.onload = () => {
            img.src = urls[1];
            handleFrameDone();
          };
          fallbackImg.onerror = () => {
            failedCount++;
            handleFrameDone();
          };
        };
        images.push(img);
      }

      preloadedImages.current = images;

      return () => {
        isMounted = false;
        clearTimeout(preloadTimeout);
      };
    });

    return () => {
      isMounted = false;
    };
  }, [triggerCompletion]);

  // Frame animation driver (when video is not used)
  useEffect(() => {
    if (useVideo || !isPreloaded || reducedMotion || isUnmounted || useFallbackSvg) return;

    let frameIndex = 1;

    const intervalId = setInterval(() => {
      frameIndex++;
      if (frameIndex >= TOTAL_FRAMES) {
        setCurrentFrame(TOTAL_FRAMES);
        clearInterval(intervalId);
        triggerCompletion();
      } else {
        setCurrentFrame(frameIndex);
      }
    }, FRAME_INTERVAL_MS);

    animTimerRef.current = intervalId;

    return () => {
      if (animTimerRef.current) {
        clearInterval(animTimerRef.current);
      }
    };
  }, [useVideo, isPreloaded, reducedMotion, isUnmounted, useFallbackSvg, triggerCompletion]);

  // Handle fallback SVG animation timer if PNGs fail to load
  useEffect(() => {
    if (useFallbackSvg && !isUnmounted && !isFinishedRef.current) {
      const fallbackTimer = setTimeout(() => {
        triggerCompletion();
      }, 2400);

      return () => clearTimeout(fallbackTimer);
    }
  }, [useFallbackSvg, isUnmounted, triggerCompletion]);

  if (isUnmounted) return null;

  const activeImageSrc = preloadedImages.current[currentFrame - 1]?.src || getFrameUrls(currentFrame)[0];

  return (
    <AnimatePresence>
      {!isUnmounted && (
        <motion.div
          className="intro-loader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: "easeInOut" }}
          role="status"
          aria-label="PK signature intro animation"
        >
          <div className="intro-loader-content">
            <div className="intro-loader-frame-wrapper">
              {useVideo ? (
                /* Single video element playback */
                <video
                  ref={videoRef}
                  src={activeVideoSrc}
                  autoPlay
                  muted
                  playsInline
                  className="intro-loader-video"
                  onEnded={() => triggerCompletion()}
                  onError={() => {
                    setUseVideo(false);
                    setUseFallbackSvg(true);
                  }}
                />
              ) : !useFallbackSvg ? (
                /* Frame sequence animation */
                <img
                  key="signature-frame"
                  src={activeImageSrc}
                  alt={`PK signature frame ${currentFrame}`}
                  className="intro-loader-frame"
                  onError={() => setUseFallbackSvg(true)}
                />
              ) : (
                /* Fallback SVG handwriting signature */
                <div className="intro-loader-svg-container">
                  <svg
                    viewBox="0 0 400 280"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <path
                      id="pk-signature-path"
                      d="M 60,150 C 90,155 120,145 130,120 C 135,100 120,80 100,120 L 70,220 C 80,180 105,110 135,110 C 160,110 165,140 140,155 C 120,165 140,150 165,130 C 185,100 205,40 200,20 C 190,20 165,100 160,180 C 170,140 195,120 205,135 C 215,150 195,175 180,170 C 200,180 230,190 270,160"
                      stroke="#111111"
                      strokeWidth="9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="pk-svg-path-draw"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Progress indicator during frame preloading (only shown if video is not used) */}
            {!useVideo && !isPreloaded && !reducedMotion && !useFallbackSvg && (
              <div className="intro-loader-progress-container">
                <div className="intro-loader-progress-bar">
                  <div
                    className="intro-loader-progress-fill"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <span className="intro-loader-status-text">
                  Loading intro ({loadProgress}%)
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default IntroLoader;
