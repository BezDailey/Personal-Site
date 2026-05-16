import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
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
    },
    {
      name: "AI Study Assistant",
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
    },
    {
      name: "Browser Game with RL Opponent",
      year: "2026",
      description: "A web-based game built in React where visitors can play against a trained RL agent. The agent is trained using policy gradient methods and served via a lightweight Python API — no installs, just open and play.",
      skills: [
        "React",
        "Python",
        "PyTorch",
      ],
      comingSoon: true,
    },
    {
      name: "Live Game Leaderboard Pipeline",
      year: "2026",
      description: "A real-time data pipeline that ingests match events from the Pong game, aggregates them with PySpark Structured Streaming, and feeds a live leaderboard — updated in near real time as games are played.",
      skills: [
        "Python",
        "PySpark",
        "Kafka",
        "Docker",
      ],
      comingSoon: true,
    },
    {
      name: "Gesture-Controlled Game Input",
      year: "2026",
      description: "Webcam-based gesture detection that maps hand movements to game controls. MediaPipe detects hand landmarks in the browser in real time; a trained classifier maps landmark positions to paddle actions.",
      skills: [
        "React",
        "Python",
        "MediaPipe",
        "ONNX",
      ],
      comingSoon: true,
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
      name: "Personal Site",
      year: "2023",
      description: "This site — built from scratch in React with no UI framework. Features a custom design system, a blog with expandable posts, and an admin portal for content management backed by Node.js and PostgreSQL.",
      skills: [
        "React",
        "Node.js",
        "PostgreSQL",
        "CSS",
      ],
      github: "https://github.com/BezDailey/Personal-Site",
    },
  ];
  return (
    <div className={styles.projects}>
      {projects
        .sort((a, b) => b.year - a.year)
        .map((project) => (
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
