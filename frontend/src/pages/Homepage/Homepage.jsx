import React from "react";
import {useState} from "react";

import styles from "./Homepage.module.css";

// Components
import Header from "../../components/Header/Header";
import Experience from "../../components/Experience/Experience";
import Projects from "../../components/Projects/Projects";
import Blog from "../../components/Blog/Blog";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("experience");

  return (
    <div>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <section className={styles.section}>
        {activeSection === "experience" && (
          <>
            <h1>Experience</h1>
            <Experience />
          </>
        )}
        {activeSection === "projects" && (
          <>
            <h1>Projects</h1>
            <Projects />
          </>
        )}
        {/*
        {activeSection === "certifications" && (
          <>
            <h1>Certifications</h1>
          </>
        )}
        {activeSection === "technical_skills" && (
          <>
            <h1>Technical Skills</h1>
          </>
        )}
        */}
        {activeSection === "blog" && (
          <>
            <h1>Blog</h1>
            <Blog />
          </>
        )}
      </section>
    </div>
  );
};

export default Homepage;
