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
      name: "Threaded Producer Consumer Lab",
      year: "2023",
      description: "Built a concurrent producer-consumer pipeline in C using POSIX threads, mutexes, and semaphores. Focused on safe shared-memory access and avoiding race conditions under high throughput.",
      skills: [
        "C",
      ],
      github: "https://github.com/BezDailey/Threaded-Producer-Consumer-Lab",
    },
    {
      name: "HTTP Server",
      year: "2023",
      description: "Implemented an HTTP/1.1 server from scratch in C. Handles GET requests, parses headers, serves static files, and returns proper status codes — no frameworks, just sockets.",
      skills: [
        "C"
      ],
      github: "https://github.com/BezDailey/HttpServer",
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
          />
        ))}
    </div>
  );
};

export default Projects;
