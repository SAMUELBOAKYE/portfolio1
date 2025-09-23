import React, { useState, useEffect } from "react";
import LeftPage from "./LeftPage";
import Terminal from "./Terminal";
import Skills from "./Skills";
import "./App.css";

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [countdownValue, setCountdownValue] = useState(3);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProjectHover = (projectName, hovering) => {
    setActiveProject(projectName);
    setIsHoveringProject(hovering);
  };

  useEffect(() => {
    if (showCountdown) {
      const timer = setInterval(() => {
        setCountdownValue((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setTimeout(() => setShowCountdown(false), 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [showCountdown]);

  if (showCountdown) {
    return (
      <div className="countdown-container">
        <div className="countdown">
          <div className="countdown-number">{countdownValue}</div>
          <div className="countdown-text">Portfolio Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <LeftPage
        activeProject={activeProject}
        isHoveringProject={isHoveringProject}
        isMobile={isMobile}
      />
      <div className="main-content">
        <Terminal onProjectHover={handleProjectHover} isMobile={isMobile} />
        <skills />
      </div>
    </div>
  );
}

export default App;
