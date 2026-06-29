import React from "react";
import {useState} from "react";

import styles from "./Homepage.module.css";

// Components
import Header from "../../components/Header/Header";
import Experience from "../../components/Experience/Experience";
import Projects from "../../components/Projects/Projects";
import Blog from "../../components/Blog/Blog";
import Skills from "../../components/Skills/Skills";
import Footer from "../../components/Footer/Footer";
import AdminPortal from "../AdminPortal/AdminPortal";
import DebtTracker from "../DebtTracker/DebtTracker";
import Pomodoro from "../Pomodoro/Pomodoro";

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
        <section className={styles.section}>
          {activeSection === "experience" && <Experience />}
          {activeSection === "projects" && <Projects />}
          {activeSection === "skills" && <Skills />}
          {activeSection === "admin" && <AdminPortal setActiveSection={setActiveSection} />}
          {activeSection === "debt-tracker" && <DebtTracker setActiveSection={setActiveSection} />}
          {activeSection === "pomodoro" && <Pomodoro setActiveSection={setActiveSection} />}
        </section>
      </div>
      <Footer setActiveSection={setActiveSection} />
    </div>
  );
};

export default Homepage;
