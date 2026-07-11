import React from "react";
import Skill from "../Skill/Skill";
import styles from "./Skills.module.css";

// Re-add Kafka, Airflow, PyTorch once shipped in a real project
const skillGroups = [
  { label: "Languages", skills: ["Python", "JavaScript", "TypeScript", "SQL", "Java", "C#"] },
  { label: "Backend", skills: ["Node.js", "Express", "Flask", "REST APIs", "Drizzle ORM", "PostgreSQL", "MySQL"] },
  { label: "Frontend", skills: ["React", "Next.js", "D3/D3plus", "HTML", "CSS"] },
  { label: "Data Engineering", skills: ["PySpark", "Databricks", "dbt", "PostgreSQL"] },
  { label: "AI/ML", skills: ["RAG", "ChromaDB", "OpenAI API"] },
  { label: "Cloud & Tools", skills: ["Docker", "Git", "GitHub Actions", "CI/CD", "Azure"] },
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
