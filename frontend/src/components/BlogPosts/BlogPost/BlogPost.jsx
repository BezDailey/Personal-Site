import React, { useState } from "react";
import styles from "./BlogPost.module.css";

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
