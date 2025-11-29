import React from 'react';
import { MonthModule, DailyLog } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CheckCircle, Clock, Calendar, TrendingUp } from 'lucide-react';

interface DashboardProps {
  roadmap: MonthModule[];
  completedTaskIds: string[];
  logs: DailyLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ roadmap, completedTaskIds, logs }) => {
  // Calculations
  const totalTasks = roadmap.reduce((acc, month) => 
    acc + month.weeks.reduce((wAcc, week) => 
      wAcc + week.topics.reduce((tAcc, topic) => tAcc + topic.tasks.length, 0), 0), 0);
  
  const completedCount = completedTaskIds.length;
  const progressPercent = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  
  const totalHours = logs.reduce((acc, log) => acc + log.hoursStudied, 0);
  
  // Get current milestone
  const currentMonth = roadmap.find(m => {
    // Find the first month where not all tasks are completed
    const monthTaskIds = m.weeks.flatMap(w => w.topics.flatMap(t => t.tasks.map(tk => tk.id)));
    return monthTaskIds.some(id => !completedTaskIds.includes(id));
  }) || roadmap[roadmap.length - 1];

  const pieData = [
    { name: 'Completed', value: completedCount },
    { name: 'Remaining', value: totalTasks - completedCount },
  ];
  const COLORS = ['#2563eb', '#e2e8f0'];

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-3xl font-bold text-slate-800">Welcome Back, Engineer</h2>
        <p className="text-slate-500 mt-2">Track your journey to becoming a Data Engineer.</p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Completion</p>
            <h3 className="text-2xl font-bold text-slate-800">{progressPercent}%</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Hours Studied</p>
            <h3 className="text-2xl font-bold text-slate-800">{totalHours}h</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <Calendar size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Study Sessions</p>
            <h3 className="text-2xl font-bold text-slate-800">{logs.length}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm text-slate-500 font-medium">Current Goal</p>
            <h3 className="text-sm font-bold text-slate-800 truncate max-w-[120px]" title={currentMonth.goal}>{currentMonth.goal}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Overall Progress</h3>
          <div className="h-64 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                <span className="text-3xl font-bold text-slate-800">{progressPercent}%</span>
                <span className="text-xs text-slate-400 uppercase tracking-wide">Done</span>
             </div>
          </div>
        </div>

        {/* Current Focus */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Current Focus: {currentMonth.title}</h3>
            <div className="space-y-4">
                {currentMonth.weeks.slice(0, 2).map(week => (
                    <div key={week.id} className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-medium text-slate-700 mb-2">{week.title}</h4>
                        <div className="space-y-2">
                            {week.topics.flatMap(t => t.tasks).slice(0, 3).map(task => (
                                <div key={task.id} className="flex items-center space-x-2">
                                    <div className={`w-4 h-4 rounded-full border ${completedTaskIds.includes(task.id) ? 'bg-blue-500 border-blue-500' : 'border-slate-300'}`}></div>
                                    <span className={`text-sm ${completedTaskIds.includes(task.id) ? 'text-slate-400 line-through' : 'text-slate-600'}`}>{task.title}</span>
                                </div>
                            ))}
                            {week.topics.flatMap(t => t.tasks).length > 3 && (
                                <p className="text-xs text-blue-500 font-medium pl-6">...and more in Roadmap</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;