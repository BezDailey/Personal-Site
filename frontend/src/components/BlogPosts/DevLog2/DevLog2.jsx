import React, {useState} from "react";

import styles from "./DevLog2.module.css";
import Skill from "../../Skill/Skill"

import mockups from "./images/budgetMockUp.png";

const DevLog2 = () => {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const header = 'Dev Log 2: Refining the UI Mockup for My Budgeting App';
  const short_text = "In this dev log, I focused on making my budgeting app's design responsive across different devices, including smartphones, tablets, and laptops. Key updates include improved typography, enhanced color contrast, and better spacing based on user feedback. Next, I will implement the frontend using React, ensuring a seamless user experience across all platforms.";
  const topic = "budgeting app";
  const date_posted = "May 20 2024";

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
      <p>Welcome back to the second development log for my budgeting app! In the previous post, I walked you through the creation of the initial UI mockup, focusing on a clean and intuitive interface. Today, I’ll share the progress made since then, including refinements to the design and how it looks across different devices. Let’s dive into the updates.</p>
      <h2>Step 1: Cross-Device Compatibility</h2>
      <p>One of the crucial aspects of designing a user-friendly app is ensuring it looks great and functions well across various devices. I focused on creating responsive designs for different screen sizes, including smartphones, tablets, and laptops.</p>
      <h3>Device Mockups</h3>
      <p>Here are the latest mockups for different devices:</p>
      <div>
        <img src={mockups} alt="Latest mockups" />
      </div>
      <h4>iPhone 13 mini</h4>
      <p>The layout is optimized for a smaller screen, ensuring all functionalities are accessible without cluttering the interface. Key features like the total planned and remaining expenses, categories, and transaction lists are clearly visible and easy to navigate.</p>
      <h4>iPad Pro 11"</h4>
      <p>The tablet version provides more space, allowing for a more detailed view of transactions and budgets. The interface is designed to take advantage of the larger screen, offering a more comfortable experience for managing budgets.</p>
      <h4>MacBook Air</h4>
      <p>On a laptop, the app provides an even more comprehensive view, making it ideal for users who prefer managing their finances on a larger screen. The design maintains consistency while making efficient use of the available space.</p>
      <h2>Step 2: Design Refinements</h2>
      <p>Based on initial feedback and usability tests, several adjustments were made to enhance the user experience:</p>
      <ul>
        <li><b>Improved Typography</b>: Increased font sizes for key figures to improve readability, especially on smaller screens.</li>
        <li><b>Color Scheme Adjustments</b>: Fine-tuned the grayscale palette to ensure better contrast and visual appeal.</li>
        <li><b>Enhanced Spacing</b>: Adjusted spacing between elements to further reduce clutter and enhance the overall flow of the interface.</li>
        <li><b>Navigation Tabs</b>: Added a navigation tab for upcoming pages and functionalities to streamline user access and future updates.</li>
      </ul>
      <h2>Step 3: Feedback Integration</h2>
      <p>Feedback from initial testers highlighted the importance of a clear and straightforward user interface. Here’s what I focused on based on their input:</p>
      <ul>
        <li><b>Simplified Navigation</b>: Streamlined the navigation menu to make it easier for users to switch between different sections.</li>
        <li><b>Clear Call-to-Actions</b>: Ensured buttons like "Add Transaction" are prominently displayed and easily accessible.</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Refining the UI mockup was a critical step in improving the overall design and functionality of the budgeting app. The focus remains on creating a user-friendly interface that simplifies budget management across all devices. In the next development log, I’ll dive into implementing the frontend using React. Stay tuned for more updates!</p>
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

export default DevLog2;
