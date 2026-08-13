import { motion } from "framer-motion";
import { FaArrowTrendUp, FaCodeBranch, FaGraduationCap } from "react-icons/fa6";
import { fadeUp, staggerContainer } from "../../animations/variants";
import { education, profile, profileHighlights, workingStyle } from "../../constants/portfolio";
import SectionHeader from "../ui/SectionHeader";
import ScrollWordReveal from "../ui/ScrollWordReveal";

function Profile() {
  return (
    <section id="profile" className="section-block profile-section">
      <div className="container">
        <SectionHeader
          number="02"
          eyebrow="Developer Profile"
          title="More than a student portfolio: a focused fresher profile with project evidence."
          description="This section gives recruiters the short version of how I think, what I can build, and where I can contribute from day one."
        />

        <div className="profile-layout">
          <motion.article
            className="glass-card profile-narrative"
            initial={{ opacity: 0, x: -28, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="profile-label">
              <FaArrowTrendUp aria-hidden="true" />
              <span>Internship-ready full-stack developer</span>
            </div>
            <h3>{profile.role} with a product-minded approach to campus and business workflows.</h3>
            
            <ScrollWordReveal
              text="I build applications around roles, permissions, forms, dashboards, and clear data movement. My strongest projects are not just UI screens; they include backend routes, database collections, authentication decisions, and admin-friendly workflows."
            />

            <ScrollWordReveal
              text="I am looking for teams where I can contribute to React interfaces, Node/Express APIs, MongoDB-backed features, bug fixes, API testing, and production polish while learning from real engineering practices."
            />
          </motion.article>

          <motion.div
            className="profile-detail-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {profileHighlights.map((item) => (
              <motion.article className="glass-card detail-card" key={item.label} variants={fadeUp}>
                <span>{item.label}</span>
                <p>{item.value}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="profile-bottom-grid">
          <motion.article
            className="glass-card education-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mini-heading">
              <FaGraduationCap aria-hidden="true" />
              <h3>Education</h3>
            </div>
            {education.map((item) => (
              <div className="education-item" key={item.degree}>
                <span>{item.period}</span>
                <h4>{item.degree}</h4>
                <strong>{item.place}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </motion.article>

          <motion.article
            className="glass-card workflow-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="mini-heading">
              <FaCodeBranch aria-hidden="true" />
              <h3>How I Build</h3>
            </div>
            <ol className="workflow-list">
              {workingStyle.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

export default Profile;
