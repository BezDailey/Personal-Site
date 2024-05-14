import React, {useState} from "react";

import styles from "./TemplateBlog.module.css";
import Skill from "../../Skill/Skill"

const TemplateBlog = ({header, short_text, topic, date_posted}) => {
  header = "Dev Log 1: Creating the UI Mockup for My Budgeting App";
  short_text = "In this first development log, I walk through the creation of the initial UI mockup for my budgeting app. Using Figma, I designed a clean and intuitive interface that allows users to manage budgets and track expenses effortlessly. The app features sections for total planned and remaining expenses, categorized budgets, and transaction tracking. Check out the detailed process and design choices in the full post! ";
  topic = "budgeting app"
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  const openBlog = () => {
    setIsBlogOpen(true);
  }

  const closeBlog = () => {
    setIsBlogOpen(false);
  }

  if (isBlogOpen) {
    return (
      <div class={styles.blogOverlay}>
        <button onClick={closeBlog}>X</button>
        <h1>{header}</h1>
        <p></p>
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
}

export default TemplateBlog
