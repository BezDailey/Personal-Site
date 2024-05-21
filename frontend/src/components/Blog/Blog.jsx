import React from "react";

import styles from "./Blog.module.css";

import DevLog1 from "../BlogPosts/DevLog1/DevLog1";
import DevLog2 from "../BlogPosts/DevLog2/DevLog2";

const Blog = () => {
  return (
    <div class={styles.blogPosts}>
        <DevLog2 />
        <DevLog1 />
    </div>
  )
}

export default Blog
