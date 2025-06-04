import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: faLinkedin,
      url: "https://www.linkedin.com/in/alex-jacob-miller/",
      color: "#0077b5",
    },
    {
      icon: faGithub,
      url: "https://github.com/alex-j-miller",
      color: "#333",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      style={{
        background: "rgba(255, 255, 255, 0.02)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        padding: "3rem 0 2rem",
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontSize: "1.5rem",
                color: "#3b82f6",
                marginBottom: "1rem",
              }}
            >
              Alex Miller
            </h3>
            <p
              style={{
                color: "#a1a1aa",
                lineHeight: "1.6",
                marginBottom: "1rem",
              }}
            >
              Passionate software developer creating innovative solutions and
              exceptional user experiences with modern technologies.
            </p>
            <div style={{ display: "flex", gap: "1rem" }}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "rgba(255, 255, 255, 0.05)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#a1a1aa",
                    textDecoration: "none",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = social.color;
                    e.target.style.color = "white";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(255, 255, 255, 0.05)";
                    e.target.style.color = "#a1a1aa";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.2rem",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Quick Links
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {[
                "Home",
                "About",
                "Experience",
                "Education",
                "Projects",
                "Contact",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  style={{
                    color: "#a1a1aa",
                    textDecoration: "none",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                  onMouseLeave={(e) => (e.target.style.color = "#a1a1aa")}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              style={{
                fontSize: "1.2rem",
                color: "#ffffff",
                marginBottom: "1rem",
              }}
            >
              Contact Info
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              <a
                href="mailto:amiller192003@gmail.com"
                style={{
                  color: "#a1a1aa",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
                onMouseLeave={(e) => (e.target.style.color = "#a1a1aa")}
              >
                amiller192003@gmail.com
              </a>
              <span style={{ color: "#a1a1aa" }}>Grand Rapids, MI</span>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              color: "#a1a1aa",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            © {currentYear} Alex Miller. Made with{" "}
            <FontAwesomeIcon icon={faHeart} style={{ color: "#ef4444" }} />{" "}
            using React
          </p>

          <button
            onClick={scrollToTop}
            style={{
              background: "rgba(59, 130, 246, 0.1)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              color: "#3b82f6",
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#3b82f6";
              e.target.style.color = "white";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(59, 130, 246, 0.1)";
              e.target.style.color = "#3b82f6";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
