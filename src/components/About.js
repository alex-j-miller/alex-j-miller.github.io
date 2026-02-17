import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faServer,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";

const About = () => {
  const passionateDevText = {
    title: "Professional Profile",
    paragraphs: [
      "Junior Software Developer with hands-on experience building and maintaining production software for statewide educational platforms serving Michigan school districts. Proficient in full-stack development across modern frameworks including React, Angular, Ember, and .NET Core, with demonstrated ability to rapidly learn new technology stacks and contribute production-ready code. Skilled at implementing automated testing infrastructure and CI/CD workflows that improve code reliability and deployment confidence.",
      "Known for identifying inefficiencies and building practical solutions that save time for end users and development teams alike. Collaborative team member experienced with Agile methodologies, code reviews, and cross-functional communication in professional software development environments.",
    ],
  };

  const technicalSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "React Native",
    "Node.js",
    "Express",
    "Cypress",
    "Jest Testing",
    "Python",
    "SQL",
    "Angular",
    "Ember.js",
    "GraphQL",
    "REST APIs",
    "Git",
    "GitHub Actions",
    "Full-Stack Development",
    ".NET Core",
    "PostgreSQL",
    "Firestore",
    "Agile Development",
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
