import React from "react";

import styles from "./Job.module.css";

import Skill from "../Skill/Skill";

const Job = ({ date, title, employer, location, description, skills }) => {
  return (
    <div>
      <h3 className={styles.date}>{date}</h3>
      <h1 className={styles.title}>{title}</h1>
      <h2 className={styles.employer}>
        {employer} &#x2022; {location}
      </h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.skills}>
        {skills.map((name, index) => (
          <Skill name={name} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Job;
