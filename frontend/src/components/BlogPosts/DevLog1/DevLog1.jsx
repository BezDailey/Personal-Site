import React, {useState} from "react";

import styles from "./DevLog1.module.css";
import Skill from "../../Skill/Skill"

// images
import budgetHeader from "./images/budgetHeader.png";
import budgetsSection from "./images/budgetsSection.png";
import transactionSection from "./images/transactionsSection.png";
import addTransactionSection from "./images/budgetFooter.png";

const TemplateBlog = () => {
    const [isBlogOpen, setIsBlogOpen] = useState(false);
    const header = 'Dev Log 1: Creating the UI Mockup for My Budgeting App';
    const short_text = "In this first development log, I walk through the creation of the initial UI mockup for my budgeting app. Using Figma, I designed a clean and intuitive interface that allows users to manage budgets and track expenses effortlessly. The app features sections for total planned and remaining expenses, categorized budgets, and transaction tracking. Check out the detailed process and design choices in the full post! ";
    const topic = "budgeting app";
    const date_posted = "May 14 2024";

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
        <p>Welcome to the first development log for my budgeting app! In the post, I’ll walk you through the creation of the initial UI mockup. The goal was to design a clean, intuitive interface that allows users to easily manage their budgets and track expenses. Let’s dive into the details of this process.</p>
        <h2>Step 1: Defining the Requirements</h2>
        <p>Before jumping into the design, it was essential to outline the key functionalities and features of the app needed:</p>
        <ul>
            <li><b>Total Planned Expenses</b>: Display the total expenses for the month.</li>
            <li><b>Total Remaining Expenses</b>: Display the remaining budget for the month.</li>
            <li><b>Budgets Section</b>: Allow users to categorize expenses into Needs, Wants, and Savings.</li>
            <li><b>Transactions Section</b>: Track individual transactions and categorize them.</li>
            <li><b>Add Transaction</b>: Provide an easy way to add new transactions.</li>
        </ul>
        <h2>Step 2: Choosing the Design Tool</h2>
        <p>For this project I chose Figma due to its robust features for UI/UX design and real-time collaboration capabilities. Figma is a powerful tool that allows for detailed design work and easy sharing of prototypes.</p>
        <h3>Header Section</h3>
        <div>
            <img src={budgetHeader} alt="Budgeting App Header" />
        </div>
        <ul>
            <li><b>Budget Title</b>: Displays the month for which the budget is being tracked.</li>
            <li><b>Total Planned Expenses</b>: A bold text displaying the total planned expenses.</li>
            <li><b>Total Remaining Expenses</b>: Shows the remaining budget prominently.</li>
        </ul>
        <h3>Budgets Section</h3>
        <div>
            <img src={budgetsSection} alt="Budgeting App Budgets Section" />
        </div>
        <ul>
            <li><b>Categories</b>: Lists the three main categories - Needs, Wants, and Savings.</li>
            <li><b>Progress Indicators</b>: Each category shows the amount spent out of the total budget.</li>
        </ul>
        <h3>Transactions Section</h3>
        <div>
            <img src={transactionSection} alt="Budgeting App Transactions Section" />
        </div>
        <ul>
            <li><b>Transaction List</b>: Displays a list of individual transactions, including the vendor, amount, category, and date.</li>
            <li><b>Edit Button</b>: Allows users to edit their budgets and transactions.</li>
        </ul>
        <h3>Add Transaction Button</h3>
        <div>
            <img src={addTransactionSection} alt="Budgeting App Add Transactions Section" />
        </div>
        <p>Positioned at the bottom of the screen. It provides a clear call-to-action for adding new transactions.</p>
        <h2>Step 4: Creating the mockup</h2>
        <p>I started by laying out the basic structure, focusing on usability and clarity. Here's a screenshot of the current mockup:</p>
        <h3>Key Design Choices:</h3>
        <ul>
            <li><b>Typography</b>: Used bold and large fonts for key figures to ensure they stand out.</li>
            <li><b>Colors</b>: Opted for a grayscale color palette to keep the design minimalistic and professional.</li>
            <li><b>Spacing</b>: Ensured sufficient spacing between elements to avoid clutter and enhance readability.</li>
        </ul>
        <h2>Conclusion</h2>
        <p>Creating the UI mockup was an exciting first step in developing the budgeting app. The foal was to build a user-friendly interface that simplifies budget management. In the next development log, I’ll dive into implementing the frontend using React. Stay tuned for more updates!</p>

        

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
