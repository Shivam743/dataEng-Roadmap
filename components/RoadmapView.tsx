import React, { useState } from 'react';
import { MonthModule, SkillCategory } from '../types';
import { ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react';
import { generateStudyTip } from '../services/geminiService';

interface RoadmapViewProps {
  roadmap: MonthModule[];
  completedTaskIds: string[];
  toggleTask: (taskId: string) => void;
}

const RoadmapView: React.FC<RoadmapViewProps> = ({ roadmap, completedTaskIds, toggleTask }) => {
  const [expandedMonths, setExpandedMonths] = useState<Record<string, boolean>>({ m1: true });
  const [tip, setTip] = useState<string | null>(null);
  const [loadingTip, setLoadingTip] = useState(false);

  const toggleMonth = (id: string) => {
    setExpandedMonths(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAskAI = async (topicTitle: string) => {
    setLoadingTip(true);
    setTip(null);
    const result = await generateStudyTip(topicTitle);
    setTip(result);
    setLoadingTip(false);
  };

  return (
    <div className="space-y-6">
       <header className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
            <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Learning Roadmap</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Expand modules to track individual tasks.</p>
        </div>
        {tip && (
            <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 p-4 rounded-lg max-w-md animate-fade-in shadow-sm">
                <p className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase mb-1">AI Tip</p>
                <p className="text-sm text-indigo-700 dark:text-indigo-200">{tip}</p>
                <button onClick={() => setTip(null)} className="text-xs text-indigo-500 dark:text-indigo-400 mt-2 hover:underline">Dismiss</button>
            </div>
        )}
      </header>

      <div className="space-y-4">
        {roadmap.map((month) => (
          <div key={month.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm transition-all duration-200">
            <button
              onClick={() => toggleMonth(month.id)}
              className="w-full flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <span className="text-slate-400">
                  {expandedMonths[month.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </span>
                <div className="text-left">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100">{month.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1 text-blue-600 dark:text-blue-400">{month.goal}</p>
                </div>
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                  {/* Progress for this module */}
                  {(() => {
                      const tasks = month.weeks.flatMap(w => w.topics.flatMap(t => t.tasks));
                      const completed = tasks.filter(t => completedTaskIds.includes(t.id)).length;
                      return `${Math.round((completed / tasks.length) * 100)}% Complete`;
                  })()}
              </div>
            </button>

            {expandedMonths[month.id] && (
              <div className="p-5 border-t border-slate-100 dark:border-slate-700 space-y-6">
                {month.weeks.map((week) => (
                  <div key={week.id} className="pl-4 border-l-2 border-slate-200 dark:border-slate-700 ml-2">
                    <h4 className="text-md font-semibold text-slate-700 dark:text-slate-300 mb-3 ml-2">{week.title}</h4>
                    <div className="space-y-4 ml-2">
                      {week.topics.map((topic) => (
                        <div key={topic.id} className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-3">
                              <h5 className="font-medium text-slate-800 dark:text-slate-200">{topic.title}</h5>
                              <button 
                                onClick={() => handleAskAI(topic.title)}
                                disabled={loadingTip}
                                className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors"
                              >
                                {loadingTip ? "..." : "AI Tip"}
                              </button>
                          </div>
                          <ul className="space-y-2">
                            {topic.tasks.map((task) => {
                              const isCompleted = completedTaskIds.includes(task.id);
                              return (
                                <li key={task.id} className="flex items-start group cursor-pointer" onClick={() => toggleTask(task.id)}>
                                  <button className={`mt-0.5 mr-3 flex-shrink-0 transition-colors ${isCompleted ? 'text-blue-600' : 'text-slate-300 dark:text-slate-500 group-hover:text-blue-400'}`}>
                                    {isCompleted ? <CheckSquare size={18} /> : <Square size={18} />}
                                  </button>
                                  <span className={`text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                    {task.title}
                                  </span>
                                  <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-300 hidden group-hover:inline-block">
                                    {task.category}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapView;