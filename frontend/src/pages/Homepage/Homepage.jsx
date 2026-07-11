import React from "react";
import {useState} from "react";

import styles from "./Homepage.module.css";

// Components
import Header from "../../components/Header/Header";
import Nav from "../../components/Nav/Nav";
import Experience from "../../components/Experience/Experience";
import Projects from "../../components/Projects/Projects";
import Skills from "../../components/Skills/Skills";
import Footer from "../../components/Footer/Footer";

const Homepage = () => {
  const [activeSection, setActiveSection] = useState("experience");

  return (
    <div>
      <div className={styles.layout}>
        <div className={styles.sidebar}>
          <Header
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        </div>
        <Nav
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          variant="bar"
        />
        <section className={styles.section}>
          <div key={activeSection} className={styles.fade}>
            {activeSection === "experience" && <Experience />}
            {activeSection === "projects" && <Projects />}
            {activeSection === "skills" && <Skills />}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Homepage;
