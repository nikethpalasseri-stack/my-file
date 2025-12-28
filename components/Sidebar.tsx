
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
    { mode: 'profile', icon: 'fa-user-graduate', label: 'Academic Bio' },
    { mode: 'syllabus', icon: 'fa-book-open', label: 'Syllabus Hub' },
    { mode: 'timetable', icon: 'fa-calendar-days', label: 'My Schedule' },
    { mode: 'calendar', icon: 'fa-calendar-check', label: 'Uni Calendar' },
    { mode: 'results', icon: 'fa-chart-column', label: 'Exam Results' },
  ];

  return (
    <aside className="sidebar">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg transform -rotate-3">
            <i className="fas fa-graduation-cap text-lg"></i>
          </div>
          <div>
            <h2 className="font-black text-white text-sm tracking-tighter leading-none mb-1 uppercase">{profile.name.split(' ')[0]}</h2>
            <p className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Postgrad Portal</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => setViewMode(item.mode)}
              className={`nav-link ${viewMode === item.mode ? 'active' : ''}`}
            >
              <i className={`fas ${item.icon} w-5 text-sm`}></i>
              <span className="uppercase tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="bg-slate-800/40 rounded-2xl p-4 border border-slate-700/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-700">
               {profile.photo ? (
                 <img src={profile.photo} className="w-full h-full object-cover" alt="Avatar" />
               ) : (
                 <div className="w-full h-full bg-slate-700 flex items-center justify-center text-[10px] font-black">{profile.avatar}</div>
               )}
            </div>
            <div className="min-w-0">
              <p className="text-[9px] font-black text-white uppercase tracking-tight truncate">{profile.name}</p>
              <p className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">M.Sc Chemistry</p>
            </div>
          </div>
        </div>
        
        <button 
          onClick={onLogout}
          className="w-full py-3 text-[10px] font-black text-slate-500 hover:text-red-500 transition-colors bg-slate-800/20 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 uppercase tracking-widest"
        >
          <i className="fas fa-power-off"></i>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
