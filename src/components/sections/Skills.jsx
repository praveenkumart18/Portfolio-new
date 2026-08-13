import { motion } from "framer-motion";
import { skillGroups } from "../../constants/portfolio";
import SectionHeader from "../ui/SectionHeader";

const easeCustom = [0.25, 0.1, 0.25, 1];

function Skills() {
  return (
    <section id="skills" className="section-block">
      <div className="container">
        <SectionHeader
          number="03"
          eyebrow="Technical Skills"
          title="A full-stack toolkit organized for real project work."
          description="Balanced frontend craft, backend fundamentals, database design, API testing, and deployment habits."
        />

        <div className="skills-grid">
          {skillGroups.map((group, index) => (
            <motion.article
              className="glass-card skill-card"
              key={group.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02, y: -5, rotate: 0.8 }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: easeCustom }}
            >
              <div className="card-heading">
                <group.icon aria-hidden="true" />
                <h3>{group.title}</h3>
              </div>
              <div className="skill-list">
                {group.skills.map((skill) => (
                  <motion.div
                    className="skill-item"
                    key={skill.name}
                    whileHover={{ scale: 1.025, x: 3, rotate: 0.5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="skill-meta">
                      <span>
                        <skill.icon aria-hidden="true" />
                        {skill.name}
                      </span>
                      <strong>{skill.level}%</strong>
                    </div>
                    <div className="skill-track" aria-hidden="true">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: easeCustom }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
