import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
    {
      name: "MyGuitarShop Web Application",
      year: 2020,
      description:
        "In our two-person team, we developed a full stack web application using a combination of PHP, HTML, CSS, MySQL, and phpMyAdmin, which provided us with a robust platform for both front-end and back-end development. I was also responsible for integrating email functionality using the PHPMailer library, configuring it to send emails through Google's Gmail SMTP server.",
      skills: [
        "PHP",
        "HTML",
        "CSS",
        "MySQL",
        "phpMyAdmin",
        "PHPMailer Library",
      ],
      github: "https://github.com/BezDailey/MyGuitarShop",
    },
  ];
  return (
    <div className={styles.projects}>
      {projects
        .sort((a, b) => a.year - b.year)
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
