import React from "react";
import githubMark from "../../images/github-mark.svg";
import linkedIn from "../../images/linkedin.png";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.container}>
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
      <div className={styles.right}>
        <p className={styles.credit}>Jabez Dailey</p>
      </div>
    </footer>
  );
};

export default Footer;
