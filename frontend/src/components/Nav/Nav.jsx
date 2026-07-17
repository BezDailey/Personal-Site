import React from "react";

import styles from "./Nav.module.css";

const SECTIONS = [
  { value: "experience", label: "Experience", sub: "Work history" },
  { value: "projects", label: "Projects", sub: "Things I've built" },
  { value: "skills", label: "Skills", sub: "Tech stack" },
];

/**
 * Section navigation rendered in two variants: `"sidebar"` (vertical list
 * inside the desktop header) and `"bar"` (sticky horizontal tab bar on mobile).
 * Uses `event.currentTarget.value` for click handling since buttons contain
 * inner spans.
 * @param {Object} props
 * @param {string} props.activeSection - Currently active section key.
 * @param {function} props.setActiveSection - Callback to change the active section.
 * @param {"sidebar"|"bar"} props.variant - Layout variant.
 * @returns {React.JSX.Element}
 */
const Nav = ({ activeSection, setActiveSection, variant }) => {
  const handleButtonClick = (event) => {
    setActiveSection(event.currentTarget.value);
  };

  return (
    <nav className={styles[variant]}>
      {SECTIONS.map(({ value, label, sub }) => (
        <button
          key={value}
          onClick={handleButtonClick}
          value={value}
          type="button"
          className={`${styles.navBtn} ${
            activeSection === value ? styles.active : ""
          }`}
        >
          <span className={styles.dotOutline} />
          <span className={styles.navContent}>
            <span className={styles.navLabel}>{label}</span>
            <span className={styles.navSub}>{sub}</span>
          </span>
        </button>
      ))}
    </nav>
  );
};

export default Nav;
