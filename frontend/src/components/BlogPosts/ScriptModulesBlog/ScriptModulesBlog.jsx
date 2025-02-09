import React, { useState } from "react";
import styles from "./ScriptModules.module.css";
import Skill from "../../Skill/Skill";

const ScriptModulesBlog = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const header = "Script and Modules in Node.js";
  const short_text =
    "Understanding the differences between scripts and modules in Node.js is essential for writing efficient and maintainable code. This post explores how Node.js loads and executes them, their key differences, and best practices for using each.";
  const topic = "Node.js";
  const date_posted = "Jan 21 2025";

  const openBlog = () => {
    setIsBlogOpen(true);
  };

  const closeBlog = () => {
    setIsBlogOpen(false);
  };

  if (isBlogOpen) {
    return (
      <div className={styles.blogOverlay}>
        <button className={styles.blogCloseBtn} onClick={closeBlog}>
          X
        </button>
        <h1>{header}</h1>

        <h2>Introduction</h2>
        <p>
          Understanding the differences between scripts and modules in Node.js is
          essential for writing efficient and maintainable code. This post explores
          how Node.js loads and executes them, their key differences, and best
          practices for using each.
        </p>

        <h2>What are Scripts and Modules?</h2>

        <h3>Scripts</h3>
        <p>
          A script in Node.js is a standalone JavaScript file executed directly using:
        </p>
        <pre>
          <code>node filename.js</code>
        </pre>
        <p>
          Scripts run in the global scope and do not export or import functionalities by
          default. They are useful for small utilities, automation tasks, or quick
          prototyping.
        </p>

        <h3>Modules</h3>
        <p>
          A module is a JavaScript file that exports functions, objects, or variables,
          making them reusable across different files. Modules help maintain separation
          of concerns and improve code organization.
        </p>
        <p>Node.js supports two module systems:</p>
        <ul>
          <li>
            <strong>CommonJS (CJS)</strong> - Uses <code>require()</code> and{" "}
            <code>module.exports</code>
          </li>
          <li>
            <strong>ECMAScript Modules (ESM)</strong> - Uses <code>import</code> and{" "}
            <code>export</code>
          </li>
        </ul>

        <h2>How Does Node Load and Execute Scripts?</h2>
        <p>When executing a script, Node.js:</p>
        <ol>
          <li>Reads the file.</li>
          <li>Wraps it in a function to provide a scoped execution environment.</li>
          <li>Runs it using the V8 JavaScript engine.</li>
        </ol>
        <p>
          A simple script (<code>script.js</code>) might look like this:
        </p>
        <pre>
          <code>{`console.log("Hello from script!");`}</code>
        </pre>
        <p>
          Running <code>node script.js</code> executes the file sequentially in a
          single-threaded event loop.
        </p>

        <h2>How Does Node Load and Execute Modules?</h2>
        <p>Modules follow different loading mechanisms depending on the system used.</p>

        <h3>CommonJS (CJS)</h3>
        <ul>
          <li>Modules are loaded synchronously.</li>
          <li>
            <code>require()</code> is used to import modules.
          </li>
          <li>Code is wrapped in a function scope.</li>
          <li>Modules are cached after the first load.</li>
        </ul>
        <p>
          <strong>Example:</strong>
        </p>
        <pre>
          <code>{`// math.js
module.exports.add = (a, b) => a + b;

// app.js
const math = require("./math");
console.log(math.add(2, 3));`}</code>
        </pre>

        <h3>ES Modules (ESM)</h3>
        <ul>
          <li>Modules are loaded asynchronously.</li>
          <li>
            Uses <code>import</code> and <code>export</code>.
          </li>
          <li>
            Requires <code>"type": "module"</code> in <code>package.json</code> or the use of a{" "}
            <code>.mjs</code> extension.
          </li>
        </ul>
        <p>
          <strong>Example:</strong>
        </p>
        <pre>
          <code>{`// math.mjs
export const add = (a, b) => a + b;

// app.mjs
import { add } from "./math.mjs";
console.log(add(2, 3));`}</code>
        </pre>

        <h2>Differences Between Scripts and Modules</h2>
        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>Scripts</th>
              <th>Modules</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Scope</td>
              <td>Global</td>
              <td>Local</td>
            </tr>
            <tr>
              <td>Import/Export</td>
              <td>No</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td>Execution</td>
              <td>Standalone</td>
              <td>Reusable</td>
            </tr>
            <tr>
              <td>Load Type</td>
              <td>Direct</td>
              <td>Asynchronous (ESM) / Synchronous (CJS)</td>
            </tr>
          </tbody>
        </table>

        <h2>Conclusion</h2>
        <p>
          Using scripts is ideal for simple, standalone tasks, while modules help structure and
          reuse code in larger applications. Whether using CommonJS or ES Modules, choosing the
          right approach will ensure better maintainability and efficiency in Node.js
          development.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.templateBlog}>
      <div className={styles.topHalf}>
        <h1>{header}</h1>
        <p className={styles.shortText}>{short_text}</p>
      </div>
      <button onClick={openBlog} className={styles.templateBlogBtn}>
        Read blog →
      </button>
      <div className={styles.blogInfo}>
        <div>
          <Skill name={topic} />
        </div>
        <p>{date_posted}</p>
      </div>
    </div>
  );
};

export default ScriptModulesBlog;
