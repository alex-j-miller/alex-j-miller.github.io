import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCalendar,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Computer Science",
      minor: "Data Science",
      school: "Calvin University",
      period: "2021 - 2025",
      location: "Grand Rapids, MI",
      gpa: "3.3/4.0",
      description:
        "Focused on software engineering, algorithms, and data structures. Completed my senior capstone project on developing a Python display library for a LED display.",
      achievements: [
        "Helped classmates debug code and understand CS concepts across multiple courses",
        "Led development of a full-stack app for tracking Calvin's swim team stats",
        "Participated in Calvin’s CS club (Abstraction) and Google Developer Student Club (GDSC)",
      ],
    },
  ];

  const certifications = [
    "Social and Behavioral Research",
    "BigQuery Basics for Data Analysts",
    "CompTIA A+",
    "CompTIA IT Fundamentals+",
    "Microsoft Technology Associate: Networking Fundamentals",
  ];

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education</h2>

        <div className="education-timeline">
          {education.map((edu, index) => (
            <div key={index} className="education-item">
              <div className="education-icon">
                <FontAwesomeIcon icon={faGraduationCap} />
              </div>
              <div className="education-content card">
                <h3
                  style={{
                    fontSize: "1.5rem",
                    color: "#3b82f6",
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.degree}
                </h3>
                {edu.minor && (
                  <h4
                    style={{
                      fontSize: "1.1rem",
                      color: "#8b5cf6",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Minor: {edu.minor}
                  </h4>
                )}
                <h4
                  style={{
                    fontSize: "1.25rem",
                    color: "#ffffff",
                    marginBottom: "0.5rem",
                  }}
                >
                  {edu.school}
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
                    {edu.period}
                  </span>
                  <span style={{ color: "#a1a1aa" }}>📍 {edu.location}</span>
                  {edu.gpa && (
                    <span style={{ color: "#8b5cf6" }}>GPA: {edu.gpa}</span>
                  )}
                </div>
                <p
                  style={{
                    color: "#d1d5db",
                    marginBottom: "1.5rem",
                    textAlign: "left",
                  }}
                >
                  {edu.description}
                </p>
                <div>
                  <h5
                    style={{
                      color: "#ffffff",
                      marginBottom: "0.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faAward}
                      style={{ color: "#3b82f6" }}
                    />
                    Key Achievements
                  </h5>
                  <ul style={{ textAlign: "left", paddingLeft: "1rem" }}>
                    {edu.achievements.map((achievement, i) => (
                      <li
                        key={i}
                        style={{ color: "#d1d5db", marginBottom: "0.25rem" }}
                      >
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "4rem" }}>
          <h3
            style={{
              fontSize: "2rem",
              color: "#ffffff",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Certifications
          </h3>
          <div className="grid grid-2">
            {certifications.map((cert, index) => (
              <div key={index} className="card">
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <FontAwesomeIcon
                    icon={faAward}
                    style={{ fontSize: "1.5rem", color: "#8b5cf6" }}
                  />
                  <span style={{ color: "#ffffff", fontSize: "1.1rem" }}>
                    {cert}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
