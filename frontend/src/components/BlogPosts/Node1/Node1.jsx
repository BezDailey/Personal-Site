import React, {useState} from "react";

import styles from "./Node1.module.css";
import Skill from "../../Skill/Skill"

const MiniEssay = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const header = 'What is Node.js';
  const short_text = "So, recently I have been studying Node.js. I have been using node for the past 5 years, but I didn’t really know anything about it.";
  const topic = "Node.js";
  const date_posted = "Jan 20 2025";

  const openBlog = () => {
    setIsBlogOpen(true);
  }

  const closeBlog = () => {
    setIsBlogOpen(false);
  }

  if (isBlogOpen) {
    return (
      <div class={styles.blogOverlay}>
        <button class={styles.blogCloseBtn} onClick={closeBlog}>X</button>
        <h1>{header}</h1>
        <p>So, recently I have been studying Node.js. I have been using node for the past 5 years, but I didn’t really know anything about it. I only knew just enough to build and deploy web applications. But now that I feel confident in building stuff on using node, I want to understand more of it. And, I want to share some of the stuff I learned.</p>
        <p>Node.js is a JavaScript runtime environment that has a non-blocking, event-driven architecture. It uses Google’s V8 JavaScript engine to compile JavaScript into machine code. It operates on a single-thread for JavaScript code, but is able to handle multiple request concurrently due to its architecture. In node’s architecture there is an event loop that handles asynchronous operation and allows for non-blocking I/O operations.</p>
        <p>Node.js uses two different module loaders ES Modules and CommonJS. CommonJS is the legacy module loader, and ES Modules are the newer and more preferred way of using modules in node. ES Modules is the preferred way of using modules in node because of its alignment with ECMAScript, asynchronous loading, static analysis capabilities, improved performance through tree-shaking, cross-environment consistency, and future-proof design for modern JavaScript development.</p>
        <p>Studying Node.js has been a nice experience. I have enjoyed looking beneath the surface to understand the tool I use everyday. As I continue to explore node, I’ll be posting more on what I learn.</p>
      </div>
    )
  }

  return (
    <div class={styles.templateBlog}>
      <div class={styles.topHalf}>
        <h1>{header}</h1>
        <p class={styles.shortText}>{short_text}</p>
      </div>
      <button onClick={openBlog} class={styles.templateBlogBtn}>Read blog {'->'}</button>
      <div class={styles.blogInfo}>
        <div>
          <Skill name={topic} />
        </div>
        <p>{date_posted}</p>
      </div>
    </div>
  )
};

export default MiniEssay;
