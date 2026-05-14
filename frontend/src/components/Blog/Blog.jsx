import React from "react";

import styles from "./Blog.module.css";

import MiniEssay from "../BlogPosts/MiniEssay/MiniEssay";

const Blog = () => {
  return (
    <div className={styles.blogPosts}>
      <MiniEssay />
    </div>
  );
};

export default Blog;
