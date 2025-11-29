import React, { useState } from 'react';
import { DailyLog } from '../types';
import { Save, Plus } from 'lucide-react';

interface DailyLogProps {
  logs: DailyLog[];
  onAddLog: (log: DailyLog) => void;
}

const DailyLogPage: React.FC<DailyLogProps> = ({ logs, onAddLog }) => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [hours, setHours] = useState<number>(2);
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: DailyLog = {
      id: Date.now().toString(),
      date,
      hoursStudied: Number(hours),
      notes,
      topicsCovered: [] // Simplified for this demo
    };
    onAddLog(newLog);
    setNotes('');
    setSuccessMsg('Log saved successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Daily Log</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">Consistency &gt; Intensity.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Hours Studied</label>
            <input
              type="number"
              min="0.5"
              step="0.5"
              required
              value={hours}
              onChange={(e) => setHours(Number(e.target.value))}
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-100"
            />
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Recommended: 2 hours</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Notes / Reflection</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you learn today? Any blockers?"
              className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-slate-700 dark:text-slate-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Save size={18} />
            <span>Save Entry</span>
          </button>
          
          {successMsg && (
            <p className="text-center text-sm text-green-600 dark:text-green-400 font-medium animate-pulse">{successMsg}</p>
          )}
        </form>
      </div>

      <div className="lg:col-span-2">
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">History</h3>
        {logs.length === 0 ? (
          <div className="bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-12 text-center">
            <div className="mx-auto w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mb-4">
               <Plus className="text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400">No logs yet. Start today!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.slice().reverse().map((log) => (
              <div key={log.id} className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row md:justify-between md:items-start">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="font-mono text-sm bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-600 dark:text-slate-300">{log.date}</span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full">{log.hoursStudied} hrs</span>
                  </div>
                  {log.notes && <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{log.notes}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyLogPage;