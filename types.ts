export enum SkillCategory {
  SQL = 'SQL',
  Python = 'Python',
  Warehousing = 'Data Warehousing',
  Cloud = 'Cloud (AWS/Azure/GCP)',
  ETL = 'ETL & Airflow',
  BigData = 'Big Data (Spark)',
  Advanced = 'Advanced (Streaming/Docker)',
  Projects = 'Portfolio Projects',
  Career = 'Job Prep'
}

export interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  category: SkillCategory;
}

export interface Topic {
  id: string;
  title: string;
  tasks: Task[];
}

export interface WeekModule {
  id: string;
  title: string;
  topics: Topic[];
}

export interface MonthModule {
  id: string;
  title: string;
  weeks: WeekModule[];
  goal: string;
}

export interface DailyLog {
  id: string;
  date: string;
  hoursStudied: number;
  notes: string;
  topicsCovered: string[];
}

export interface AppState {
  roadmap: MonthModule[];
  logs: DailyLog[];
  completedTaskIds: string[];
}

export interface ChartData {
  name: string;
  value: number;
  fullMark?: number;
}