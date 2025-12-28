
import React from 'react';
import { ViewMode } from '../App';
import { SemesterResult } from '../types';

interface DashboardViewProps {
  onNavigate: (mode: ViewMode) => void;
  profile: any;
  results: SemesterResult[];
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, profile, results }) => {
  const publishedResults = results.filter(r => r.published);
  const cgpaValue = publishedResults.length > 0 
    ? (publishedResults.reduce((acc, r) => acc + r.sgpa, 0) / publishedResults.length)
    : 0;
  const cgpa = cgpaValue.toFixed(2);

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 hero-card">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <span className="badge" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white'}}>
                {profile.batch}
              </span>
              <span className="badge" style={{background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white'}}>
                {profile.program}
              </span>
            </div>
            <h1 className="text-4xl font-black mb-4 tracking-tighter uppercase">Welcome back, {profile.name.split(' ')[0]}</h1>
            <p className="text-indigo-100/70 text-sm max-w-md leading-relaxed mb-8 font-medium">
              You are currently enrolled in Semester 2 at the School of Physical Sciences. Your academic performance is on track for the 2025 academic session.
            </p>
            <div className="flex gap-4">
              <button onClick={() => onNavigate('syllabus')} className="btn-secondary" style={{background: 'white', color: '#1e293b'}}>
                Study Hub
              </button>
              <button onClick={() => onNavigate('timetable')} className="btn-secondary">
                Schedule
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
            <i className="fas fa-flask text-[320px]"></i>
          </div>
        </div>

        <div className="w-full lg:w-80 stat-card">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-6 transform rotate-3 shadow-inner">
            <i className="fas fa-chart-line text-2xl"></i>
          </div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Cumulative CGPA</h3>
          <p className="text-6xl font-black text-slate-800 tracking-tighter mb-4">{cgpa}</p>
          <div className="badge badge-blue">
            <i className="fas fa-check-circle mr-1"></i> Very Good Standing
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="portal-card cursor-pointer group" onClick={() => onNavigate('timetable')}>
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-red-600 group-hover:text-white transition-all shadow-sm">
              <i className="fas fa-clock text-lg"></i>
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Active session</span>
          </div>
          <p className="text-[10px] font-black text-slate-400 mb-1 uppercase">Next Lecture</p>
          <h4 className="text-lg font-black text-slate-800 leading-tight uppercase">Molecular Spectroscopy</h4>
          <p className="text-[10px] text-slate-500 font-bold mt-1 uppercase">AB2-D305 • 02:00 PM</p>
          <div className="mt-8 text-red-600 font-black text-[9px] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-1 transition-transform">
            View full schedule <i className="fas fa-chevron-right text-[7px]"></i>
          </div>
        </div>

        <div className="portal-card cursor-pointer group" onClick={() => onNavigate('syllabus')}>
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
              <i className="fas fa-book-open text-lg"></i>
            </div>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Syllabus Progress</span>
          </div>
          <div className="flex justify-between mb-2">
            <p className="text-[10px] font-black text-slate-800 uppercase">Module Progress</p>
            <p className="text-[10px] font-black text-indigo-600 uppercase">35%</p>
          </div>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 transition-all duration-1000" style={{width: '35%'}}></div>
          </div>
          <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase">Quantum Mechanics II</p>
        </div>

        <div className="portal-card bg-slate-900 text-white cursor-pointer group" onClick={() => onNavigate('profile')}>
          <div className="flex justify-between items-start mb-10">
            <div className="w-12 h-12 rounded-2xl bg-red-600 flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
              <i className="fas fa-id-card text-lg"></i>
            </div>
            <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">Student info</span>
          </div>
          <p className="text-[10px] font-black text-slate-500 mb-1 uppercase">Registration Number</p>
          <h4 className="text-xl font-black text-white tracking-tighter uppercase mb-6">{profile.regNo}</h4>
          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest">
            Profile Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
