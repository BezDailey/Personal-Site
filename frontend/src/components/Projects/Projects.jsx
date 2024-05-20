import React from "react";

import styles from "./Projects.module.css";

import Project from "../../components/Project/Project";

const Projects = () => {
  const projects = [
    {
      name: "Personal Site",
      year: "2023 - Present",
      description: "Developed a personal website showcasing professional and personal projects using JavaScript, enhancing my skills in frontend development and web design. The site includes various interactive elements and responsive design to ensure a seamless user experience.",
      skills: [
        "React",
        "Javascript",
        "HTML5",
        "CSS",
      ],
      github: "https://github.com/BezDailey/Personal-Site",
    },
    {
      name: "Budgeting App - Frontend",
      year: "2023 - Present",
      description: "Built the responsive frontend for a budgeting app using React and JavaScript, focusing on enhancing user experience with a clean and intuitive interface.",
      skills: [
        "React",
        "JavaScript",
      ],
      github: "https://github.com/BezDailey/Budgeting-App-Frontend",
    },
    {
      name: "Budgeting App - Backend",
      year: "2023 - Present",
      description: "Developed the backend server using Python, implementing RESTful APIs to manage data efficiently and ensure smooth communication between the frontend and backend.",
      skills: [
        'Python',
        'Flask',
      ],
      github: "https://github.com/BezDailey/Budgeting-App-Backend",
    },
    {
      name: "Youtube Downloader",
      year: "2023",
      description: "Created a Python application for downloading YouTube videos, focusing on providing a user-friendly interface and functionality to handle various video formats and resolutions.",
      skills: [
        "Python",
      ],
      github: "https://github.com/BezDailey/YoutubeDownloader",
    },
    {
      name: "Voting Application",
      year: "2023",
      description: "Developed a JavaScript-based voting application, which processes votes in real-time, providing a robust and interactive platform for users to participate in polls and surveys.",
      skills: [
        "React",
        "JavaScript",
      ],
      github: "https://github.com/BezDailey/VotingApplication",
    },
    {
      name: "Threaded Producer Consumer Lab",
      year: "2023",
      description: "Implemented a multi-threaded producer-consumer lab in C to explore and demonstrate concurrency and threading concepts, ensuring efficient data processing and synchronization.",
      skills: [
        "C",
      ],
      github: "https://github.com/BezDailey/Threaded-Producer-Consumer-Lab",
    },
    {
      name: "HTTP Server",
      year: "2023",
      description: "Built an HTTP server in C, showcasing my understanding of server-client architecture, request handling, and response generation, while ensuring high performance and reliability.",
      skills: [
        "C"
      ],
      github: "https://github.com/BezDailey/HttpServer",
    },
    {
      name: "Dotfiles",
      year: "2023",
      description: "Personalized configurations for enhancing productivity using Vim Script, demonstrating expertise in customizing development environments and optimizing workflow.",
      skills: [
        "Vim Script",
      ],
      github: "https://github.com/BezDailey/Dotfiles",
    },
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
