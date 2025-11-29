import React from 'react';
import { LayoutDashboard, Map, BookOpen, BarChart2, MessageSquare } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'roadmap', label: 'Roadmap', icon: <Map size={20} /> },
    { id: 'log', label: 'Daily Log', icon: <BookOpen size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'ai-tutor', label: 'AI Tutor', icon: <MessageSquare size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex-shrink-0 hidden md:flex flex-col border-r border-slate-800">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            DE Tracker
          </h1>
          <p className="text-xs text-slate-400 mt-1">Data Engineering Path</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Local Mode</span>
          </div>
        </div>
      </aside>

      {/* Mobile Nav Header */}
      <div className="md:hidden fixed top-0 w-full bg-slate-900 text-slate-100 z-50 p-4 flex justify-between items-center shadow-md">
         <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">DE Tracker</span>
         <div className="flex space-x-5 overflow-x-auto no-scrollbar">
             {navItems.map(item => (
                 <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex-shrink-0 transition-colors ${activeTab === item.id ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>
                     {item.icon}
                 </button>
             ))}
         </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-8 pt-20 md:pt-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;