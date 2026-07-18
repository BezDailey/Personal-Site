import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

/**
 * Projects section listing portfolio projects as Project cards.
 * Data is hardcoded as an array of project objects (not from a CMS).
 * @returns {React.JSX.Element}
 */
const Projects = () => {
  const projects = [
    {
      name: "Obsidian Projects Board",
      year: "2026",
      description: "Custom Obsidian plugin that reads from a local SQLite database and renders kanban and roadmap views directly inside the vault. Desktop only, using native Node.js modules via Electron for zero-latency, offline-first project management.",
      skills: [
        "TypeScript",
        "Obsidian API",
        "better-sqlite3",
        "esbuild",
      ],
      github: "https://github.com/BezDailey/obsidian-projects-board",
    },
    {
      name: "Second Brain",
      year: "2026",
      description: "RAG-powered knowledge system over my Obsidian vault. Ingests notes to make concepts, daily logs, and learning plans searchable and conversational. Includes an annotation evaluation pipeline that measures retrieval precision and answer quality.",
      skills: [
        "Python",
        "FastAPI",
        "LlamaIndex",
        "ChromaDB",
        "React",
      ],
      github: "https://github.com/BezDailey/SecondBrain",
    },
    {
      name: "Debt Tracker",
      year: "2026",
      description: "Full-stack personal finance app that models debt payoff strategies (snowball & avalanche), projects interest, and forecasts payoff dates across accounts. Exposes both a REST API and a CLI, backed by a type-safe Prisma + SQLite data layer with amortization logic built from scratch.",
      skills: [
        "Node.js",
        "Express",
        "React",
        "Vite",
        "Prisma",
        "SQLite",
      ],
      github: "https://github.com/BezDailey/Debt-Tracker",
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
            key={project.name}
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
