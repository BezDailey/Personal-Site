import React from "react";

import githubMark from "../../images/github-mark.svg";
import linkedIn from "../../images/linkedin.png";

import styles from "./Header.module.css";

const Header = ({ setActiveSection, activeSection }) => {
  const getButtonClass = (value) => {
    return activeSection === value ? styles.active : "";
  };

  const handleButtonClick = (event) => {
    setActiveSection(event.target.value);
  };

  return (
    <header className={styles.container}>
      <h1 className={styles.header_title}>Jabez Dailey</h1>
      <h2 className={styles.header_text}>Solutions Engineering Analyst @ Deloitte GPS</h2>
      <p>
      I am a recent Computer Science graduate from Morehouse College, passionate about software development, artificial intelligence, and web technologies. Welcome to my personal website!
      </p>
      <div className={styles.links}>
        <button
          onClick={handleButtonClick}
          value={"experience"}
          className={getButtonClass("experience")}
        >
          Experience
        </button>
        <button
          onClick={handleButtonClick}
          className={getButtonClass("projects")}
          value="projects"
          type="button"
        >
          Projects
        </button>
        {/*
        <button
          onClick={handleButtonClick}
          className={getButtonClass("certifications")}
          value="certifications"
          type="button"
        >
          Certifications
        </button>
        <button
          onClick={handleButtonClick}
          className={getButtonClass("technical_skills")}
          value="technical_skills"
          type="button"
        >
          Technical Skills
        </button>
        */}
        <button
          onClick={handleButtonClick}
          className={getButtonClass("blog")}
          value="blog"
          type="button"
        >
          Blog
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
    </header>
  );
};

export default Header;
