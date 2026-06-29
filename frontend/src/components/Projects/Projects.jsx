import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
    {
      name: "Second Brain",
      year: "2026",
      description: "RAG-powered study assistant that answers questions over a personal knowledge base. FastAPI backend with ChromaDB for vector search, React frontend, and an evaluation pipeline that measures retrieval precision and answer quality.",
      skills: [
        "Python",
        "FastAPI",
        "React",
        "RAG",
        "ChromaDB",
      ],
      comingSoon: true,
      // TODO: add github and website URLs when available
    },
    {
      name: "End-to-End Data Pipeline",
      year: "2026",
      description: "Standalone data pipeline ingesting a real-world dataset, transforming it with dbt, orchestrating daily runs with Airflow, and exposing a live dashboard. Fully containerized with Docker Compose for one-command setup.",
      skills: [
        "Python",
        "dbt",
        "Airflow",
        "PostgreSQL",
        "Docker",
      ],
      comingSoon: true,
      // TODO: add github and website URLs when available
    },
    {
      name: "Kingdom Call Global",
      year: "2025",
      description: "Production website for a ministry organization. Built with React 19 and Vite, featuring a token-based design system, React Router for multi-page navigation, and a photo gallery with keyboard navigation.",
      skills: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Vite",
      ],
      github: "https://github.com/BezDailey/kingdom-call-global",
      website: "https://www.kingdomcallglobal.com",
    },
    {
      name: "Personal Site",
      year: "2023",
      description: "Full-stack portfolio site built from scratch — custom design system with no UI framework, an admin portal with JWT authentication, and a Node.js/PostgreSQL backend for content management.",
      skills: [
        "React",
        "Node.js",
        "PostgreSQL",
        "JWT Auth",
      ],
      github: "https://github.com/BezDailey/Personal-Site",
      website: "https://www.jabezdailey.com",
    },
  ];
  return (
    <div className={styles.projects}>
      {projects.map((project) => (
          <Project
            name={project.name}
            year={project.year}
            description={project.description}
            skills={project.skills}
            github={project.github}
            website={project.website}
            comingSoon={project.comingSoon}
          />
        ))}
    </div>
  );
};

export default Projects;
