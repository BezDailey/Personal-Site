import React from "react";

import githubMark from "../../images/github-mark.svg";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.container}>
      <h1 className={styles.header_title}>Jabez Dailey</h1>
      <h2 className={styles.header_text}>Aspiring Software Engineer</h2>
      <p>
        I am a Senior Computer Science Student at Morehouse College passionate
        about software development, artificial intelligence, and web
        technologies. Welcome to my personal website!
      </p>
      <div>
        <a
          href="https://github.com/BezDailey"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className={styles.githubIcon}
            src={githubMark}
            alt="Github Icon"
          />
        </a>
      </div>
    </header>
  );
};

export default Header;
