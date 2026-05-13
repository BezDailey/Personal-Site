import React from "react";
import BlogPost from "../BlogPost/BlogPost";

const CustomHooksBlog = () => {
  return (
    <BlogPost
      header="Script and Modules in Node.js"
      shortText="Understanding the differences between scripts and modules in Node.js is essential for writing efficient and maintainable code. This post explores how Node.js loads and executes them, their key differences, and best practices for using each."
      topic="Node.js"
      datePosted="Jan 21 2025"
    >
      <h2>Introduction</h2>
      <p>Node.js distinguishes between scripts and modules...</p>

      <h2>What are Scripts and Modules?</h2>
      <h3>Scripts</h3>
      <p>
        A script is a file you run with <code>node filename.js</code>.
      </p>

      <h3>Modules</h3>
      <p>Modules are files that export/import logic and are reusable.</p>
      <ul>
        <li>
          <strong>CommonJS</strong> uses <code>require()</code>
        </li>
        <li>
          <strong>ES Modules</strong> use <code>import/export</code>
        </li>
      </ul>

      <h2>Example Code</h2>
      <pre>
        <code>{`// CommonJS Example
const fs = require('fs');
console.log("Loaded using CommonJS");`}</code>
      </pre>

      <h2>Conclusion</h2>
      <p>Use scripts for simple tasks, modules for reusable logic.</p>
    </BlogPost>
  );
};

export default CustomHooksBlog;
