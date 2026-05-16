import React from "react";

import githubMark from "../../images/github-mark.svg";
import linkedIn from "../../images/linkedin.png";

import styles from "./Header.module.css";

const Header = ({ setActiveSection, activeSection }) => {
  const getButtonClass = (value) => {
    return activeSection === value ? styles.active : "";
  };

  const handleButtonClick = (event) => {
    setActiveSection(event.currentTarget.value);
  };

  return (
    <header className={styles.container}>
      <div className={styles.identity}>
        <h1 className={styles.header_title}>Jabez Dailey</h1>
        <h2 className={styles.header_text}>Software Engineer · Data · AI/ML</h2>
      </div>
      <p className={styles.bio}>
        Software engineer at Deloitte building full-stack products, data pipelines, and AI tools. Morehouse CS · GT OMSCS incoming Fall 2026.
      </p>
      <div className={styles.links}>
        <button
          onClick={handleButtonClick}
          value="experience"
          className={`${styles.navBtn} ${getButtonClass("experience")}`}
        >
          <span className={styles.dotOutline} />
          <span className={styles.navContent}>
            <span className={styles.navLabel}>Experience</span>
            <span className={styles.navSub}>Work history</span>
          </span>
        </button>
        <button
          onClick={handleButtonClick}
          value="projects"
          type="button"
          className={`${styles.navBtn} ${getButtonClass("projects")}`}
        >
          <span className={styles.dotOutline} />
          <span className={styles.navContent}>
            <span className={styles.navLabel}>Projects</span>
            <span className={styles.navSub}>Things I've built</span>
          </span>
        </button>
        <button
          onClick={handleButtonClick}
          value="skills"
          type="button"
          className={`${styles.navBtn} ${getButtonClass("skills")}`}
        >
          <span className={styles.dotOutline} />
          <span className={styles.navContent}>
            <span className={styles.navLabel}>Skills</span>
            <span className={styles.navSub}>Tech stack</span>
          </span>
        </button>
        <button
          onClick={handleButtonClick}
          value="blog"
          type="button"
          className={`${styles.navBtn} ${getButtonClass("blog")}`}
        >
          <span className={styles.dotOutline} />
          <span className={styles.navContent}>
            <span className={styles.navLabel}>Blog</span>
            <span className={styles.navSub}>Writing</span>
          </span>
        </button>
      </div>
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
      <button
        className={styles.adminLink}
        onClick={() => setActiveSection("admin")}
      >
        ⌘ Portal
      </button>
    </header>
  );
};

export default Header;
