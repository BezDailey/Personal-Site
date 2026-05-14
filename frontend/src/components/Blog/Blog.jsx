import React from "react";

import styles from "./Blog.module.css";

import CustomHooksBlog from "../BlogPosts/CustomHooksBlog/CustomHooksBlog";
import MiniEssay from "../BlogPosts/MiniEssay/MiniEssay";

const Blog = () => {
  return (
    <div className={styles.blogPosts}>
      <CustomHooksBlog />
      <MiniEssay />
    </div>
  );
};

export default Blog;
