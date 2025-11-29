import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import RoadmapView from './components/RoadmapView';
import DailyLogPage from './components/DailyLog';
import Analytics from './components/Analytics';
import AITutor from './components/AITutor';
import { INITIAL_ROADMAP } from './constants';
import { DailyLog } from './types';
import { getLogs, saveLog, getCompletedTasks, saveCompletedTasks } from './services/storageService';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial state
  useEffect(() => {
    const loadedLogs = getLogs();
    const loadedTasks = getCompletedTasks();
    setLogs(loadedLogs);
    setCompletedTaskIds(loadedTasks);
    setIsLoading(false);
  }, []);

  const handleToggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => {
      const newIds = prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId];
      saveCompletedTasks(newIds);
      return newIds;
    });
  };

  const handleAddLog = (log: DailyLog) => {
    saveLog(log);
    setLogs(prev => [...prev, log]);
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-slate-50 text-slate-400">Loading Tracker...</div>;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {activeTab === 'dashboard' && (
        <Dashboard 
          roadmap={INITIAL_ROADMAP} 
          completedTaskIds={completedTaskIds} 
          logs={logs} 
        />
      )}
      {activeTab === 'roadmap' && (
        <RoadmapView 
          roadmap={INITIAL_ROADMAP} 
          completedTaskIds={completedTaskIds} 
          toggleTask={handleToggleTask} 
        />
      )}
      {activeTab === 'log' && (
        <DailyLogPage 
          logs={logs} 
          onAddLog={handleAddLog} 
        />
      )}
      {activeTab === 'analytics' && (
        <Analytics 
          roadmap={INITIAL_ROADMAP} 
          completedTaskIds={completedTaskIds} 
          logs={logs} 
        />
      )}
      {activeTab === 'ai-tutor' && (
        <AITutor />
      )}
    </Layout>
  );
};

export default App;