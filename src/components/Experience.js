import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
  const experiences = [
    {
      title: "Application Developer Intern",
      company: "Ottawa Intermediate School District",
      period: "2024 - Present",
      location: "Remote",
      description: [
        "Developed automated tests for the MySafeStudent website, ensuring optimal functionality and supporting future development efforts",
        "Utilized technologies including React, Javascript, Typescript, Cypress.io, Jest, and Git to streamline processes",
        "Enhanced team efficiency and accuracy by implementing thorough testing procedures",
        "Worked in a small team using an Agile workflow with daily standup meetings",
        "Completed courses in React and Cypress, expanding technical proficiency and contributing to project success",
      ],
      technologies: [
        "React",
        "Ember.js",
        "JavaScript",
        ".NET",
        "SQL",
        "Jest",
        "Cypress.io",
        "GitHub Actions",
        "GraphQL",
        "Docker",
      ],
    },
    {
      title: "Summer Field Technician",
      company: "Ottawa Intermediate School District",
      period: "2021 - 2024",
      location: "Holland, MI",
      description: [
        "Developed automation software to streamline tasks, improving team efficiency",
        "Collaborated with a team to provide technology support services within the OAISD",
        "Managed a fleet of over 3000 Chromebooks and iPads across multiple public school districts",
        "Planned and executed technology upgrades and deployments of new systems and devices",
        "Documented and maintained detailed records of technology assets and repairs",
      ],
      technologies: ["JavaScript", "Python"],
    },
  ];

  return (
    <section
      id="experience"
      className="section"
      style={{ background: "rgba(255, 255, 255, 0.02)" }}
    >
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="experience-item">
              <div className="experience-icon">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <div className="experience-content card">
                <div className="experience-header">
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      color: "#3b82f6",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {exp.title}
                  </h3>
                  <h4
                    style={{
                      fontSize: "1.25rem",
                      color: "#ffffff",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {exp.company}
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      marginBottom: "1rem",
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        color: "#a1a1aa",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <FontAwesomeIcon icon={faCalendar} />
                      {exp.period}
                    </span>
                    <span style={{ color: "#a1a1aa" }}>📍 {exp.location}</span>
                  </div>
                </div>
                <ul
                  style={{
                    textAlign: "left",
                    marginBottom: "1.5rem",
                    paddingLeft: "1rem",
                  }}
                >
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      style={{ color: "#d1d5db", marginBottom: "0.5rem" }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {exp.technologies.map((tech, i) => (
                    <span
                      key={i}
                      style={{
                        background: "rgba(139, 92, 246, 0.1)",
                        color: "#8b5cf6",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "15px",
                        fontSize: "0.8rem",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
