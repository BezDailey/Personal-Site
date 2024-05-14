import React from "react";

import styles from "./Blog.module.css";

import TemplateBlog from "../BlogPosts/TemplateBlog/TemplateBlog";
import DevLog1 from "../BlogPosts/DevLog1/DevLog1";

const Blog = () => {
  return (
    <div class={styles.blogPosts}>
        <DevLog1 />
    </div>
  )
}

export default Blog
