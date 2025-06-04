import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faServer,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const passionateDevText = {
    title: "Passionate Developer",
    paragraphs: [
      "I'm a dedicated software developer with a passion for creating innovative solutions and exceptional user experiences. With expertise in modern web technologies, I enjoy tackling complex problems and turning ideas into reality.",
      "When I'm not coding, you can find me hanging out with friends, playing tennis or pickleball, or exploring the latest tech trends. I believe in continuous learning and strive to stay updated with the ever-evolving tech landscape.",
    ],
  };

  const technicalSkills = [
    // Frontend Frameworks & Libraries
    "React",
    "React Native",
    "Angular",
    "Ember.js",

    // Backend & Full Stack
    ".NET",
    "Firebase",
    "Docker",
    "Azure",

    // Languages
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C#",
    "C++",

    // Web Fundamentals
    "HTML",
    "CSS",

    // Databases
    "PostgreSQL",
    "SQL",
    "NoSQL",

    // Testing & Dev Tools
    "Jest",
    "Cypress.io",
    "Git",
    "GitHub",
  ];

  const skills = [
    {
      icon: faCode,
      title: "Frontend Development",
      description: "React, TypeScript, JavaScript, HTML, CSS",
    },
    {
      icon: faServer,
      title: "Backend Development",
      description: "Node.js, Express, REST APIs, Firebase Functions",
    },
    {
      icon: faDatabase,
      title: "Data & Integration",
      description: "PostgreSQL, Firebase, NoSQL Design",
    },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="grid grid-2" style={{ marginBottom: "4rem" }}>
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#3b82f6",
              }}
            >
              {passionateDevText.title}
            </h3>
            {passionateDevText.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                style={{
                  color: "#d1d5db",
                  lineHeight: "1.7",
                  marginBottom:
                    index < passionateDevText.paragraphs.length - 1
                      ? "1.5rem"
                      : "0",
                }}
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                marginBottom: "1rem",
                color: "#3b82f6",
              }}
            >
              Technical Skills
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {technicalSkills.map((skill, index) => (
                <span
                  key={index}
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    color: "#3b82f6",
                    padding: "0.5rem 1rem",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-2">
          {skills.map((skill, index) => (
            <div key={index} className="card">
              <div style={{ textAlign: "center" }}>
                <FontAwesomeIcon
                  icon={skill.icon}
                  style={{
                    fontSize: "2.5rem",
                    color: "#3b82f6",
                    marginBottom: "1rem",
                  }}
                />
                <h3
                  style={{
                    fontSize: "1.25rem",
                    marginBottom: "1rem",
                    color: "#ffffff",
                  }}
                >
                  {skill.title}
                </h3>
                <p style={{ color: "#a1a1aa" }}>{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
