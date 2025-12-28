
import React, { useState, useEffect, useRef } from 'react';
import { CalendarMonth } from '../types';

interface CalendarViewProps {
  calendar: CalendarMonth[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ calendar }) => {
  // Find current date to set default month
  const today = new Date();
  const currentMonthName = today.toLocaleString('default', { month: 'long' });
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  // Find index of the month that matches current system date
  const initialMonthIdx = calendar.findIndex(
    m => m.monthName.toLowerCase() === currentMonthName.toLowerCase() && m.year === currentYear
  );

  const [activeMonthIdx, setActiveMonthIdx] = useState(initialMonthIdx !== -1 ? initialMonthIdx : 0);
  const currentMonth = calendar[activeMonthIdx];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const currentDayRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current day when component mounts or month changes
  useEffect(() => {
    if (currentDayRef.current && scrollContainerRef.current) {
      // Small timeout to ensure rendering is complete
      setTimeout(() => {
        currentDayRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [activeMonthIdx]);

  const upcomingEvents = calendar.flatMap(m => 
    m.days.filter(d => d.particulars && (d.status === 'H' || d.particulars?.includes('Exam') || d.particulars?.includes('Commencement')))
  ).slice(0, 10);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Academic Calendar</h2>
          <p className="text-sm text-slate-500 font-medium uppercase tracking-widest mt-1">AY 2025 - 2026 • ODD/EVEN SEM</p>
        </div>
        
        <div className="flex bg-slate-100 p-1.5 rounded-2xl overflow-x-auto max-w-full custom-scrollbar">
          {calendar.map((month, idx) => (
            <button
              key={`${month.monthName}-${month.year}`}
              onClick={() => setActiveMonthIdx(idx)}
              className={`px-5 py-2.5 rounded-xl text-xs font-black transition-all whitespace-nowrap ${
                activeMonthIdx === idx 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {month.monthName} {month.year}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">{currentMonth.monthName} Schedule</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">Holiday</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                  <span className="text-[10px] font-black text-slate-400 uppercase">Working</span>
                </div>
              </div>
            </div>

            <div 
              ref={scrollContainerRef}
              className="p-2 h-[700px] overflow-y-auto custom-scrollbar"
            >
              <div className="grid grid-cols-1 gap-1">
                {currentMonth.days.map((day, idx) => {
                  const isToday = 
                    day.date === currentDate && 
                    currentMonth.monthName.toLowerCase() === currentMonthName.toLowerCase() && 
                    currentMonth.year === currentYear;

                  return (
                    <div 
                      key={idx} 
                      ref={isToday ? currentDayRef : null}
                      className={`flex items-center gap-6 px-6 py-4 rounded-2xl transition-all group ${
                        isToday 
                        ? 'bg-indigo-600 ring-4 ring-indigo-100 shadow-lg' 
                        : day.status === 'H' 
                        ? 'bg-red-50/30 hover:bg-red-50/50' 
                        : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="w-12 text-center shrink-0">
                        <p className={`text-xl font-black tracking-tighter leading-none mb-1 ${
                          isToday ? 'text-white' : (day.status === 'H' ? 'text-red-600' : 'text-slate-800')
                        }`}>
                          {day.date.toString().padStart(2, '0')}
                        </p>
                        <p className={`text-[9px] font-black uppercase tracking-widest ${
                          isToday ? 'text-indigo-200' : (day.day === 'Sun' ? 'text-red-400' : 'text-slate-400')
                        }`}>{day.day}</p>
                      </div>

                      <div className="flex-1 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          {isToday && (
                            <span className="text-[9px] font-black text-indigo-200 uppercase tracking-[0.2em] mb-1 block">TODAY</span>
                          )}
                          {day.particulars ? (
                            <p className={`text-sm font-bold ${
                              isToday ? 'text-white' : (day.status === 'H' ? 'text-red-700' : 'text-slate-700')
                            }`}>
                              {day.particulars}
                            </p>
                          ) : (
                            <p className={`text-sm font-medium ${isToday ? 'text-indigo-100' : 'text-slate-400'}`}>
                              Regular Academic Day
                            </p>
                          )}
                        </div>

                        {day.cd && (
                          <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shrink-0 self-start md:self-auto shadow-sm ${
                            isToday ? 'bg-white text-indigo-600' : 'bg-slate-900 text-white'
                          }`}>
                             {day.cd}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Important Milestones</h3>
              <div className="space-y-6">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex gap-4 group/item">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 group-hover/item:bg-red-600 transition-colors">
                      <i className={`fas ${event.status === 'H' ? 'fa-umbrella-beach' : 'fa-graduation-cap'} text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">
                        {event.date} {calendar.find(m => m.days.some(d => d === event))?.monthName}
                      </p>
                      <p className="text-xs font-bold leading-tight line-clamp-2">{event.particulars}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <i className="fas fa-calendar-alt absolute -bottom-8 -right-8 text-white/5 text-[180px] group-hover:scale-110 transition-transform"></i>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
             <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                 <i className="fas fa-info-circle text-lg"></i>
               </div>
               <div>
                 <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">Reference Keys</h4>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Calendar Indicators</p>
               </div>
             </div>
             <div className="space-y-4">
               <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                 <span className="text-[10px] font-black text-slate-500">CD Label</span>
                 <span className="text-[10px] font-bold text-slate-400">Class Day Number</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-xl border border-red-100/50">
                 <span className="text-[10px] font-black text-red-600 uppercase">H Status</span>
                 <span className="text-[10px] font-bold text-red-400">Sunday / Public Holiday</span>
               </div>
               <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                 <span className="text-[10px] font-black text-indigo-600 uppercase">W Status</span>
                 <span className="text-[10px] font-bold text-indigo-400">Regular Working Day</span>
               </div>
               <p className="text-[9px] text-slate-400 leading-relaxed italic px-2 pt-2">
                 * Saturday classes follow specific weekday timetables as mentioned in the particulars.
               </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
