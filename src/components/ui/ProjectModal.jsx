import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaTimes, FaExternalLinkAlt, FaExpand } from "react-icons/fa";

function ProjectModal({ project, onClose }) {
  const [showFullImage, setShowFullImage] = useState(false);

  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        if (showFullImage) {
          setShowFullImage(false);
        } else {
          onClose();
        }
      }
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, project, showFullImage]);

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="presentation"
          onMouseDown={onClose}
        >
          <motion.article
            className="project-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="modal-close" type="button" onClick={onClose} aria-label="Close project details">
              <FaTimes aria-hidden="true" />
            </button>

            {/* Full Uncropped Project Image Preview Banner */}
            {project.image && (
              <div className="modal-image-container">
                <div className="modal-window-bar">
                  <span className="dot red" />
                  <span className="dot yellow" />
                  <span className="dot green" />
                  <span className="modal-window-title">{project.id}.app preview</span>
                  <button
                    type="button"
                    className="modal-zoom-btn"
                    onClick={() => setShowFullImage(true)}
                    title="View full image"
                  >
                    <FaExpand aria-hidden="true" /> Full View
                  </button>
                </div>
                <div className="modal-image-wrapper" onClick={() => setShowFullImage(true)}>
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    className="modal-project-img"
                  />
                  <div className="modal-image-overlay">
                    <span>Click to expand full screenshot</span>
                  </div>
                </div>
              </div>
            )}

            <span className="eyebrow" style={{ marginTop: "16px", display: "inline-block" }}>{project.type}</span>
            <h2 id="project-modal-title">{project.title}</h2>
            <p>{project.description}</p>
            <p>{project.outcome}</p>

            <div className="badge-row">
              {project.stack.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <h3>Key Features</h3>
            <ul className="feature-list modal-features">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <h3>Implementation Shape</h3>
            <div className="architecture-row modal-architecture">
              {project.architecture.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <div className="project-actions" style={{ marginTop: "24px", display: "flex", gap: "12px" }}>
              <a className="button secondary" href={project.repo} target="_blank" rel="noreferrer" style={{ flex: 1, justifyContent: "center" }}>
                View Source <FaGithub aria-hidden="true" />
              </a>
              {project.demo && (
                <a className="button primary" href={project.demo} target="_blank" rel="noreferrer" style={{ flex: 1, justifyContent: "center" }}>
                  Live Demo <FaExternalLinkAlt aria-hidden="true" />
                </a>
              )}
            </div>
          </motion.article>

          {/* Full Screen Lightbox Modal for 100% Uncropped Photo */}
          <AnimatePresence>
            {showFullImage && (
              <motion.div
                className="full-image-lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullImage(false);
                }}
              >
                <button
                  className="lightbox-close-btn"
                  type="button"
                  onClick={() => setShowFullImage(false)}
                >
                  <FaTimes />
                </button>
                <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                  <img
                    src={project.image}
                    alt={`${project.title} full resolution screenshot`}
                    className="lightbox-img"
                  />
                  <span className="lightbox-caption">{project.title} — Full Screenshot</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default ProjectModal;
