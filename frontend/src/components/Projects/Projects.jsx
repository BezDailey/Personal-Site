import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
    {
      name: "Kingdom Call Global",
      year: "2025 - Present",
      description: "Production website for a Tampa-area ministry organization. Built with React 19 and Vite, featuring a custom design system (token-based CSS), React Router for multi-page navigation, and a photo gallery with keyboard navigation. Deployed and live on Heroku.",
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
      year: "2023 - Present",
      description: "My personal portfolio — built from scratch in React with no UI framework. Features a custom design system, a blog with expandable posts, and an admin portal for content management.",
      skills: [
        "React",
        "Javascript",
        "HTML5",
        "CSS",
      ],
      github: "https://github.com/BezDailey/Personal-Site",
    },
    {
      name: "Browser Game with RL Opponent",
      year: "2026",
      description: "A web-based game built in React where visitors can play against a trained RL agent. The agent is trained using policy gradient methods and served via a lightweight API — no installs, just open and play.",
      skills: [
        "React",
        "Python",
        "PyTorch",
      ],
      comingSoon: true,
    },
    {
      name: "Gesture-Controlled Game Input",
      year: "2026",
      description: "Webcam-based gesture detection that maps hand or body movements to game controls. A vision model runs in the browser to interpret input in real time, replacing the keyboard for a more interactive experience.",
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
      description: "A real-time data pipeline that tracks scores, session data, and RL model win rates as people play. Feeds a live leaderboard so there's something at stake every time someone sits down to play.",
      skills: [
        "Python",
        "PySpark",
        "Docker",
      ],
      comingSoon: true,
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
