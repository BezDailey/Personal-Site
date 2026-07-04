import React from "react";

import styles from "./Job.module.css";

const Job = ({date, title, employer, location, description, skills}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <h3 className={styles.employer}>
            {employer} · {location}
          </h3>
        </div>
        <span className={styles.date}>{date}</span>
      </div>
      <p className={styles.description}>{description}</p>
      <p className={styles.skills}>
        ▸ {skills.join(" · ")}
      </p>
    </div>
  );
};

export default Job;
