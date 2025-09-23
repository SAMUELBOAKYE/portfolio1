import React, { useRef, useState, useEffect } from "react";
import "./LeftPage.css";
import Samuel from "./assets/samuel.jpg";
import PortfolioImage from "./assets/yaff.png";
import EcommerceImage from "./assets/pet.png";
import LandingImage from "./assets/land.png";

const LeftPage = ({ activeProject, isHoveringProject, isMobile }) => {
  const utteranceRef = useRef(null);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isImageHovered, setIsImageHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const projectImages = {
    portfolio: PortfolioImage,
    ecommerce: EcommerceImage,
    landing: LandingImage,
  };

  const speakMessage = () => {
    const message = "Samuel is a Pure Frontend Developer";
    const synth = window.speechSynthesis;

    if (synth.speaking || utteranceRef.current) return;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.voice = synth.getVoices().find((voice) => voice.lang === "en-US");
    utteranceRef.current = utterance;

    utterance.onend = () => {
      utteranceRef.current = null;
    };

    synth.speak(utterance);
  };

  const handleMouseEnter = () => {
    if (!isHoveringProject && !isMobile) {
      setIsHoveringProfile(true);
      speakMessage();
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHoveringProfile(false);
    }
  };

  const handleImageHover = () => {
    if (!isMobile) {
      setIsImageHovered(true);
    }
  };

  const handleImageLeave = () => {
    if (!isMobile) {
      setIsImageHovered(false);
    }
  };

  const handleTouch = () => {
    setIsTouched(!isTouched);
    if (!isTouched) {
      speakMessage();
    }
  };

  return (
    <div
      className="left-page"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="image-frame">
        {activeProject ? (
          <div
            className="project-image-container"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
            onClick={handleTouch}
          >
            <img
              src={projectImages[activeProject]}
              alt={`${activeProject} project`}
              className={`project-image ${
                isImageHovered || isTouched ? "zoomed" : ""
              }`}
            />
          </div>
        ) : (
          <img
            src={Samuel}
            alt="Samuel Boakye"
            className={`hanging-image ${
              isHoveringProfile || isTouched ? "hovered" : ""
            }`}
            onClick={handleTouch}
          />
        )}
        <div className={`tooltip ${isTouched ? "visible" : ""}`}>
          🚀 <strong>SAMUEL BOAKYE</strong> <br />
          Pure Frontend Developer. <br />
          {activeProject
            ? isMobile
              ? "Viewing project (tap to zoom)"
              : "Viewing project (hover to zoom)"
            : isMobile
            ? "Tap for intro. Use the Terminal ➜"
            : "Hovered? You're Curious. Use the Terminal ➜"}
        </div>
      </div>
    </div>
  );
};

export default LeftPage;
