import Hero from "../components/sections/Hero";
import Profile from "../components/sections/Profile";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Contact from "../components/sections/Contact";
import AmbientBackground from "../components/ui/AmbientBackground";

function PortfolioPage() {
  return (
    <>
      <AmbientBackground />
      <Hero />
      <Profile />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}

export default PortfolioPage;
