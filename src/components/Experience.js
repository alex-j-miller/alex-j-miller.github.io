import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faCalendar } from "@fortawesome/free-solid-svg-icons";

const Experience = () => {
  const experiences = [
    {
      title: "Application Developer Intern",
      company: "Ottawa Area Intermediate School District",
      period: "2021 – Present",
      location: "Grand Rapids / Remote",
      description: [
        "Built automated testing infrastructure for the MiSafeStudent safety reporting platform using Cypress for end-to-end tests and Jest for integration tests, establishing team testing standards.",
        "Developed a user permission management feature enabling Michigan Department of Education administrators to modify district-level user access without developer intervention, removing recurring developer workload.",
        "Led the first page migration from GraphQL to REST for the MICIP platform, redesigning data flows and providing a template for subsequent migrations.",
        "Implemented navigation bar components to guide users through multi-step workflows, improving UX and reducing workflow abandonment.",
        "Integrated automated tests into the CI/CD pipeline using GitHub Actions so pull requests must pass tests before merging.",
        "Executed a complex data type migration across codebase and database schema, documenting rollback procedures and updating references to ensure consistent data handling.",
        "Progressed from onboarding to contributing production code within ~3 weeks while learning Ember, GraphQL, and .NET Core, and updated onboarding docs for future hires.",
      ],
      technologies: [
        "Ember.js",
        "React",
        "GraphQL",
        "REST APIs",
        ".NET Core",
        "Jest",
        "Cypress",
        "GitHub Actions",
        "PostgreSQL",
      ],
    },
    {
      title: "Summer Field Technician",
      company: "Ottawa Area Intermediate School District",
      period: "2021 – 2024 (seasonal)",
      location: "Multiple districts, MI",
      description: [
        "Developed a Google Apps Script automation to geolocate IP addresses from failed login attempts, integrating with APIs and saving tech leads ~2 hours of manual work every couple weeks.",
        "Managed technology operations across thousands of devices (Chromebooks, desktops, classroom tech) for multiple school districts, handling imaging, configuration, troubleshooting, and deployments.",
        "Served as a project lead for classroom sound system installations and coordinated technology upgrades including WAP replacements and Chromebook rollouts with minimal disruption.",
        "Maintained asset and repair tracking systems to support long-term accountability and planning.",
      ],
      technologies: ["JavaScript", "Google Apps Script", "Python"],
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
