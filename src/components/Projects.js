import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faCode,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Projects = () => {
  const projects = [
    {
      title: "Rupp’s Recipes",
      description:
        "Website that displays cherished family recipes that were previously only held in a recipe book to make it so that recipes could be more easily shared amongst family.",
      image: "/rupp.png",
      technologies: ["Angular", "TypeScript", "Firebase", "NoSQL"],
      liveLink: "https://alex-j-miller.github.io/rupps-recipes/",
      githubLink: "https://github.com/alex-j-miller/rupps-recipes",
      featured: true,
      showLiveLink: true,
    },
    {
      title: "SplashStats",
      description:
        "App for Calvin's Swimming & Diving team, to streamline SwimCloud data retrieval. Designed for coaches, it simplifies performance tracking and enables CSV exports, reducing manual data collection effort.",
      image: "/splash.svg",
      technologies: ["Angular", "Electron", "TypeScript", "Node.js"],
      liveLink: "",
      githubLink: "https://github.com/alex-j-miller/SplashStats",
      featured: true,
      showLiveLink: false,
    },
    {
      title: "LED Display Library",
      description:
        "Developed an interactive LED matrix board for Calvin University's Computer Science poster fair, enhancing engagement with images, shapes, and simple games. Created a Python library enabling CS108 students to easily build projects and interact via a controller, highlighting CS creativity and technical skills. Worked in a team of 3 people in an Agile workflow with weekly standup meetings.",
      image: "/led_display.png",
      technologies: ["Python", "C", "Raspberry Pi", "LED Matrix", "GPIO"],
      liveLink: "",
      githubLink: "https://github.com/LEDwallSeniorProject",
      featured: false,
      showLiveLink: false,
    },
    {
      title: "Commit",
      description:
        "Developed an app to help users form habits through community-based accountability, featuring a friend system, smart alarms, study timers, and an interactive dashboard with progress graphs. Worked in a team of 5 people in an Agile workflow with weekly standup meetings.",
      image: "/commit.png",
      technologies: [
        "React Native",
        "Azure",
        "JavaScript",
        "PostgreSQL",
        "Node.js",
      ],
      liveLink: "",
      githubLink: "https://github.com/calvin-cs262-takeitEasy",
      featured: false,
      showLiveLink: false,
    },
    {
      title: "SwipeBite",
      description:
        "A mobile app that helps friends choose a restaurant by swiping left or right on nearby options and matching when they both swipe right on the same place.",
      image: "/swipebite.png",
      technologies: ["React Native", "Firebase", "TypeScript"],
      liveLink: "",
      githubLink: "https://github.com/alex-j-miller/swipebite",
      featured: false,
      showLiveLink: false,
    },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const otherProjects = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      className="section"
      style={{ background: "rgba(255, 255, 255, 0.02)" }}
    >
      <div className="container">
        <h2 className="section-title">Featured Projects</h2>

        <div className="grid grid-2" style={{ marginBottom: "4rem" }}>
          {featuredProjects.map((project, index) => (
            <div key={index} className="card project-card">
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                    background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  }}
                />
              </div>
              <h3
                style={{
                  fontSize: "1.5rem",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                }}
              >
                {project.title}
              </h3>
              <p
                style={{
                  color: "#d1d5db",
                  marginBottom: "1.5rem",
                  textAlign: "left",
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem",
                  marginBottom: "1.5rem",
                }}
              >
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(59, 130, 246, 0.1)",
                      color: "#3b82f6",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "15px",
                      fontSize: "0.8rem",
                      border: "1px solid rgba(59, 130, 246, 0.3)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  justifyContent: "center",
                }}
              >
                {project.showLiveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ flex: 1, textAlign: "center" }}
                  >
                    <FontAwesomeIcon icon={faEye} />
                    Live Demo
                  </a>
                )}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, textAlign: "center" }}
                >
                  <FontAwesomeIcon icon={faCode} />
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>

        <h3
          style={{
            fontSize: "2rem",
            color: "#ffffff",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Other Projects
        </h3>
        <div className="grid grid-3">
          {otherProjects.map((project, index) => (
            <div key={index} className="card project-card-small">
              <h4
                style={{
                  fontSize: "1.25rem",
                  color: "#3b82f6",
                  marginBottom: "1rem",
                }}
              >
                {project.title}
              </h4>
              <p
                style={{
                  color: "#d1d5db",
                  marginBottom: "1rem",
                  textAlign: "left",
                  fontSize: "0.9rem",
                }}
              >
                {project.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.25rem",
                  marginBottom: "1rem",
                }}
              >
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      background: "rgba(139, 92, 246, 0.1)",
                      color: "#8b5cf6",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "10px",
                      fontSize: "0.7rem",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {project.showLiveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "#3b82f6",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    <FontAwesomeIcon icon={faExternalLinkAlt} /> Live Demo
                  </a>
                )}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#8b5cf6",
                    textDecoration: "none",
                    textAlign: "center",
                  }}
                >
                  <FontAwesomeIcon icon={faCode} /> View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
