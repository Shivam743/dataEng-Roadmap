import React from 'react';
import { MonthModule, DailyLog, SkillCategory } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

interface AnalyticsProps {
  roadmap: MonthModule[];
  completedTaskIds: string[];
  logs: DailyLog[];
}

const Analytics: React.FC<AnalyticsProps> = ({ roadmap, completedTaskIds, logs }) => {
  // Prepare Skill Data
  const allTasks = roadmap.flatMap(m => m.weeks.flatMap(w => w.topics.flatMap(t => t.tasks)));
  const skills = Object.values(SkillCategory);
  
  const skillData = skills.map(skill => {
    const skillTasks = allTasks.filter(t => t.category === skill);
    const completed = skillTasks.filter(t => completedTaskIds.includes(t.id)).length;
    const total = skillTasks.length;
    return {
      name: skill.split(' ')[0], // Shorten name
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0
    };
  }).filter(d => d.total > 0);

  // Prepare Daily Log Data (Last 7 entries or aggregated by week ideally, keeping simpe)
  const studyData = logs.slice().sort((a,b) => a.date.localeCompare(b.date)).map(log => ({
    date: log.date.substring(5), // Remove year
    hours: log.hoursStudied
  }));

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Analytics</h2>
        <p className="text-slate-500 mt-2">Visualizing your progress and study habits.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Skill Proficiency */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Skill Proficiency</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={skillData}
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="percentage" fill="#4f46e5" radius={[0, 4, 4, 0]} name="Completion %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Habits */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Study Consistency (Recent)</h3>
           {studyData.length > 0 ? (
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <LineChart data={studyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="hours" stroke="#0ea5e9" strokeWidth={2} activeDot={{ r: 8 }} name="Hours Studied" />
                </LineChart>
                </ResponsiveContainer>
            </div>
           ) : (
               <div className="h-80 w-full flex items-center justify-center text-slate-400">
                   Not enough data logs yet.
               </div>
           )}
        </div>
      </div>

        {/* Detailed Breakdown Table */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Detailed Breakdown</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-slate-200">
                            <th className="px-4 py-2 font-medium text-slate-500">Category</th>
                            <th className="px-4 py-2 font-medium text-slate-500">Tasks Completed</th>
                            <th className="px-4 py-2 font-medium text-slate-500">Total Tasks</th>
                            <th className="px-4 py-2 font-medium text-slate-500">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skillData.map((row) => (
                            <tr key={row.name} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                                <td className="px-4 py-3 font-medium text-slate-700">{row.name}</td>
                                <td className="px-4 py-3 text-slate-600">{row.completed}</td>
                                <td className="px-4 py-3 text-slate-600">{row.total}</td>
                                <td className="px-4 py-3">
                                    <div className="w-full bg-slate-200 rounded-full h-2.5 max-w-[100px]">
                                        <div 
                                            className={`h-2.5 rounded-full ${row.percentage === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                            style={{ width: `${row.percentage}%` }}
                                        ></div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  );
};

export default Analytics;