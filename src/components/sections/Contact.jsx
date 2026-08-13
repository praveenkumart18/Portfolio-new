import { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLocationDot, FaPaperPlane, FaPhone } from "react-icons/fa6";
import { profile, socials } from "../../constants/portfolio";
import SectionHeader from "../ui/SectionHeader";
import MagneticButton from "../ui/MagneticButton";

const easeCustom = [0.25, 0.1, 0.25, 1];

const initialForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState("idle");

  const updateField = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3_FORM_API,
          ...formData,
          from_name: formData.name,
        }),
      });

      if (!response.ok) throw new Error("Unable to send message");
      setFormData(initialForm);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-block alt-section">
      <div className="container">
        <SectionHeader
          number="06"
          eyebrow="Contact"
          title="Let us talk about internships, fresher roles, or full-stack projects."
          description={profile.availability}
        />

        <div className="contact-grid">
          <motion.aside
            className="glass-card contact-aside"
            initial={{ opacity: 0, y: 50, x: -15 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: easeCustom }}
          >
            <h3>Reach me directly</h3>
            <p>
              I am ready to contribute to frontend, backend, and MERN stack teams where I can
              learn quickly, ship carefully, and grow with code reviews.
            </p>

            <div className="contact-methods">
              <a href={`mailto:${profile.email}`}>
                <FaEnvelope aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone.replaceAll(" ", "")}`}>
                <FaPhone aria-hidden="true" />
                <span>{profile.phone}</span>
              </a>
              <span>
                <FaLocationDot aria-hidden="true" />
                {profile.location}
              </span>
            </div>

            <div className="social-row contact-socials">
              {socials.map((social) => (
                <MagneticButton key={social.label} distance={6}>
                  <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}>
                    <social.icon aria-hidden="true" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.aside>

          <motion.form
            className="glass-card contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50, x: 15 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.1, ease: easeCustom }}
          >
            <div className="form-grid">
              <label>
                <span>Name</span>
                <input name="name" value={formData.name} onChange={updateField} required placeholder="Your name" />
              </label>
              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={updateField}
                  required
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label>
              <span>Subject</span>
              <input name="subject" value={formData.subject} onChange={updateField} required placeholder="Opportunity or project discussion" />
            </label>
            <label>
              <span>Message</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={updateField}
                required
                rows="6"
                placeholder="Tell me what you are hiring or building for..."
              />
            </label>

            <MagneticButton distance={10}>
              <button className="button primary submit-button" type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send Message"} <FaPaperPlane aria-hidden="true" />
              </button>
            </MagneticButton>

            {status === "success" ? <p className="form-note success">Message sent successfully. I will reply soon.</p> : null}
            {status === "error" ? (
              <p className="form-note error">Something went wrong. Please email me directly using the button above.</p>
            ) : null}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
