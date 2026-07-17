import React from "react";

import styles from "./Skill.module.css";

/**
 * Individual skill pill with a muted background and monospace text.
 * @param {Object} props
 * @param {string} props.name - Skill label to display.
 * @returns {React.JSX.Element}
 */
const Skill = ({ name }) => {
  return (
    <div className={styles.skill}>
      <span className={styles.text}>{name}</span>
    </div>
  );
};

export default Skill;
