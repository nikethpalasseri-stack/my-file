
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getTypeColor = () => {
    switch (course.type) {
      case 'Theory': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Lab': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Project': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <button 
      onClick={onClick}
      className="group text-left bg-white p-6 rounded-2xl border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTypeColor()}`}>
          {course.type}
        </span>
        <span className="text-xs font-bold text-slate-400 group-hover:text-indigo-500 transition-colors">
          {course.credits} Credits
        </span>
      </div>
      
      <h3 className="font-bold text-slate-800 mb-2 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
        {course.title}
      </h3>
      <p className="text-xs text-slate-500 font-mono mb-6">{course.code}</p>
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
        <div className="flex -space-x-2">
          {Array.from({ length: Math.min(course.topics.length, 3) }).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
              <i className="fas fa-circle text-[6px] text-slate-300"></i>
            </div>
          ))}
          {course.topics.length > 3 && (
            <span className="pl-4 text-[10px] text-slate-400 font-bold">+{course.topics.length - 3}</span>
          )}
        </div>
        <div className="text-indigo-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          <span className="text-xs font-bold">View Syllabus</span>
          <i className="fas fa-arrow-right text-[10px]"></i>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
