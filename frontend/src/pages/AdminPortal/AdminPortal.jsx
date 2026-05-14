import React, { useState } from "react";
import styles from "./AdminPortal.module.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Login from "../../components/Login/Login";

const projects = [
  {
    name: "Debt Payoff Tracker",
    description:
      "Track multiple debts, choose avalanche or snowball strategies, log payments, run what-if calculators, and visualize your path to financial freedom.",
    tech: ["Node.js", "Express", "React"],
    status: "live",
    internalRoute: "debt-tracker",
  },
  {
    name: "Pomodoro Timer",
    description:
      "Focus sessions with task tracking, session logging, and daily metrics — all persisted to the database.",
    tech: ["React", "PostgreSQL"],
    status: "live",
    internalRoute: "pomodoro",
  },
];

const AdminPortal = ({ setActiveSection }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!sessionStorage.getItem("adminToken")
  );

  const handleLogin = async (username, password) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem("adminToken", token);
        setIsAuthenticated(true);
        return true;
      }
    } catch (err) {
      // network error
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={styles.portal}>
      <div className={styles.header}>
        <span className={styles.label}>— Admin Portal</span>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>My Projects</h1>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Sign out
          </button>
        </div>
        <p className={styles.subtitle}>Personal launchpad for hosted applications</p>
      </div>
      <div className={styles.grid}>
        {projects.map((project) => (
          <ProjectCard
            key={project.name}
            {...project}
            onLaunch={
              project.internalRoute
                ? () => setActiveSection(project.internalRoute)
                : null
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPortal;
