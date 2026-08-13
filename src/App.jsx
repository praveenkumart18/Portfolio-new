import { Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/ui/BackToTop";
import LoadingScreen from "./components/ui/LoadingScreen";
import ScrollProgress from "./components/ui/ScrollProgress";
import SpicyNeonCursor from "./components/ui/SpicyNeonCursor";
import { useTheme } from "./hooks/useTheme";
import "./styles/main.css";

const PortfolioPage = lazy(() => import("./pages/PortfolioPage"));

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <SpicyNeonCursor />
      <LoadingScreen />
      <ScrollProgress />
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <motion.main
          key="portfolio-page"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <Suspense fallback={<div className="page-fallback">Preparing portfolio...</div>}>
            <PortfolioPage />
          </Suspense>
        </motion.main>
      </AnimatePresence>
      <BackToTop />
      <Footer />
    </div>
  );
}

export default App;
