import React, {useState} from "react";

import styles from "./MiniEssay.module.css";
import Skill from "../../Skill/Skill"

const MiniEssay = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const header = 'The Importance of Mini Essays';
  const short_text = "Mini-essays are a powerful tool for learning and retaining knowledge. In fact, they provide a structured yet flexible approach to deepen your understanding of various topics.";
  const topic = "productivity";
  const date_posted = "Jan 15 2025";

  const openBlog = () => {
    setIsBlogOpen(true);
  }

  const closeBlog = () => {
    setIsBlogOpen(false);
  }

  if (isBlogOpen) {
    return (
      <div class={styles.blogOverlay}>
        <button class={styles.blogCloseBtn} onClick={closeBlog}>X</button>
        <h1>{header}</h1>
        <p>Mini-essays are a powerful tool for learning and retaining knowledge. In fact, they provide a structured yet flexible approach to deepen your understanding of various topics.</p>
        <p>To begin with, mini-essays are very short essays which you can use to reflect on your topic and practice your writing skills. They take one topic and condense what you have learned into around 100 to 300 words. Although there is no pressure to write more or less, this is a standard foal that I try to stick to when I am exploring a topic.</p>
        <p>And when writing a mini-essay, this process mirrors a key step in the Feynman technique, which is learning through teaching others. Crafting a mini-essay is a small simulation of the process of teaching others. As a result, this helps deepen your understanding of your topic because once you are able to explain a topic clearly, concisely, and fluidly, you have achieved a deep understanding of it.</p>
        <p>Ultimately, by embracing mini-essays as a tool for reflection and learning, you not only sharpen your ability to articulate ideas but also solidify your understanding in a way few other methods can achieve.</p>
        <h2>References</h2>
        <ul>
          <li><a href="https://www.youtube.com/watch?v=eCaOSNxwCsw&t=1s">How to Write a Mini-Essay</a></li>
          <li><a href="https://medium.com/word-garden/mini-essays-dcb33359d37c">Mini Essays</a></li>
          <li><a href="https://www.colorado.edu/artssciences-advising/resource-library/life-skills/the-feynman-technique-in-academic-coaching?source=post_page-----b2c3805e8219--------------------------------">The Feynman Technique</a></li>
          <li><a href="https://writingcenter.tamu.edu/faculty-advisors/resources-for-teaching/instruction/mini-essays?source=post_page-----b2c3805e8219--------------------------------">Mini Essays</a></li>
        </ul>
      </div>
    )
  }

  return (
    <div class={styles.templateBlog}>
      <div class={styles.topHalf}>
        <h1>{header}</h1>
        <p class={styles.shortText}>{short_text}</p>
      </div>
      <button onClick={openBlog} class={styles.templateBlogBtn}>Read blog {'->'}</button>
      <div class={styles.blogInfo}>
        <div>
          <Skill name={topic} />
        </div>
        <p>{date_posted}</p>
      </div>
    </div>
  )
};

export default MiniEssay;
