import React from "react";
import githubMark from "../../images/github-mark.svg";
import styles from "./Project.module.css";

/**
 * Project card with hover elevation effect, skill list, and optional
 * GitHub/website links. Shows a "Building" badge when `comingSoon` is true.
 * @param {Object} props
 * @param {string} props.name - Project name.
 * @param {string} props.year - Year the project was started or shipped.
 * @param {string} props.description - Project summary paragraph.
 * @param {string[]} props.skills - Technologies used, shown as a `▸`-prefixed list.
 * @param {string} [props.github] - GitHub repository URL.
 * @param {string} [props.website] - Live site URL.
 * @param {boolean} [props.comingSoon] - If true, displays a "Building" badge.
 * @returns {React.JSX.Element}
 */
const Project = ({ name, year, description, skills, github, website, comingSoon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.name}>{name}</h2>
        <div className={styles.meta}>
          {comingSoon && (
            <span className={styles.buildingBadge}>Building</span>
          )}
          <span className={styles.year}>{year}</span>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <p className={styles.skills}>
          ▸ {skills.join(" · ")}
        </p>
        {(website || github) && (
          <div className={styles.links}>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer" className={styles.link}>
                <img className={styles.icon} src={githubMark} alt="Github" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
