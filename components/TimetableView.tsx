
import React, { useState } from 'react';
import { SemesterTimetable, Semester } from '../types';
import { USER_PROFILE } from '../constants';

interface TimetableViewProps {
  timetables: SemesterTimetable[];
  syllabus: Semester[];
}

const TimetableView: React.FC<TimetableViewProps> = ({ timetables, syllabus }) => {
  const [activeSem, setActiveSem] = useState(2); 
  const [isExporting, setIsExporting] = useState(false);
  const currentTimetable = timetables.find(t => t.semesterId === activeSem);
  const allCourses = syllabus.flatMap(s => s.courses);

  const getCourseInfo = (code: string) => {
    return allCourses.find(c => c.code === code);
  };

  const getSlotColor = (type: string) => {
    switch (type) {
      case 'Lecture': return 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:bg-indigo-100';
      case 'Lab': return 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:bg-emerald-100';
      case 'Tutorial': return 'bg-amber-50 border-amber-100 text-amber-700 hover:bg-amber-100';
      case 'Other': return 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100';
      default: return 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100';
    }
  };

  const handleExportPDF = () => {
    const element = document.getElementById('timetable-content');
    if (!element) return;

    setIsExporting(true);

    const opt = {
      margin: 5,
      filename: `Niketh_P_Semester_${activeSem}_Timetable.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save().then(() => {
      setIsExporting(false);
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Academic Schedule</h2>
          <p className="text-sm text-slate-500 font-medium">{USER_PROFILE.department} • Amrita University</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {timetables.map((t) => (
              <button
                key={t.semesterId}
                onClick={() => setActiveSem(t.semesterId)}
                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSem === t.semesterId 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                Semester {t.semesterId}
              </button>
            ))}
          </div>
          
          <div className="hidden lg:flex gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
            <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400">
              <div className="w-2.5 h-2.5 rounded bg-indigo-500"></div> LECTURE
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400">
              <div className="w-2.5 h-2.5 rounded bg-emerald-500"></div> LAB
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-black text-slate-400">
              <div className="w-2.5 h-2.5 rounded bg-amber-500"></div> TUTORIAL
            </span>
          </div>
        </div>
      </div>

      <div id="timetable-content" className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm">
        {/* Header for PDF and Branding */}
        <div className="mb-10 flex justify-between items-end border-b border-slate-100 pb-6">
           <div>
             <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Class Timetable</h3>
             <p className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">M.Sc. Chemistry | Semester {activeSem}</p>
           </div>
           <div className="text-right">
             <div className="flex items-center justify-end gap-2 mb-1">
               <span className="text-[10px] font-black text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">Official</span>
               <p className="text-xs font-black text-slate-800">{USER_PROFILE.name}</p>
             </div>
             <p className="text-[9px] font-bold text-slate-400">Academic Year: 2025-26</p>
           </div>
        </div>

        <div className="flex flex-col gap-6">
          {currentTimetable?.entries.map((entry) => (
            <div key={entry.day} className="flex flex-col lg:flex-row gap-6 group">
              {/* Day Label - Vertical in Mobile, Side in Desktop */}
              <div className="lg:w-32 flex-shrink-0 flex items-center">
                <div className="w-full bg-slate-900 py-3 px-4 rounded-2xl shadow-lg shadow-slate-900/10 transform transition-transform group-hover:-translate-x-1">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] text-center">{entry.day}</h3>
                </div>
              </div>
              
              {/* Horizontal Lane for Slots */}
              <div className="flex-1 flex flex-wrap lg:flex-nowrap gap-4 items-stretch">
                {entry.slots.map((slot, i) => {
                  const course = getCourseInfo(slot.courseCode);
                  const colorClass = getSlotColor(slot.type);

                  return (
                    <div 
                      key={i} 
                      className={`flex-1 min-w-[200px] lg:min-w-0 p-5 rounded-[1.5rem] border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default relative overflow-hidden ${colorClass}`}
                    >
                      <div className="flex justify-between items-start mb-3 relative z-10">
                        <div className="space-y-0.5">
                          <p className="text-[9px] font-black opacity-40 uppercase tracking-widest">Time Slot</p>
                          <span className="text-[11px] font-black tracking-tight">{slot.time}</span>
                        </div>
                        <span className="text-[8px] font-black bg-white/50 backdrop-blur px-2 py-1 rounded-lg uppercase tracking-widest border border-white/20">
                          {slot.type}
                        </span>
                      </div>
                      
                      <h4 className="text-sm font-black leading-tight mb-4 min-h-[2.5rem] relative z-10">
                        {course?.title || slot.courseCode}
                      </h4>
                      
                      <div className="pt-4 border-t border-black/5 flex flex-col gap-1.5 relative z-10">
                        <div className="flex items-center gap-2 opacity-60">
                          <i className="fas fa-location-dot text-[9px]"></i>
                          <span className="text-[10px] font-bold tracking-tight">{slot.room}</span>
                        </div>
                        {slot.faculty && (
                          <div className="flex items-center gap-2 opacity-60">
                            <i className="fas fa-user-tie text-[9px]"></i>
                            <span className="text-[10px] font-bold truncate">{slot.faculty}</span>
                          </div>
                        )}
                      </div>

                      {/* Subtle Icon Background */}
                      <div className="absolute -bottom-2 -right-2 opacity-[0.03]">
                        <i className={`fas ${slot.type === 'Lab' ? 'fa-flask' : 'fa-graduation-cap'} text-5xl rotate-12`}></i>
                      </div>
                    </div>
                  );
                })}
                
                {entry.slots.length === 0 && (
                  <div className="flex-1 h-32 rounded-[1.5rem] border-2 border-dashed border-slate-100 flex flex-col items-center justify-center text-slate-300 gap-2 bg-slate-50/30">
                    <i className="fas fa-cloud-sun text-xl opacity-20"></i>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30">No Academic Sessions</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50 flex items-center justify-center gap-8">
           <div className="flex items-center gap-2">
             <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Standard Duration: 50m / slot</p>
           </div>
           <div className="flex items-center gap-2">
             <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Building: AB2 School of Physical Sciences</p>
           </div>
        </div>
      </div>
      
      <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden group">
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-red-900/40 transform -rotate-6 transition-transform group-hover:rotate-0">
             <i className="fas fa-file-pdf text-2xl"></i>
           </div>
           <div>
             <h5 className="text-lg font-black tracking-tight mb-1">Academic Resource Export</h5>
             <p className="text-xs text-slate-400 font-medium">Download high-resolution schedule for offline reference.</p>
           </div>
        </div>
        
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={handleExportPDF}
            disabled={isExporting}
            className="px-8 py-4 bg-white text-slate-900 rounded-2xl text-[11px] font-black hover:bg-slate-100 transition-all flex items-center gap-3 shadow-xl active:scale-95 disabled:opacity-50 uppercase tracking-widest"
          >
            {isExporting ? (
              <div className="w-4 h-4 border-[3px] border-slate-900/20 border-t-slate-900 rounded-full animate-spin"></div>
            ) : (
              <i className="fas fa-arrow-down-to-bracket text-xs"></i>
            )}
            {isExporting ? 'Processing...' : 'Export PDF'}
          </button>
          <button className="px-8 py-4 bg-slate-800 text-slate-300 border border-slate-700 rounded-2xl text-[11px] font-black hover:bg-slate-700 transition-all flex items-center gap-3 uppercase tracking-widest">
            <i className="fas fa-calendar-check text-xs"></i> Sync to Cloud
          </button>
        </div>

        {/* Decorative atoms */}
        <div className="absolute top-0 right-0 p-4 opacity-5">
           <i className="fas fa-atom text-9xl"></i>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;
