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

  const quotes = [
    '"The only way to do great work is to love what you do." – Steve Jobs',
    '"The best way to predict the future is to invent it." – Alan Kay',
    "\"The most damaging phrase in the language is: 'It's always been done that way.'\" – Grace Hopper",
    "“Stay hungry, stay foolish.” – Steve Jobs",
    "“Learn continually. There’s always ‘one more thing’ to learn.” – Steve Jobs",
    "“Weeks of programming can save you hours of planning.”",
    "“Those who can imagine anything, can create the impossible.” – Alan Turing",
    "“Sometimes it is the people no one can imagine anything of who do the things no one can imagine.” – Alan Turing",
    "“A ship in port is safe, but that's not what ships are built for.” – Grace Hopper",
    "“You don’t understand anything until you learn it more than one way.” – Marvin Minsky",
  ];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

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
            <p className="hero-description">{randomQuote}</p>
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
