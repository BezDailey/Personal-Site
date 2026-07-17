import React, { useState } from "react";
import styles from "./BlogPost.module.css";

/**
 * Shared wrapper for blog post entries. Renders a collapsed card with
 * metadata, title, and preview text; expands to show full content on click.
 * @param {Object} props
 * @param {string} props.header - Post title.
 * @param {string} props.shortText - Preview/summary text shown when collapsed.
 * @param {string} props.datePosted - Publication date string.
 * @param {string} props.topic - Topic label displayed above the title.
 * @param {React.ReactNode} props.children - Full post content shown when expanded.
 * @returns {React.JSX.Element}
 */
const BlogPost = ({ header, shortText, datePosted, topic, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBlog = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.templateBlog}>
      <div className={styles.blogMeta}>
        <span className={styles.topic}>{topic}</span>
        <span className={styles.date}>{datePosted}</span>
      </div>

      <h2 className={styles.title}>{header}</h2>
      <p className={styles.shortText}>{shortText}</p>

      <button onClick={toggleBlog} className={styles.templateBlogBtn}>
        {isOpen ? "Hide ↑" : "Read →"}
      </button>

      {isOpen && (
        <div
          className={`${styles.blogContent} ${isOpen ? styles.open : styles.closed}`}
        >
          <div className={styles.blogOverlay}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
