import { DailyLog } from '../types';

const STORAGE_KEY_LOGS = 'de_tracker_logs';
const STORAGE_KEY_TASKS = 'de_tracker_tasks';

export const saveLog = (log: DailyLog): void => {
  const existing = getLogs();
  const updated = [...existing, log];
  localStorage.setItem(STORAGE_KEY_LOGS, JSON.stringify(updated));
};

export const getLogs = (): DailyLog[] => {
  const stored = localStorage.getItem(STORAGE_KEY_LOGS);
  return stored ? JSON.parse(stored) : [];
};

export const saveCompletedTasks = (taskIds: string[]): void => {
  localStorage.setItem(STORAGE_KEY_TASKS, JSON.stringify(taskIds));
};

export const getCompletedTasks = (): string[] => {
  const stored = localStorage.getItem(STORAGE_KEY_TASKS);
  return stored ? JSON.parse(stored) : [];
};

export const clearData = (): void => {
  localStorage.removeItem(STORAGE_KEY_LOGS);
  localStorage.removeItem(STORAGE_KEY_TASKS);
};