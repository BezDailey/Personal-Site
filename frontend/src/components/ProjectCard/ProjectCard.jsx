import React from "react";
import styles from "./ProjectCard.module.css";

const STATUS_LABELS = {
  live: "Live",
  "in-progress": "In Progress",
  planned: "Planned",
};

const ProjectCard = ({ name, description, tech, status, url }) => {
  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.statusRow}>
        <span className={`${styles.statusDot} ${styles[status]}`} />
        <span className={styles.statusLabel}>{STATUS_LABELS[status]}</span>
      </div>

      <h2 className={styles.name}>{name}</h2>
      <p className={styles.description}>{description}</p>

      <div className={styles.footer}>
        <div className={styles.tech}>
          {tech.map((t) => (
            <span key={t} className={styles.tag}>{t}</span>
          ))}
        </div>

        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.launchBtn}
          >
            Launch →
          </a>
        ) : (
          <span className={styles.comingSoon}>Coming soon</span>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
