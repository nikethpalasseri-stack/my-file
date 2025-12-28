
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getTypeColorClass = () => {
    switch (course.type) {
      case 'Theory': return 'badge-blue';
      case 'Lab': return 'badge-green';
      case 'Project': return 'badge-red';
      default: return 'badge-red';
    }
  };

  return (
    <button onClick={onClick} className="portal-card text-left group">
      <div className="flex justify-between items-start mb-6">
        <span className={`badge ${getTypeColorClass()}`}>
          {course.type}
        </span>
        <span className="text-[10px] font-black text-slate-300 group-hover:text-indigo-600 transition-colors uppercase">
          {course.credits} Credits
        </span>
      </div>
      
      <h3 className="text-base font-black text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors uppercase">
        {course.title}
      </h3>
      <p className="text-[10px] text-slate-400 font-bold tracking-widest mb-8">{course.code}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-50">
        <div className="flex -space-x-2">
          {course.topics.slice(0, 3).map((_, i) => (
            <div key={i} className="w-6 h-6 rounded-full bg-slate-50 border-2 border-white flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
            </div>
          ))}
          {course.topics.length > 3 && (
            <span className="pl-4 text-[9px] text-slate-400 font-black">+{course.topics.length - 3}</span>
          )}
        </div>
        <div className="text-indigo-600 text-[9px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
          Details <i className="fas fa-arrow-right text-[7px]"></i>
        </div>
      </div>
    </button>
  );
};

export default CourseCard;
