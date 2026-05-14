import React from "react";
import githubMark from "../../images/github-mark.svg";
import Skill from "../../components/Skill/Skill";
import styles from "./Project.module.css";

const Project = ({ name, year, description, skills, github, comingSoon }) => {
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
        {comingSoon ? (
          <span className={styles.comingSoonBadge}>In Progress</span>
        ) : (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img className={styles.icon} src={githubMark} alt="Github Icon" />
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
