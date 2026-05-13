import React, { useState } from "react";
import styles from "./BlogPost.module.css";
import Skill from "../../Skill/Skill";

const BlogPost = ({ header, shortText, datePosted, topic, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleBlog = () => setIsOpen((prev) => !prev);

  return (
    <div className={styles.templateBlog}>
      <div className={styles.topHalf}>
        <h1>{header}</h1>
        <p className={styles.shortText}>{shortText}</p>
      </div>

      <button onClick={toggleBlog} className={styles.templateBlogBtn}>
        {isOpen ? "Hide blog ↑" : "Read blog →"}
      </button>

      <div className={styles.blogInfo}>
        <div>
          <Skill name={topic} />
        </div>
        <p>{datePosted}</p>
      </div>

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
