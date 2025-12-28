
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

  const getCourseColor = (code: string) => {
    const colors: Record<string, string> = {
      '25CHY511': 'bg-rose-500',
      '25CHY512': 'bg-amber-500',
      '25CHY513': 'bg-indigo-500',
      '25CHY514': 'bg-emerald-500',
      '25CHY515': 'bg-sky-500',
      '25CHY583': 'bg-teal-500',
      '25CHY584': 'bg-orange-500',
      '22ADM201': 'bg-purple-500',
      '25AVP501': 'bg-fuchsia-500',
      'CIR': 'bg-slate-400',
    };
    return colors[code] || 'bg-slate-300';
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
    <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Header & Semester Selection */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight leading-none mb-1">Weekly Schedule</h2>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sem {activeSem} • {USER_PROFILE.program}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            {[1, 2, 3, 4].map((id) => (
              <button
                key={id}
                onClick={() => setActiveSem(id)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black transition-all ${
                  activeSem === id 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                SEM {id}
              </button>
            ))}
          </div>
          <button 
            onClick={handleExportPDF}
            className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all text-sm active:scale-95 shadow-md shadow-slate-200"
          >
            {isExporting ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-download"></i>}
          </button>
        </div>
      </div>

      {/* The Weekly Matrix Grid */}
      <div id="timetable-content" className="overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[1000px] grid grid-cols-5 gap-3">
          {currentTimetable?.entries.map((entry) => (
            <div key={entry.day} className="space-y-3 flex flex-col h-full">
              {/* Day Header */}
              <div className="bg-slate-900 text-white rounded-2xl p-3 text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">{entry.day}</span>
              </div>

              {/* Class Column */}
              <div className="flex-1 space-y-2">
                {entry.slots.map((slot, i) => {
                  const course = getCourseInfo(slot.courseCode);
                  const colorClass = getCourseColor(slot.courseCode);

                  return (
                    <div 
                      key={i} 
                      className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all border-l-0 relative"
                    >
                      {/* Top Accent Bar */}
                      <div className={`h-1.5 w-full ${colorClass}`}></div>
                      
                      <div className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">
                            {slot.time.split(' - ')[0]}
                          </span>
                          <span className="text-[7px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md uppercase">
                            {slot.type}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-[11px] font-black text-slate-800 leading-tight line-clamp-2 uppercase">
                            {course?.title || slot.courseCode}
                          </h4>
                          <p className="text-[9px] font-bold text-slate-400 mt-1 font-mono">{slot.courseCode}</p>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                          <span className="text-[9px] font-bold text-slate-500">
                            <i className="fas fa-door-open mr-1 text-[8px]"></i>{slot.room}
                          </span>
                          {slot.faculty && (
                            <span className="text-[9px] font-bold text-slate-400 truncate max-w-[60px]" title={slot.faculty}>
                              {slot.faculty.split(' ').pop()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {entry.slots.length === 0 && (
                  <div className="h-32 rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center bg-slate-50/30">
                    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Free</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Legend & Summary Footer */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
        <div className="flex flex-wrap gap-3">
          {Array.from(new Set(currentTimetable?.entries.flatMap(e => e.slots.map(s => s.courseCode)) || [])).map((code: string) => (
            <div key={code} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-[9px] font-black text-slate-600">
              <div className={`w-2 h-2 rounded-full ${getCourseColor(code)}`}></div>
              {code}
            </div>
          ))}
        </div>
        <div className="text-center md:text-right">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Academic Schedule • Generated for {USER_PROFILE.name}
          </p>
          <p className="text-[8px] font-medium text-slate-300 uppercase tracking-widest mt-1">
            Verification ID: {USER_PROFILE.regNo}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;
