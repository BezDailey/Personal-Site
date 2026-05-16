import React from "react";
import BlogPost from "../BlogPost/BlogPost";

const SystemDesignFramework = () => {
  return (
    <BlogPost
      header="The System Design Framework I Use in Every Interview"
      shortText="System design interviews are open-ended by design. They're testing how you think under ambiguity. Having a repeatable framework doesn't limit your thinking. It frees it up."
      topic="system design"
      datePosted="May 16 2026"
    >
      <p>System design interviews are open-ended by design. They're testing how you think under ambiguity. A repeatable framework doesn't limit your thinking. It actually frees it up.</p>
      <p>Here's the five-step approach I use:</p>

      <h2>1. Clarify requirements</h2>
      <p>Don't touch the whiteboard yet. Before designing anything, ask questions to narrow the problem. There are two types of requirements to pin down:</p>
      <ul>
        <li><strong>Functional:</strong> What does the system actually do? Who uses it? What are the core features for this interview scope?</li>
        <li><strong>Non-functional:</strong> What are the scale expectations? Read-heavy or write-heavy? Latency requirements? Consistency vs. availability tradeoffs?</li>
      </ul>
      <p>Most interviewers will give you a vague prompt on purpose. "Design Twitter" could mean the feed, the search, the DMs, or the whole thing. Getting alignment here is engineering judgment. Most candidates skip it and end up designing the wrong system.</p>

      <h2>2. Capacity estimation</h2>
      <p>Back-of-envelope math to establish scale. The goal is figuring out what kind of system you're building before you start drawing. Getting the numbers exactly right is less important than getting the order of magnitude right.</p>
      <p>Key numbers to estimate: QPS (queries per second) for reads and writes, storage needs over 1 and 5 years, bandwidth requirements, and whether caching will make a meaningful dent. These numbers determine whether you need sharding, whether a single database can handle the load, and whether a CDN is necessary.</p>
      <p>I keep a mental cheat sheet: 1M requests/day ≈ 12 QPS. 1B requests/day ≈ 12,000 QPS. Once you practice a few estimations they start to feel natural.</p>

      <h2>3. High-level design</h2>
      <p>Draw the system at a component level: clients, load balancer, application servers, databases, cache, CDN, message queue. Don't go deep yet. The goal is to show you understand the shape of the system and can reason about where the interesting problems live.</p>
      <p>Talk through your choices as you draw. "I'm putting a cache here because reads will far outnumber writes" is more valuable than a perfect diagram drawn in silence.</p>

      <h2>4. Deep dive</h2>
      <p>This is where most of the interview time goes. Pick one or two components and go deep: the database schema, the caching strategy, how you'd handle write conflicts, what happens when a node fails. Let the interviewer guide you if they have a preference, but come in with a sense of which component is the most technically interesting.</p>
      <p>For data-intensive systems, go deep on indexing, sharding keys, and read replicas. Real-time systems usually come down to WebSockets vs. SSE vs. polling and what your message queue semantics look like. Write-heavy systems are mostly about async processing and backpressure.</p>

      <h2>5. Tradeoffs</h2>
      <p>No design is perfect. Explicitly calling out the tradeoffs you made, and what you'd change at different scales or requirements, is what separates senior-level answers from everyone else's. "I chose eventual consistency here because strong consistency would require distributed transactions, which adds latency and complexity. If this were a payments system instead of a feed, I'd make a different call."</p>
      <p>The best answers aren't the ones with no weaknesses. They're the ones where the engineer understood the weaknesses and made deliberate choices anyway.</p>

      <h2>Practice tip</h2>
      <p>Run through each step out loud on a timer: 5 minutes for requirements, 5 for estimation, 10 for high-level, 15 for deep dive, 5 for tradeoffs. The framework is only useful if it's internalized enough that you don't have to think about it while you're thinking about the system.</p>
    </BlogPost>
  );
};

export default SystemDesignFramework;
