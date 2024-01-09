import React from "react";

import styles from "./Homepage.module.css";

const Homepage = () => {
  return (
    <div>
      <section>
        <h1>Hello, I'm Jabez!</h1>
        <p>
          A Senior Computer Science Student at Morehouse College passionate
          about software development, artificial intelligence, and web
          technologies. Welcome to my personal website!
        </p>
      </section>
      <section>
        <h3>Experience</h3>
        <section>
          <h4>Software Engineer Intern</h4>
          <h5>Salesforce</h5>
          <h5>May 2023 - August 2023, San Francisco, CA</h5>
          <ul>
            <li>
              Leveraged Hacklang to implement the profile fields for the Out of
              Office feature.
            </li>
            <li>
              Implemented unit and integration tests using Hacklang improving
              the reliability, stability, and quality of the Out of Office
              feature.
            </li>
            <li>
              Employed React to overhaul the profile flex pane, achieving a 25%
              reduction in visual clutter through strategic redesign.
            </li>
            <li>
              Utilized React to visually differentiate profile banners for
              specific user groups, resolving a significant customer issue and
              increased customer satisfaction.
            </li>
            <li>
              Developed and implemented new features for a web application,
              increasing user engagement by 20% and reducing page load time by
              30%.
            </li>
          </ul>
        </section>

        <section>
          <h4>Software Engineer Intern</h4>
          <h5>Salesforce</h5>
          <h5>September 2022 - December 2022, Atlanta, GA</h5>
          <ul>
            <li>
              Improved efficiency of communication processes by automating
              repetitive tasks through the development and deployment of a
              custom Slackbot, resulting in a 30% reduction in manual effort.
            </li>
            <li>
              Assisted in developing and implementing comprehensive
              documentation, resulting in a streamlined onboarding process and
              improved user experience for the Slackbot.
            </li>
            <li>
              Integrated API calls to retrieve and display team information
              within Slack channels, improving accessibility and collaboration.
            </li>
          </ul>
        </section>

        <section>
          <h4>Software Facing Technical Support Intern</h4>
          <h5>IBM</h5>
          <h5>June 2021 - August 2022, Atlanta, GA</h5>
          <ul>
            <li>
              Produced and edited IBM Technical videos for IBM clients using
              Camtasia.
            </li>
            <li>
              Prepared for delivery of Premium Support product welcome call to
              premium clients.
            </li>
            <li>
              Audited the IBM Premium Support Services client’s routing and
              handling process to ensure proper handling.
            </li>
            <li>
              Spearheaded the creation of a React component facilitating data
              export for 3000+ employees, enhancing operational efficiency.
            </li>
            <li>
              Engineered a Python script to analyze and compare excel sheets
              with over 100,000 rows.
            </li>
          </ul>
        </section>

        <section>
          <h4>Teacher Assistant</h4>
          <h5>TheClubhou.se</h5>
          <h5>June 2019 - August 2019, Augusta, GA</h5>
          <ul>
            <li>
              Mentored 20+ students, debugging JavaScript, HTML, CSS, Node.js,
              and MySQL code, nurturing their proficiency in web development.
            </li>
            <li>
              Collaborated with a team of teaching assistants to streamline the
              mock interview process, resulting in a 30% reduction in overall
              assessment time.
            </li>
            <li>
              Developed a web application utilizing HTML and CSS to monitor and
              analyze student attendance.
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
};

export default Homepage;
