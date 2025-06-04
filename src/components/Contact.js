import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email",
      value: "amiller192003@gmail.com",
      link: "mailto:amiller192003@gmail.com",
    },
    // {
    //   icon: faPhone,
    //   title: "Phone",
    //   value: "+1 (555) 123-4567",
    //   link: "tel:+15551234567",
    // },
    {
      icon: faMapMarkerAlt,
      title: "Location",
      value: "Grand Rapids, MI",
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: faLinkedin,
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/alex-jacob-miller/",
      color: "#0077b5",
    },
    {
      icon: faGithub,
      name: "GitHub",
      url: "https://github.com/alex-j-miller",
      color: "#333",
    },
  ];

  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p
          style={{
            color: "#a1a1aa",
            fontSize: "1.1rem",
            marginBottom: "4rem",
            maxWidth: "600px",
            margin: "0 auto 4rem",
          }}
        >
          I'm always interested in new opportunities and exciting projects.
          Whether you have a question or just want to say hi, feel free to reach
          out!
        </p>

        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h3
            style={{
              fontSize: "1.5rem",
              color: "#3b82f6",
              marginBottom: "3rem",
            }}
          >
            Contact Information
          </h3>
          <div style={{ marginBottom: "4rem" }}>
            {contactInfo.map((info, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                  marginBottom: "2rem",
                  padding: "1rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.borderColor = "#3b82f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor =
                    "rgba(255, 255, 255, 0.1)";
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(59, 130, 246, 0.3)",
                  }}
                >
                  <FontAwesomeIcon
                    icon={info.icon}
                    style={{ color: "#3b82f6", fontSize: "1.2rem" }}
                  />
                </div>
                <div style={{ textAlign: "left" }}>
                  <h4
                    style={{
                      color: "#ffffff",
                      marginBottom: "0.25rem",
                      fontSize: "1.1rem",
                    }}
                  >
                    {info.title}
                  </h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      style={{
                        color: "#a1a1aa",
                        textDecoration: "none",
                        fontSize: "1rem",
                      }}
                      onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                      onMouseLeave={(e) => (e.target.style.color = "#a1a1aa")}
                    >
                      {info.value}
                    </a>
                  ) : (
                    <span style={{ color: "#a1a1aa", fontSize: "1rem" }}>
                      {info.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <h3
            style={{
              fontSize: "1.5rem",
              color: "#3b82f6",
              marginBottom: "2rem",
            }}
          >
            Follow Me
          </h3>
          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
            }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "60px",
                  height: "60px",
                  background: "rgba(255, 255, 255, 0.05)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a1a1aa",
                  textDecoration: "none",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  fontSize: "1.2rem",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = social.color;
                  e.target.style.color = "white";
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow = `0 10px 20px ${social.color}30`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "rgba(255, 255, 255, 0.05)";
                  e.target.style.color = "#a1a1aa";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <FontAwesomeIcon icon={social.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
