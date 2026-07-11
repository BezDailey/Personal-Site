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
      description: "Own end-to-end delivery across three concurrent workstreams: architect and maintain ETL pipelines on Databricks and PySpark processing 10,000+ records per batch for CDC’s AR Lab Network, build and ship 30+ React components and data visualizations for a platform serving 100,000+ users, and develop AI tooling for Deloitte’s internal Agentic AI Analyst.",
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
      description: "Designed and built a full-stack LLM-powered SQL optimization tool end-to-end — integrated OpenAI’s API into a Flask backend, built the React frontend, and delivered a 40% improvement in query efficiency.",
      skills: [
        "OpenAI LLMs",
        "Flask",
        "React",
        "Python",
        "SQL",
      ],
    },
    {
      date: "Jan 2024 - May 2024",
      title: "Reinforcement Learning Researcher",
      employer: "Virginia Tech",
      location: "Remote",
      description: "Collaborated with Virginia Tech researchers to design and build a desktop application (Python, Tkinter) that translated complex reinforcement learning models for radio-frequency systems into tools accessible to non-expert users.",
      skills: [
        "Python",
        "Tkinter",
        "Reinforcement Learning",
        "Applied AI",
        "Human-Computer Interaction",
      ],
    },
    {
      date: "May 2023 - Aug 2023",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "San Francisco, CA",
      description: "Shipped production features for the Out of Office profile experience in Hacklang and React, including unit and integration tests. Independently diagnosed and resolved a customer-facing banner bug deployed to a large internal user base.",
      skills: [
        "Hacklang",
        "React",
        "TypeScript",
        "Unit & Integration Testing",
      ],
    },
    {
      date: "Sep 2022 - Dec 2022",
      title: "Software Engineer Intern",
      employer: "Salesforce",
      location: "Atlanta, GA",
      description: "Built and deployed a Python Slackbot integrating the Slack API and Block Kit with internal REST APIs to automate team information lookups across Slack channels. Authored documentation to support team onboarding and adoption.",
      skills: [
        "Python",
        "Slack API",
        "REST APIs",
        "Technical Writing",
      ],
    },
    {
      date: "Jun 2021 - Aug 2022",
      title: "Technical Support Engineering Intern",
      employer: "IBM",
      location: "Remote",
      description: "Built a React component enabling data export for 3,000+ employees and wrote Python scripts to automate analysis of large datasets. Audited IBM’s Premium Support client routing process and produced technical onboarding materials.",
      skills: [
        "Python",
        "React",
        "Data Analysis",
        "Process Improvement",
      ],
    },
    {
      date: "Jun 2019 - Aug 2019",
      title: "Teaching Assistant",
      employer: "TheClubHou.se",
      location: "Augusta, GA",
      description: "Mentored 20+ students in full-stack web development (JavaScript, Node.js, MySQL) with a focus on debugging and problem solving. Built a web app to track student attendance and helped design a mock-interview assessment process.",
      skills: [
        "JavaScript",
        "Node.js",
        "MySQL",
        "Mentorship",
      ],
    },
  ];

  return (
    <div className={styles.experiences}>
      {experiences.map((experience) => (
        <Job
          key={`${experience.title}-${experience.date}`}
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
