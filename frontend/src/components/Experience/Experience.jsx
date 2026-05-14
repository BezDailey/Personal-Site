import React from "react";

import styles from "./Experience.module.css";

import Job from "../Job/Job";

const Experience = () => {
  const experiences = [
    {
      date: "Jun 2024 - Present",
      title: "Software Engineer",
      employer: "Deloitte",
      location: "Atlanta, GA",
      description: "Build and ship full-stack features across client and internal products using React and Node.js. Contributed to a firm initiative applying computer vision to autonomous ground vehicle navigation, and conduct AI readiness audits to surface integration opportunities for clients. Design and optimize large-scale ETL pipelines on Databricks with PySpark.",
      skills: [
        "React",
        "Node.js",
        "Python",
        "Databricks",
        "PySpark",
        "Computer Vision",
      ]
    },
    {
      date: "Feb 2024 - May 2024",
      title: "Software Engineer Intern",
      employer: "McKinsey & Company",
      location: "Atlanta, GA",
      description: "Built an LLM-powered SQL optimization tool that improved query efficiency by 40%, using OpenAI’s API, a Flask backend, and a React frontend. Delivered the full stack from API integration to UI in a fast-paced consulting environment.",
      skills: [
        "OpenAI LLMs",
        "Flask",
        "React",
        "Python",
        "SQL Databases",
      ],
    },
    {
      date: "Jan 2024 - May 2024",
      title: "Reinforcement Learning Researcher",
      employer: "Virginia Tech",
      location: "Atlanta, GA",
      description: "Built and iterated on the frontend of a reinforcement learning application for radio frequency systems, working alongside Virginia Tech researchers to translate complex RL models into tools accessible to non-expert users.",
      skills: [
        "React",
        "Reinforcement Learning",
        "Applied AI",
        "Human-Computer Interaction",
        "Radio Systems",
      ],
    },
    {
      date: "May 2023 - Aug 2023",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "San Francisco, CA",
      description: "Redesigned and refactored the Out of Office feature in Hacklang and React, cutting visual clutter by 25%, boosting user engagement by 20%, and reducing page load time by 30%. Shipped production code to a large internal user base within weeks of onboarding.",
      skills: [
        "Hacklang",
        "React",
        "TypeScript",
        "UI/UX Design",
        "Software Testing",
      ],
    },
    {
      date: "Aug 2023 - Dec 2023",
      title: "Research Participant",
      employer: "Spelman-Morehouse Directed Reading Program",
      location: "Atlanta, GA",
      description: "Worked with Dr. Sarah Chehade to explore classical vs. quantum computation, studying qubits, logic gates, and quantum teleportation through the lens of linear algebra and probability. Gained hands-on research experience at the intersection of theoretical CS and emerging quantum technologies.",
      skills: [
        "Quantum Computing",
        "Linear Algebra",
        "Quantum Logic Gates",
        "Quantum Teleportation",
        "Research",
      ],
    },
    {
      date: "Sep 2022 - Dec 2022",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "Atlanta, GA",
      description: "Designed and deployed a Slackbot that automated repetitive workflows, cutting manual effort by 30% across the team. Improved the onboarding experience by writing technical documentation and building API integrations that made shared Slack channels more accessible.",
      skills: [
        "Python",
        "Slack API",
        "API Integration",
        "Technical Writing",
        "Automation",
      ],
    },
    {
      date: "Jun 2021 - Aug 2022",
      title: "Technical Support Engineer Intern",
      employer: "IBM",
      location: "Atlanta, GA",
      description: "Built a React component enabling data export for over 3,000 employees and wrote Python scripts to automate analysis of large Excel datasets. Audited IBM’s Premium Support client routing process and produced technical onboarding videos for clients.",
      skills: [
        "Python",
        "React",
        "Data Analysis",
        "Quality Assurance",
        "Client Support",
      ],
    },
    {
      date: "Jun 2019 - Aug 2019",
      title: "Teacher Assistant",
      employer: "TheClubHou.se",
      location: "Augusta, GA",
      description: "Mentored 20+ students in web development — JavaScript, HTML/CSS, Node.js, and MySQL — with a focus on debugging and hands-on problem solving. Helped cut mock interview assessment time by 30% and built a web app to track student attendance.",
      skills: [
        "JavaScript",
        "HTML",
        "CSS",
        "Node.js",
        "MySQL",
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
