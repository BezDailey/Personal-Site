import React from "react";

import githubMark from "../../images/github-mark.svg";
import linkedIn from "../../images/linkedin.png";

import Nav from "../Nav/Nav";
import styles from "./Header.module.css";

/**
 * Site header with identity block, bio, sidebar navigation (desktop),
 * social icons, and contact/resume links. Lives in the sticky sidebar
 * on desktop; renders as a dark block on mobile.
 * @param {Object} props
 * @param {string} props.activeSection - Currently active section key.
 * @param {function} props.setActiveSection - Callback to change the active section.
 * @returns {React.JSX.Element}
 */
const Header = ({ setActiveSection, activeSection }) => {
  return (
    <header className={styles.container}>
      <div className={styles.identity}>
        <h1 className={styles.header_title}>Jabez Dailey</h1>
        <h2 className={styles.header_text}>Software Engineer · Data · AI/ML</h2>
      </div>
      <p className={styles.bio}>
        Software engineer at Deloitte building full-stack products, data pipelines, and AI tools. Morehouse CS · GT OMSCS incoming Fall 2026.
      </p>
      <Nav
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        variant="sidebar"
      />
      <div className={styles.icons}>
        <a
          href="https://github.com/BezDailey"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.icon} src={githubMark} alt="Github Icon" />
        </a>
        <a
          href="https://www.linkedin.com/in/jabez-dailey-a13b71193/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className={styles.icon} src={linkedIn} alt="LinkedIn Icon" />
        </a>
      </div>
      <div className={styles.actions}>
        <a className={styles.action} href="mailto:jabezdailey@icloud.com">
          ✉ Get in touch
        </a>
        <a
          className={styles.action}
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          ↓ Resume
        </a>
      </div>
    </header>
  );
};

export default Header;
