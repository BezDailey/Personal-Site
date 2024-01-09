import React from "react";

import styles from "./Homepage.module.css";

// Components
import Header from "../../components/Header/Header";
import Experience from "../../components/Experience/Experience";

const Homepage = () => {
  return (
    <div>
      <Header />
      <section>
        <h1>Experience</h1>
        <Experience />
      </section>
    </div>
  );
};

export default Homepage;
