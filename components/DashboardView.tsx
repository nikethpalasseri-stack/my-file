
import React from 'react';
import { ViewMode } from '../App';
import { SemesterResult } from '../types';

interface DashboardViewProps {
  onNavigate: (mode: ViewMode) => void;
  profile: any;
  results: SemesterResult[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, profile, results }) => {
  // Calculate CGPA based on published results
  const publishedResults = results.filter(r => r.published);
  const cgpaValue = publishedResults.length > 0 
    ? (publishedResults.reduce((acc, r) => acc + r.sgpa, 0) / publishedResults.length)
    : 0;
  const cgpa = cgpaValue.toFixed(2);

  // Realistic Academic Standing Logic
  const getAcademicStanding = (val: number) => {
    if (val >= 9.0) return { label: 'OUTSTANDING', color: 'text-emerald-600 bg-emerald-50 border-emerald-100', icon: 'fa-trophy' };
    if (val >= 8.0) return { label: 'EXCELLENT', color: 'text-green-600 bg-green-50 border-green-100', icon: 'fa-star' };
    if (val >= 7.0) return { label: 'VERY GOOD', color: 'text-blue-600 bg-blue-50 border-blue-100', icon: 'fa-check-circle' };
    if (val >= 6.0) return { label: 'GOOD', color: 'text-indigo-600 bg-indigo-50 border-indigo-100', icon: 'fa-thumbs-up' };
    return { label: 'PASSING', color: 'text-slate-600 bg-slate-50 border-slate-100', icon: 'fa-user-graduate' };
  };

  const standing = getAcademicStanding(cgpaValue);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-gradient-to-br from-red-900 to-indigo-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-0.5 bg-white/10 backdrop-blur rounded text-[9px] font-black uppercase tracking-widest border border-white/20">
                {profile.campus}
              </span>
              <span className="px-2 py-0.5 bg-white/10 backdrop-blur rounded text-[9px] font-black uppercase tracking-widest border border-white/20">
                {profile.school}
              </span>
            </div>
            <h1 className="text-4xl font-black mb-2 tracking-tight">Hello, {profile.name}</h1>
            <p className="text-indigo-100/80 text-sm max-w-md leading-relaxed mb-8 font-medium">
              Academic Dashboard for M.Sc. Chemistry (2025-2027). Currently attending Semester 2 classes at the School of Physical Sciences.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('syllabus')}
                className="px-8 py-3 bg-white text-red-900 rounded-2xl text-xs font-black hover:bg-red-50 transition-all active:scale-95 shadow-xl shadow-red-950/20"
              >
                STUDY HUB
              </button>
              <button 
                onClick={() => onNavigate('timetable')}
                className="px-8 py-3 bg-red-600/20 backdrop-blur-md border border-white/20 text-white rounded-2xl text-xs font-black hover:bg-red-600/40 transition-all"
              >
                VIEW SCHEDULE
              </button>
            </div>
          </div>
          {/* Subtle lab icons in background */}
          <div className="absolute top-1/2 right-0 opacity-[0.05] -translate-y-1/2 scale-150 pointer-events-none">
            <i className="fas fa-atom text-[240px]"></i>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full md:w-80 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-inner transform rotate-3">
            <i className="fas fa-chart-line text-3xl"></i>
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Current CGPA</h3>
          <p className="text-5xl font-black text-slate-800 mb-4 tracking-tighter">{cgpa}</p>
          <div className={`flex items-center gap-2 text-[10px] font-black px-3 py-1.5 rounded-xl border ${standing.color}`}>
            <i className={`fas ${standing.icon}`}></i>
            STANDING: {standing.label}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-red-600/20 hover:shadow-2xl transition-all cursor-pointer group" onClick={() => onNavigate('timetable')}>
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm group-hover:bg-red-600 group-hover:text-white transition-all">
              <i className="fas fa-calendar-day text-lg"></i>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Schedule</span>
          </div>
          <p className="text-xs font-black text-slate-400 mb-1 uppercase tracking-wider">Next Session</p>
          <p className="text-lg font-black text-slate-800 mb-1 leading-tight">Chemical Thermodynamics</p>
          <p className="text-xs text-slate-500 font-medium italic">AB2-D305 | Coimbatore Campus</p>
          <div className="mt-8 flex items-center gap-2 text-red-600 font-black text-[10px] group-hover:translate-x-1 transition-transform">
            OPEN FULL TIMETABLE <i className="fas fa-arrow-right text-[8px]"></i>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-indigo-600/20 hover:shadow-2xl transition-all cursor-pointer group" onClick={() => onNavigate('syllabus')}>
          <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <i className="fas fa-book text-lg"></i>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chemistry Hub</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-lg font-black text-slate-800 tracking-tight">Sem 2 Syllabus</p>
            <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-lg">35% Done</span>
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-700 w-[35%] rounded-full"></div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Molecular Spectroscopy Module</p>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-900/50 transform group-hover:rotate-12 transition-transform">
                <i className="fas fa-graduation-cap text-lg"></i>
              </div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Academic Info</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 mb-1 uppercase tracking-wider">Registration Number</p>
            <p className="text-lg font-black text-white mb-6 font-mono tracking-tight">{profile.regNo}</p>
            <button 
              onClick={() => onNavigate('profile')}
              className="mt-auto py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-2xl text-[10px] font-black text-white transition-all uppercase tracking-widest"
            >
              Academic Bio
            </button>
          </div>
          <div className="absolute -bottom-4 -right-4 opacity-[0.03] scale-150 rotate-12">
            <i className="fas fa-building-columns text-[160px] text-white"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
