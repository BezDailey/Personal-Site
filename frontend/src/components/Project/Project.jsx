import React from "react";
import githubMark from "../../images/github-mark.svg";
import Skill from "../../components/Skill/Skill";
import styles from "./Project.module.css";

const Project = ({ name, year, description, skills, github, website, comingSoon }) => {
  return (
    <div className={`${styles.card} ${comingSoon ? styles.cardComingSoon : ""}`}>
      <p className={styles.year}>{year}</p>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.footer}>
        <div className={styles.skills}>
          {skills.map((skill, index) => (
            <Skill name={skill} key={index} />
          ))}
        </div>
        {comingSoon && (
          <span className={styles.comingSoonBadge}>In Progress</span>
        )}
        {(website || github) && (
          <div className={styles.links}>
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" aria-label="Live site">
                <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            )}
            {github && (
              <a href={github} target="_blank" rel="noopener noreferrer">
                <img className={styles.icon} src={githubMark} alt="Github Icon" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Project;
