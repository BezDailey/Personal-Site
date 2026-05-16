import React from "react";
import Skill from "../Skill/Skill";
import styles from "./Skills.module.css";

const skillGroups = [
  { label: "Languages", skills: ["Python", "JavaScript", "SQL", "TypeScript"] },
  { label: "Data Engineering", skills: ["PySpark", "dbt", "Airflow", "Kafka", "PostgreSQL", "Docker"] },
  { label: "AI/ML", skills: ["PyTorch", "RAG", "ChromaDB", "OpenAI API"] },
  { label: "Frontend", skills: ["React", "Node.js", "HTML", "CSS"] },
  { label: "Cloud & Tools", skills: ["Databricks", "AWS", "Git"] },
];

const Skills = () => {
  return (
    <div className={styles.container}>
      {skillGroups.map((group) => (
        <div key={group.label} className={styles.group}>
          <span className={styles.groupLabel}>{group.label}</span>
          <div className={styles.pills}>
            {group.skills.map((skill) => (
              <Skill name={skill} key={skill} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
