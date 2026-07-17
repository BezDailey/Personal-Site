import React from "react";
import BlogPost from "../BlogPost/BlogPost";

/**
 * Blog post: lessons learned from building ETL pipelines.
 * @returns {React.JSX.Element}
 */
const ETLLessons = () => {
  return (
    <BlogPost
      header="What Building ETL Pipelines at Scale Actually Taught Me"
      shortText="Most ETL tutorials teach you to move data from point A to point B. Production pipelines have a different set of problems. They're also more interesting."
      topic="data engineering"
      datePosted="May 16 2026"
    >
      <p>Most ETL tutorials teach you to move data from point A to point B. Production pipelines have a different set of problems. They're also more interesting.</p>
      <p>At Deloitte I've designed pipelines on Databricks and PySpark for CDC's AR Lab Network, ingesting 10,000+ records per batch across multiple data sources. Here's what building at that scale taught me that tutorials skip.</p>

      <h2>Schema drift will break you if you don't plan for it</h2>
      <p>Upstream data sources change. A field gets renamed, a new column gets added, a type changes from string to integer. In a small pipeline this is annoying. In a pipeline that 10 downstream teams depend on, it's an incident.</p>
      <p>The fix is to be explicit. Define your schemas, validate incoming data against them at ingestion time, and fail loudly when something unexpected arrives. A pipeline that fails fast on bad data beats one that silently corrupts records downstream. We use schema enforcement in Databricks Delta tables to catch this at the source, because by the time it surfaces in the analytics layer it's much harder to trace.</p>

      <h2>Idempotency isn't optional</h2>
      <p>Your pipeline will be re-run. A job will fail halfway through, someone will trigger a manual backfill, a bug fix will require reprocessing last month's data. If your pipeline isn't idempotent (run it twice on the same input, get the same output) you will eventually double-count something important.</p>
      <p>The practical implementation: use upserts instead of inserts where possible, track a watermark or run ID for each batch, and partition your data by ingestion date so reruns only touch the records they're supposed to. In PySpark this often means using <code>mergeSchema</code> and writing to Delta tables with merge conditions rather than append mode.</p>

      <h2>The transformation layer is where the real logic lives</h2>
      <p>Ingestion is mostly plumbing. The interesting work is in the transformation layer, and it's where bugs have the most downstream impact. This is where raw event data becomes something a team can actually use: aggregated, cleaned, joined to reference tables, and shaped to answer a real question.</p>
      <p>Two things I've learned to do here: write transformations as pure functions where possible (same input always produces same output, no side effects), and log the record counts at each transformation step. If you started with 50,000 records and ended with 47,000, you should know why 3,000 were filtered out.</p>

      <h2>Monitoring is part of the pipeline</h2>
      <p>A pipeline that runs successfully but produces wrong numbers is worse than one that fails outright. At least a failure alerts someone. Production pipelines need data quality checks built in from the start.</p>
      <p>At a minimum: check that record counts fall within an expected range, that null rates on critical fields haven't spiked, and that freshness is within SLA. These checks don't have to be complex. A simple assertion that "this table should have more records today than yesterday" catches a surprising number of real problems.</p>

      <h2>The skills that actually matter</h2>
      <p>Technical knowledge of Spark, SQL, and your orchestration tool matters. But the skill that determines whether a pipeline is trustworthy long-term is the ability to think adversarially about your own code. Ask "what happens when the upstream sends me garbage?" and "what breaks if this job runs twice?" before a production incident forces those questions.</p>
    </BlogPost>
  );
};

export default ETLLessons;
