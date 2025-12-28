
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

  const getAccentColor = (code: string) => {
    const map: Record<string, string> = {
      '25CHY511': '#f43f5e',
      '25CHY512': '#f59e0b',
      '25CHY513': '#6366f1',
      '25CHY514': '#10b981',
      '25CHY515': '#0ea5e9',
      '25CHY583': '#14b8a6',
      '25CHY584': '#f97316',
      '22ADM201': '#a855f7',
      '25AVP501': '#d946ef',
      'CIR': '#94a3b8',
    };
    return map[code] || '#cbd5e1';
  };

  const handleExportPDF = () => {
    const element = document.getElementById('timetable-content');
    if (!element) return;
    setIsExporting(true);
    const opt = {
      margin: 5,
      filename: `Niketh_P_Sem${activeSem}_Timetable.pdf`,
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
    <div className="space-y-6 animate-slide-up pb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-calendar-alt text-sm"></i>
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800 tracking-tight uppercase leading-none mb-1">Weekly Schedule</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Niketh P • Semester {activeSem}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
            {[1, 2, 3, 4].map((id) => (
              <button
                key={id}
                onClick={() => setActiveSem(id)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
                  activeSem === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                SEM {id}
              </button>
            ))}
          </div>
          <button onClick={handleExportPDF} className="btn-primary" style={{padding: '0.65rem 1rem'}}>
            {isExporting ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-download"></i>}
          </button>
        </div>
      </div>

      <div id="timetable-content" className="overflow-x-auto pb-4 custom-scroll">
        <div className="timetable-matrix">
          {currentTimetable?.entries.map((entry) => (
            <div key={entry.day} className="space-y-3 flex flex-col">
              <div className="timetable-day-header">
                {entry.day}
              </div>

              <div className="space-y-2">
                {entry.slots.map((slot, i) => {
                  const course = getCourseInfo(slot.courseCode);
                  const accent = getAccentColor(slot.courseCode);

                  return (
                    <div key={i} className="timetable-slot-card">
                      <div className="h-1 w-full" style={{backgroundColor: accent}}></div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">{slot.time.split(' ')[0]}</span>
                          <span className="badge" style={{background: 'rgba(0,0,0,0.03)', border: 'none', color: '#64748b'}}>{slot.type}</span>
                        </div>
                        <h4 className="text-[10px] font-black text-slate-800 line-clamp-2 uppercase leading-snug mb-1">
                          {course?.title || slot.courseCode}
                        </h4>
                        <p className="text-[8px] font-bold text-slate-400 tracking-widest mb-3">{slot.courseCode}</p>
                        <div className="pt-2 border-t border-slate-50 flex items-center justify-between">
                          <span className="text-[8px] font-black text-slate-500 uppercase"><i className="fas fa-door-open mr-1 opacity-40"></i>{slot.room}</span>
                          <span className="text-[8px] font-bold text-slate-400 uppercase truncate max-w-[60px]">{slot.faculty?.split(' ').pop()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4 p-6 bg-white rounded-3xl border border-slate-200">
          {Array.from(new Set(currentTimetable?.entries.flatMap(e => e.slots.map(s => s.courseCode)) || [])).map(code => (
             <div key={code} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{backgroundColor: getAccentColor(code)}}></div>
                <span className="text-[9px] font-black text-slate-600 uppercase">{code}</span>
             </div>
          ))}
      </div>
    </div>
  );
};

export default TimetableView;
