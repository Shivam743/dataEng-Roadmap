import { MonthModule, SkillCategory } from './types';

// NOTE: Ideally, the API key should be in a .env file and accessed via process.env.
// For this standalone demo based on the prompt's provided key, we use it here.
// WARNING: Exposing API keys in client-side code is risky in production.
export const GEMINI_API_KEY = "AIzaSyBnaO-3dL03app3yorqGyNFAQdn1vZplzw";

export const INITIAL_ROADMAP: MonthModule[] = [
  {
    id: "m1",
    title: "Month 1-2: Foundations (Weeks 1-8)",
    goal: "SQL + Python Proficiency",
    weeks: [
      {
        id: "w1",
        title: "Week 1-2: SQL Basics",
        topics: [
          {
            id: "t1",
            title: "Core Concepts",
            tasks: [
              { id: "tk1", title: "SELECT, WHERE, JOIN, GROUP BY, ORDER BY", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk2", title: "Aggregate functions (COUNT, SUM, AVG, MIN, MAX)", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk3", title: "Practice: SQLZoo, HackerRank SQL track", isCompleted: false, category: SkillCategory.SQL },
            ]
          }
        ]
      },
      {
        id: "w3",
        title: "Week 3-4: Advanced SQL",
        topics: [
          {
            id: "t2",
            title: "Advanced Queries",
            tasks: [
              { id: "tk4", title: "Window functions (ROW_NUMBER, RANK, LAG, LEAD)", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk5", title: "CTEs and subqueries", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk6", title: "CASE statements, date/time functions", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk7", title: "Performance optimization basics (indexes)", isCompleted: false, category: SkillCategory.SQL },
              { id: "tk8", title: "Practice: LeetCode SQL problems (Easy/Medium)", isCompleted: false, category: SkillCategory.SQL },
            ]
          }
        ]
      },
      {
        id: "w5",
        title: "Week 5-6: Python Fundamentals",
        topics: [
          {
            id: "t3",
            title: "Basics",
            tasks: [
              { id: "tk9", title: "Data types, control flow, functions", isCompleted: false, category: SkillCategory.Python },
              { id: "tk10", title: "Lists, dictionaries, sets, tuples", isCompleted: false, category: SkillCategory.Python },
              { id: "tk11", title: "File handling (CSV, JSON, TXT)", isCompleted: false, category: SkillCategory.Python },
              { id: "tk12", title: "Error handling", isCompleted: false, category: SkillCategory.Python },
            ]
          }
        ]
      },
      {
        id: "w7",
        title: "Week 7-8: Python Libraries",
        topics: [
          {
            id: "t4",
            title: "Data Manipulation",
            tasks: [
              { id: "tk13", title: "Pandas: DataFrames, cleaning", isCompleted: false, category: SkillCategory.Python },
              { id: "tk14", title: "NumPy: Arrays and operations", isCompleted: false, category: SkillCategory.Python },
              { id: "tk15", title: "Working with APIs (requests lib)", isCompleted: false, category: SkillCategory.Python },
              { id: "tk16", title: "Project: Data cleaning script", isCompleted: false, category: SkillCategory.Projects },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "m3",
    title: "Month 3: Data Warehousing & Cloud",
    goal: "Understand Data Modeling & Cloud Basics",
    weeks: [
      {
        id: "w9",
        title: "Weeks 9-12: DW & Cloud",
        topics: [
          {
            id: "t5",
            title: "Data Warehousing",
            tasks: [
              { id: "tk17", title: "Star schema vs Snowflake schema", isCompleted: false, category: SkillCategory.Warehousing },
              { id: "tk18", title: "Fact and dimension tables", isCompleted: false, category: SkillCategory.Warehousing },
              { id: "tk19", title: "OLTP vs OLAP", isCompleted: false, category: SkillCategory.Warehousing },
            ]
          },
          {
            id: "t6",
            title: "Cloud Platform (AWS Recommended)",
            tasks: [
              { id: "tk20", title: "S3, EC2 basics, IAM", isCompleted: false, category: SkillCategory.Cloud },
              { id: "tk21", title: "RDS (Relational Database Service)", isCompleted: false, category: SkillCategory.Cloud },
              { id: "tk22", title: "AWS Lambda basics", isCompleted: false, category: SkillCategory.Cloud },
              { id: "tk23", title: "Practice: AWS Free Tier labs", isCompleted: false, category: SkillCategory.Cloud },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "m4",
    title: "Month 4: ETL & Data Pipelines",
    goal: "Build First Portfolio Project",
    weeks: [
      {
        id: "w13",
        title: "Weeks 13-16: ETL & Airflow",
        topics: [
          {
            id: "t7",
            title: "ETL Fundamentals",
            tasks: [
              { id: "tk24", title: "Extract, Transform, Load concepts", isCompleted: false, category: SkillCategory.ETL },
              { id: "tk25", title: "Batch vs streaming processing", isCompleted: false, category: SkillCategory.ETL },
            ]
          },
          {
            id: "t8",
            title: "Apache Airflow",
            tasks: [
              { id: "tk26", title: "DAG concepts", isCompleted: false, category: SkillCategory.ETL },
              { id: "tk27", title: "Operators, sensors, hooks", isCompleted: false, category: SkillCategory.ETL },
              { id: "tk28", title: "Project: ETL pipeline (CSV -> Postgres -> S3)", isCompleted: false, category: SkillCategory.Projects },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "m5",
    title: "Month 5: Big Data Technologies",
    goal: "Master Spark Fundamentals",
    weeks: [
      {
        id: "w17",
        title: "Weeks 17-20: Spark & Storage",
        topics: [
          {
            id: "t9",
            title: "Apache Spark",
            tasks: [
              { id: "tk29", title: "RDD, DataFrame, Dataset concepts", isCompleted: false, category: SkillCategory.BigData },
              { id: "tk30", title: "PySpark basics", isCompleted: false, category: SkillCategory.BigData },
              { id: "tk31", title: "Reading/writing (Parquet, Avro)", isCompleted: false, category: SkillCategory.BigData },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "m6",
    title: "Month 6: Advanced Topics",
    goal: "Streaming & Containerization",
    weeks: [
      {
        id: "w21",
        title: "Weeks 21-24: Streaming & Docker",
        topics: [
          {
            id: "t10",
            title: "Streaming (Kafka/Kinesis)",
            tasks: [
              { id: "tk32", title: "Producers, consumers, topics", isCompleted: false, category: SkillCategory.Advanced },
              { id: "tk33", title: "Event-driven architecture", isCompleted: false, category: SkillCategory.Advanced },
            ]
          },
          {
            id: "t11",
            title: "Docker",
            tasks: [
              { id: "tk34", title: "Docker basics: images, containers", isCompleted: false, category: SkillCategory.Advanced },
              { id: "tk35", title: "Project: Containerize Airflow pipeline", isCompleted: false, category: SkillCategory.Projects },
            ]
          }
        ]
      }
    ]
  },
  {
    id: "m7",
    title: "Month 7-8: Portfolio & Job Prep",
    goal: "Get Hired",
    weeks: [
      {
        id: "w25",
        title: "Weeks 25-32: Final Push",
        topics: [
          {
            id: "t12",
            title: "Portfolio Projects",
            tasks: [
              { id: "tk36", title: "Project 1: End-to-End ETL", isCompleted: false, category: SkillCategory.Projects },
              { id: "tk37", title: "Project 2: Batch Processing Pipeline", isCompleted: false, category: SkillCategory.Projects },
              { id: "tk38", title: "Project 3: Real-time Data Pipeline", isCompleted: false, category: SkillCategory.Projects },
            ]
          },
          {
            id: "t13",
            title: "Job Prep",
            tasks: [
              { id: "tk39", title: "Resume & LinkedIn Optimization", isCompleted: false, category: SkillCategory.Career },
              { id: "tk40", title: "SQL Practice (50+ problems)", isCompleted: false, category: SkillCategory.Career },
              { id: "tk41", title: "System Design Study", isCompleted: false, category: SkillCategory.Career },
              { id: "tk42", title: "Apply to 5-10 jobs/week", isCompleted: false, category: SkillCategory.Career },
            ]
          }
        ]
      }
    ]
  }
];