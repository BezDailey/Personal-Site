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
      description: "Design and ship ETL pipelines on Databricks and PySpark processing 10,000+ records per batch for CDC's AR Lab Network. Also built 30+ React components and data visualizations for a platform serving 100,000+ users, and developed AI tooling for Deloitte's internal Agentic AI Analyst.",
      skills: [
        "React",
        "Python",
        "Databricks",
        "PySpark",
        "Node.js",
        "PostgreSQL",
      ]
    },
    {
      date: "Feb 2024 - May 2024",
      title: "Software Engineer Intern",
      employer: "McKinsey & Company",
      location: "Remote",
      description: "Built an LLM-powered SQL optimization tool that improved query efficiency by 40%, using OpenAI’s API, a Flask backend, and a React frontend. Owned the full stack from API integration to UI.",
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
      location: "Remote",
      description: "Built and iterated on a desktop GUI (Python, Tkinter) for a reinforcement learning application in radio-frequency systems, working with Virginia Tech researchers to translate complex RL models into tools accessible to non-expert users.",
      skills: [
        "Python",
        "Tkinter",
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
      description: "Built and shipped production features for the Out of Office profile experience in Hacklang and React, including unit and integration tests that improved feature reliability. Resolved a customer-facing banner issue and deployed to a large internal user base.",
      skills: [
        "Hacklang",
        "React",
        "TypeScript",
        "Unit & Integration Testing",
        "Software Testing",
      ],
    },
    {
      date: "Aug 2023 - Dec 2023",
      title: "Research Participant",
      employer: "Spelman-Morehouse Directed Reading Program",
      location: "Atlanta, GA",
      description: "Worked with Dr. Sarah Chehade to study classical vs. quantum computation: qubits, logic gates, and quantum teleportation, grounded in linear algebra and probability. First research experience in theoretical CS.",
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
      description: "Built and deployed a Python Slackbot using the Slack API and Block Kit, integrating REST API calls to surface team information directly in Slack channels and automate routine lookups. Wrote documentation to support onboarding and adoption.",
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
      title: "Technical Support Engineering Intern",
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
      title: "Teaching Assistant",
      employer: "TheClubHou.se",
      location: "Augusta, GA",
      description: "Mentored 20+ students in web development (JavaScript, HTML/CSS, Node.js, MySQL) with a focus on debugging and hands-on problem solving. Built a web app to track and analyze student attendance and helped design a mock-interview assessment process.",
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
