import React from "react";

import styles from "./Skill.module.css";

const Skill = ({ name }) => {
  return (
    <div className={styles.skill}>
      <span className={styles.text}>{name}</span>
    </div>
  );
};

export default Skill;
