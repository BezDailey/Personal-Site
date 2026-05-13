import React, { useState } from "react";
import styles from "./AdminPortal.module.css";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import Login from "../../components/Login/Login";

const projects = [
  {
    name: "Debt Payoff Tracker",
    description:
      "Track and visualize your path to financial freedom. Manage multiple debts using snowball or avalanche payoff strategies.",
    tech: ["React", "Flask", "Python"],
    status: "in-progress",
    url: null,
  },
];

const AdminPortal = () => {
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
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </div>
  );
};

export default AdminPortal;
