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
import "./Contact.css";

const Contact = () => {
  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email",
      value: "amiller192003@gmail.com",
      link: "mailto:amiller192003@gmail.com",
    },
    {
      icon: faPhone,
      title: "Phone",
      value: "616-843-4054",
      link: "tel:6168434054",
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
    <section id="contact" className="contact-section section">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-intro">
          I'm always interested in new opportunities and exciting projects.
          Whether you have a question or just want to say hi, feel free to
          reach out!
        </p>

        <div className="contact-panel">
          <h3 className="contact-panel-title">Contact Information</h3>

          <div className="contact-cards">
            {contactInfo.map((info, index) => (
              <div className="contact-card" key={index}>
                <div className="contact-icon" aria-hidden>
                  <FontAwesomeIcon icon={info.icon} />
                </div>
                <div className="contact-text">
                  <h4 className="contact-info-title">{info.title}</h4>
                  <div className="contact-info-value">
                    {info.link ? (
                      <a href={info.link}>{info.value}</a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="contact-panel-title" style={{ marginTop: "2rem" }}>
            Follow Me
          </h3>
          <div className="social-links">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label={social.name}
                style={{ ["--social-color"]: social.color }}
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
