import React from "react";
import styles from "./ProjectCard.module.css";

const STATUS_LABELS = {
  live: "Live",
  "in-progress": "In Progress",
  planned: "Planned",
};

/**
 * Admin portal project card with status indicator and launch action.
 * Supports "live", "in-progress", and "planned" statuses.
 * @param {Object} props
 * @param {string} props.name - Project name.
 * @param {string} props.description - Short project description.
 * @param {string[]} props.tech - Technology tags.
 * @param {"live"|"in-progress"|"planned"} props.status - Current project status.
 * @param {string} [props.url] - External link URL (used when no onLaunch handler).
 * @param {function} [props.onLaunch] - Click handler for the launch button.
 * @returns {React.JSX.Element}
 */
const ProjectCard = ({ name, description, tech, status, url, onLaunch }) => {
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

        {onLaunch ? (
          <button className={styles.launchBtn} onClick={onLaunch} type="button">
            Launch →
          </button>
        ) : url ? (
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
