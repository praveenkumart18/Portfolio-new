import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaFolderOpen,
  FaServer,
  FaGlobe,
  FaGamepad,
  FaStar,
  FaExpand,
} from "react-icons/fa";
import { filters, projects } from "../../constants/portfolio";
import ProjectModal from "../ui/ProjectModal";
import SectionHeader from "../ui/SectionHeader";
import MagneticButton from "../ui/MagneticButton";

const easeCustom = [0.25, 0.1, 0.25, 1];

function ProjectImage({ src, alt, onClick }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      className="project-image-wrapper"
      onClick={onClick}
      style={{ cursor: "pointer", position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      {!loaded && <div className="skeleton-placeholder" />}
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        whileHover={{ scale: 1.04 }}
        transition={{ duration: 0.4, ease: easeCustom }}
        style={{
          opacity: loaded ? 1 : 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          objectPosition: "top center",
        }}
      />
      <div className="project-image-hover-overlay">
        <span><FaExpand aria-hidden="true" style={{ display: "inline", marginRight: "6px" }} /> View Full Photo</span>
      </div>
    </div>
  );
}

function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const stats = useMemo(() => {
    const total = projects.length;
    const fullStackCount = projects.filter(
      (p) => p.category === "Full Stack" || p.stack.includes("Node.js") || p.stack.includes("Express.js")
    ).length;
    const activeDemos = projects.filter((p) => p.demo).length;
    const gamesCount = projects.filter((p) => p.category === "Games").length;
    return { total, fullStackCount, activeDemos, gamesCount };
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projects;
    return projects.filter((project) => {
      const catMatch = project.category.toLowerCase().includes(activeFilter.toLowerCase());
      const stackMatch = project.stack.some(
        (s) => s.toLowerCase() === activeFilter.toLowerCase()
      );
      return catMatch || stackMatch;
    });
  }, [activeFilter]);

  return (
    <section id="projects" className="section-block">
      <div className="container">
        <SectionHeader
          number="04"
          eyebrow="Selected Projects"
          title="Project cards rebuilt for recruiter scanning and technical depth."
          description="Each project highlights the problem area, stack, features, source code, and expandable implementation details."
        />

        <motion.div
          className="projects-stats-row"
          aria-label="Portfolio metrics"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: easeCustom }}
        >
          <div className="glass-card stat-box">
            <FaFolderOpen aria-hidden="true" />
            <strong>{stats.total}</strong>
            <span>Total Projects</span>
          </div>
          <div className="glass-card stat-box">
            <FaServer aria-hidden="true" />
            <strong>{stats.fullStackCount}</strong>
            <span>Full Stack</span>
          </div>
          <div className="glass-card stat-box">
            <FaGlobe aria-hidden="true" />
            <strong>{stats.activeDemos}</strong>
            <span>Active Demos</span>
          </div>
          <div className="glass-card stat-box">
            <FaGamepad aria-hidden="true" />
            <strong>{stats.gamesCount}</strong>
            <span>Web Games</span>
          </div>
        </motion.div>

        <div className="filter-row" role="list" aria-label="Project filters">
          {filters.map((filter) => (
            <MagneticButton key={filter} distance={6}>
              <button
                type="button"
                className={activeFilter === filter ? "active" : ""}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            </MagneticButton>
          ))}
        </div>

        {filteredProjects.length ? (
          <motion.div
            className="project-grid"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.article
                  layout
                  className="glass-card project-card"
                  key={project.id}
                  initial={{ opacity: 0, y: 60, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  exit={{ opacity: 0, scale: 0.9, y: 10 }}
                  transition={{ duration: 0.7, delay: index * 0.08, ease: easeCustom }}
                >
                  <div className={`project-banner tone-${project.imageTone}`} style={{ position: "relative" }}>
                    {project.featured && (
                      <div className="featured-badge">
                        <FaStar aria-hidden="true" />
                        <span>Featured</span>
                      </div>
                    )}
                    <div className="project-window" style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
                      <div className="project-window-bar">
                        <span className="dot red" />
                        <span className="dot yellow" />
                        <span className="dot green" />
                        <strong>{project.id}.app</strong>
                      </div>
                      <div className="project-window-body" style={{ flex: 1, padding: 0, position: "relative", overflow: "hidden" }}>
                        <ProjectImage src={project.image} alt={project.title} onClick={() => setSelectedProject(project)} />
                      </div>
                    </div>
                    
                    <motion.div
                      className="project-index"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.15 + index * 0.05, ease: easeCustom }}
                    >
                      <span>Case study</span>
                      <strong>0{index + 1}</strong>
                    </motion.div>
                  </div>

                  <div className="project-body">
                    <div className="project-title-row">
                      <span>{project.category}</span>
                      <button type="button" onClick={() => setSelectedProject(project)}>
                        Details
                      </button>
                    </div>
                    <h3>{project.title}</h3>
                    <p>{project.summary}</p>
                    <p className="project-outcome">{project.outcome}</p>

                    <div className="badge-row">
                      {project.stack.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05, y: -2 }}
                          transition={{ duration: 0.2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <ul className="feature-list">
                      {project.features.slice(0, 4).map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>

                    <div className="architecture-row" aria-label={`${project.title} architecture`}>
                      {project.architecture.slice(0, 3).map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>

                    <div className="project-actions">
                      <MagneticButton distance={8}>
                        <a className="button compact secondary" href={project.repo} target="_blank" rel="noreferrer">
                          GitHub <FaGithub aria-hidden="true" />
                        </a>
                      </MagneticButton>
                      {project.demo ? (
                        <MagneticButton distance={8}>
                          <a className="button compact primary" href={project.demo} target="_blank" rel="noreferrer">
                            Live Demo <FaExternalLinkAlt aria-hidden="true" />
                          </a>
                        </MagneticButton>
                      ) : (
                        <span className="empty-state">Live demo coming soon</span>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="empty-panel">No projects match this filter yet.</div>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

export default Projects;
