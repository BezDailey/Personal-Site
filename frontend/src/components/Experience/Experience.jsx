import React from "react";

import styles from "./Experience.module.css";

import Job from "../Job/Job";

const Experience = () => {
  const experiences = [
    {
      date: "May 2023 - August 2023",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "San Francisco, CA",
      description:
        "During my internship, I enhanced the Out of Office feature of a web application using Hacklang and React, significantly improving its reliability and user interface, which included reducing visual clutter by 25%. My contributions led to a 20% increase in user engagement and a 30% reduction in page load time.",
      skills: [
        "Hacklang",
        "React",
        "TypeScript",
        "Software Testing",
        "UI/UX Design",
        "Project Management",
      ],
    },
    {
      date: "September 2022 - December 2022",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "Atlanta, GA",
      description:
        "In my internship, I developed and deployed a custom Slackbot that automated repetitive tasks, leading to a 30% reduction in manual effort and significantly enhancing communication efficiency. I also streamlined the onboarding process and improved user experience by creating comprehensive documentation and integrating API calls for better accessibility and collaboration within Slack channels.",
      skills: [
        "Python",
        "API Integration",
        "Technical Writing",
        "Project Management",
        "UI/UX Design",
        "Technical Communication",
      ],
    },
    {
      date: "June 2021 - August 2022",
      title: "Software Facing Technical Support Intern",
      employer: "IBM",
      location: "Atlanta, GA",
      description:
        "During my internship at IBM, I produced and edited technical videos for clients using Camtasia and prepared for the delivery of Premium Support product welcome calls, ensuring a high-quality client experience. I also audited the client routing and handling process for IBM Premium Support Services, spearheaded the creation of a React component to facilitate data export for over 3000 employees, and engineered a Python script to analyze and compare large Excel sheets, significantly enhancing operational efficiency.",
      skills: [
        "Python",
        "Video Editing",
        "Client Communication and Support",
        "Quality Assurance",
        "Data Analysis",
        "Technical Presentation",
      ],
    },
    {
      date: "June 2019 - August 2019",
      title: "Teacher Assistant",
      employer: "TheClubHou.se",
      location: "Augusta, GA",
      description:
        "During my internship, I mentored over 20 students in web development, focusing on debugging code in JavaScript, HTML, CSS, Node.js, and MySQL, thereby enhancing their skills in these areas. I also collaborated with a team of teaching assistants to optimize the mock interview process, achieving a 30% reduction in assessment time, and developed a web application using HTML and CSS to effectively monitor and analyze student attendance.",
      skills: [
        "JavaScript",
        "HTML",
        "CSS",
        "Node.js",
        "MySQL",
        "Mentoring",
        "Process Optimization",
        "Communication",
      ],
    },
  ];

  return (
    <div className={styles.experiences}>
      {experiences.map((experience) => (
        <Job
          date={experience.date}
          title={experience.title}
          employer={experience.employer}
          location={experience.location}
          description={experience.description}
          skills={experience.skills}
        />
      ))}
    </div>
  );
};

export default Experience;
