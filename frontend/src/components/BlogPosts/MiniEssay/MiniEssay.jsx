import React from "react";
import BlogPost from "../BlogPost/BlogPost";

/**
 * Blog post: mini essay.
 * @returns {React.JSX.Element}
 */
const MiniEssay = () => {
  return (
    <BlogPost
      header="The Importance of Mini Essays"
      shortText="There's a difference between being able to follow an explanation and being able to produce one. Mini-essays are how I close that gap when learning technical concepts."
      topic="learning"
      datePosted="Jan 15 2025"
    >
      <p>There's a difference between being able to follow an explanation and being able to produce one. I can read about consistent hashing or CAP theorem and nod along just fine. Actually explaining it clearly, from memory, is a different skill. Mini-essays are how I close that gap.</p>
      <p>The format is simple: one concept, 100 to 300 words, written from memory. No copy-pasting from docs, no paraphrasing the Wikipedia article. Just what I actually understand, in plain language. Where I get stuck or go vague is exactly where my understanding breaks down. That's the point. Writing surfaces gaps that passive reading hides.</p>
      <p>This matters more than it seems for technical work. Interviews, design reviews, onboarding docs, explaining a system to someone who doesn't code: they all require the same thing. Take something complex and make it legible to another person. An engineer who can explain distributed systems clearly has a real edge over one who can only implement them.</p>
      <p>The habit I've built: whenever I encounter a new concept, I close the tab and write a mini-essay before moving on. Could be a data engineering pattern, something from a paper, a system design idea I half-understood. If I can't produce 150 coherent words, I didn't actually get it. If I can, I have a reference I wrote myself that I'll actually remember.</p>
      <p>It's a small constraint. But it adds up.</p>
    </BlogPost>
  );
};

export default MiniEssay;
