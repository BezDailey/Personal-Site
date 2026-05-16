import React from "react";

import styles from "./Blog.module.css";

import SystemDesignFramework from "../BlogPosts/SystemDesignFramework/SystemDesignFramework";
import ETLLessons from "../BlogPosts/ETLLessons/ETLLessons";
import MiniEssay from "../BlogPosts/MiniEssay/MiniEssay";

const Blog = () => {
  return (
    <div className={styles.blogPosts}>
      <SystemDesignFramework />
      <ETLLessons />
      <MiniEssay />
    </div>
  );
};

export default Blog;
