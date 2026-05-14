import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
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
      name: "Reinforcement Learning Agent",
      year: "2026",
      description: "Training an RL agent to solve a continuous control task using policy gradient methods. Builds on research from my time at Virginia Tech, where I worked on applying RL to real-world environments.",
      skills: [
        "Python",
        "PyTorch",
        "OpenAI Gym",
      ],
      comingSoon: true,
    },
    {
      name: "Real-Time Data Pipeline",
      year: "2026",
      description: "End-to-end streaming pipeline that ingests, transforms, and surfaces data in a live dashboard. Applying patterns from ETL work at Deloitte using open-source tooling.",
      skills: [
        "Python",
        "PySpark",
        "Docker",
      ],
      comingSoon: true,
    },
    {
      name: "Computer Vision Web App",
      year: "2026",
      description: "A web app that runs object detection on uploaded images or a live camera feed. Packages a fine-tuned vision model behind a REST API with a React frontend.",
      skills: [
        "Python",
        "React",
        "PyTorch",
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
            comingSoon={project.comingSoon}
          />
        ))}
    </div>
  );
};

export default Projects;
