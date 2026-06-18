import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
    {
      name: "Personal Site",
      year: "2023",
      description: "This site, built from scratch in React with no UI framework. Features a custom design system, a blog with expandable posts, and an admin portal for content management backed by Node.js and PostgreSQL.",
      skills: [
        "React",
        "Node.js",
        "PostgreSQL",
        "CSS",
      ],
      github: "https://github.com/BezDailey/Personal-Site",
      website: "https://www.jabezdailey.com",
    },
    {
      name: "Kingdom Call Global",
      year: "2025",
      description: "Production website for a Tampa-area ministry organization. Built with React 19 and Vite, featuring a custom design system (token-based CSS), React Router for multi-page navigation, and a photo gallery with keyboard navigation.",
      skills: [
        "React",
        "Javascript",
        "Tailwind CSS",
        "React Router",
      ],
      github: "https://github.com/BezDailey/kingdom-call-global",
      website: "https://www.kingdomcallglobal.com",
    },
    {
      name: "Second Brain",
      year: "2026",
      description: "A RAG-powered study assistant that answers questions over a personal knowledge base. Built with a FastAPI backend, ChromaDB vector store, and a React frontend. Includes an evaluation pipeline to measure retrieval and answer quality.",
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
      description: "A standalone public data pipeline built on open-source tooling. Ingests a real-world dataset, transforms it with dbt, orchestrates daily runs with Airflow, and exposes a live dashboard. One-command setup with Docker Compose.",
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
