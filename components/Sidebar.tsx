
import React from 'react';
import { ViewMode } from '../App';

interface SidebarProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  onLogout: () => void;
  profile: any;
}

const Sidebar: React.FC<SidebarProps> = ({ viewMode, setViewMode, onLogout, profile }) => {
  const navItems: { mode: ViewMode; icon: string; label: string }[] = [
    { mode: 'dashboard', icon: 'fa-house', label: 'Home' },
    { mode: 'profile', icon: 'fa-user-graduate', label: 'My Academic Bio' },
    { mode: 'syllabus', icon: 'fa-book-open', label: 'Syllabus & Notes' },
    { mode: 'timetable', icon: 'fa-calendar-days', label: 'My Schedule' },
    { mode: 'results', icon: 'fa-chart-column', label: 'Results Hub' },
  ];

  return (
    <aside className="w-64 bg-slate-900 flex flex-col text-slate-300 shadow-2xl z-20">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-red-900/40 transform -rotate-3">
            <i className="fas fa-flask-vial text-lg"></i>
          </div>
          <div>
            <h2 className="font-black text-white text-base tracking-tighter leading-none mb-1">{profile.name}</h2>
            <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Student Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                viewMode === item.mode 
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <i className={`fas ${item.icon} w-5 text-sm ${viewMode === item.mode ? 'text-white' : 'text-slate-500'}`}></i>
              <span className={`text-sm ${viewMode === item.mode ? 'font-black' : 'font-medium'}`}>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
               {profile.photo ? (
                 <img src={profile.photo} className="w-full h-full object-cover" alt="Avatar" />
               ) : (
                 <div className="w-full h-full bg-slate-700 flex items-center justify-center text-[10px]">{profile.avatar}</div>
               )}
            </div>
            <div>
              <p className="text-[10px] font-black text-white uppercase tracking-tight truncate w-32">{profile.name}</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Active Session</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">Current CGPA</span>
              <span className="text-white font-black tracking-tight">7.33</span>
            </div>
          </div>
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-black text-slate-500 hover:text-red-500 transition-colors bg-slate-800/20 hover:bg-slate-800 rounded-xl"
        >
          <i className="fas fa-power-off text-[10px]"></i>
          SIGN OUT
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
