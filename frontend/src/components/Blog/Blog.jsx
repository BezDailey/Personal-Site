import React from "react";

import styles from "./Blog.module.css";

import DevLog1 from "../BlogPosts/DevLog1/DevLog1";
import DevLog2 from "../BlogPosts/DevLog2/DevLog2";
import MiniEssay from "../BlogPosts/MiniEssay/MiniEssay";
import Node1 from "../BlogPosts/Node1/Node1";

const Blog = () => {
  return (
    <div class={styles.blogPosts}>
        <Node1 />
        <MiniEssay />
        <DevLog2 />
        <DevLog1 />
    </div>
  )
}

export default Blog
