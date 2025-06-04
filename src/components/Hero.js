import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Hero.css";

const Hero = () => {
  const greetings = [
    "Hi",
    "Hello",
    "Welcome",
    "Hey there",
    "Hey",
    "What's up",
    "Howdy",
  ];
  const randomGreeting =
    greetings[Math.floor(Math.random() * greetings.length)];

  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              {randomGreeting}, I'm{" "}
              <span className="text-gradient">Alex Miller</span>
            </h1>
            <h2 className="hero-subtitle">Software Developer</h2>
            <p className="hero-description">
              I'm passionate about creating innovative solutions and building
              amazing user experiences with modern technologies. Welcome to my
              digital portfolio.
            </p>
            <div className="hero-buttons">
              <a href="#contact" className="btn btn-primary">
                <FontAwesomeIcon icon={faEnvelope} />
                Get In Touch
              </a>
              <a href="/resume.pdf" className="btn btn-secondary" download>
                <FontAwesomeIcon icon={faDownload} />
                Download CV
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-image">
                <img src="/profile.jpg" alt="Alex Miller" />
              </div>
              <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
