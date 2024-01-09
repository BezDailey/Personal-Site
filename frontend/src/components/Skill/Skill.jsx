import React from "react";

import styles from "./Skill.module.css";

const Skill = ({ name }) => {
  return (
    <div className={styles.skill}>
      <p className={styles.text}>{name}</p>
    </div>
  );
};

export default Skill;
