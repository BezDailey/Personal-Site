import React from "react";

import githubMark from "../../images/github-mark.svg";

import Skill from "../../components/Skill/Skill";

import styles from "./Project.module.css";

const Project = ({ name, year, description, skills, github }) => {
  return (
    <div className={styles.project}>
      <h1>{name}</h1>
      <h2>{year}</h2>
      <p>{description}</p>
      <div className={styles.skills}>
        {skills.map((name, index) => (
          <Skill name={name} key={index} />
        ))}
      </div>
      <div>
        <a href={github} target="_blank" rel="noopener noreferrer">
          <img className={styles.icon} src={githubMark} alt="Github Icon" />
        </a>
      </div>
    </div>
  );
};

export default Project;
