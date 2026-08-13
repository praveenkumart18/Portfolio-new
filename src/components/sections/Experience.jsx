import { motion } from "framer-motion";
import { experience } from "../../constants/portfolio";
import SectionHeader from "../ui/SectionHeader";

const easeCustom = [0.25, 0.1, 0.25, 1];

function Experience() {
  return (
    <section id="experience" className="section-block alt-section">
      <div className="container">
        <SectionHeader
          number="05"
          eyebrow="Experience & Certifications"
          title="Evidence of learning, API practice, and competitive problem solving."
          description="A concise view of workshops, certifications, hackathons, and datathon exposure that supports fresher software roles."
        />

        <div className="timeline">
          {experience.map((item, index) => (
            <motion.article
              className="glass-card timeline-item"
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: easeCustom }}
            >
              <div className="timeline-icon">
                <item.icon aria-hidden="true" />
              </div>
              <div>
                <span>{item.meta}</span>
                <h3>{item.title}</h3>
                <p>{item.details}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
