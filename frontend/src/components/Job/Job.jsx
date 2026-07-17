import React from "react";

import styles from "./Job.module.css";

/**
 * Single work-history entry rendered as a flat row with a hover accent border.
 * @param {Object} props
 * @param {string} props.date - Date range string (e.g. "Jun 2024 - Present").
 * @param {string} props.title - Job title.
 * @param {string} props.employer - Company name.
 * @param {string} props.location - City/state or "Remote".
 * @param {string} props.description - Role summary paragraph.
 * @param {string[]} props.skills - Technologies used, shown as a `▸`-prefixed list.
 * @returns {React.JSX.Element}
 */
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
