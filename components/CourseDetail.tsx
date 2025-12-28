
import React from 'react';
import { Course } from '../types';

interface CourseDetailProps {
  course: Course;
  onSelectTopic: (topic: string) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onSelectTopic }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Course Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {[
          { label: 'Lecture', value: course.l, icon: 'fa-chalkboard-user', color: 'text-indigo-500' },
          { label: 'Tutorial', value: course.t, icon: 'fa-users', color: 'text-blue-500' },
          { label: 'Practical', value: course.p, icon: 'fa-flask-vial', color: 'text-emerald-500' },
          { label: 'Total Credits', value: course.credits, icon: 'fa-star', color: 'text-amber-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center ${stat.color}`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-lg font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Complete Syllabus & Modules</h3>
          <span className="text-xs font-medium text-slate-500">{course.topics.length} Key Topics</span>
        </div>
        <div className="divide-y divide-slate-100">
          {course.topics.map((topic, idx) => (
            <div 
              key={idx} 
              className="px-6 py-5 flex items-center justify-between group hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                  {topic}
                </span>
              </div>
              <button 
                onClick={() => onSelectTopic(topic)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-600 hover:text-white transition-all transform active:scale-95"
              >
                <i className="fas fa-magic"></i>
                Generate Study Notes
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Books Placeholder */}
      <div className="bg-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-3">Recommended Reference Material</h3>
            <p className="text-indigo-200 text-sm leading-relaxed mb-6">
              Dive deeper into {course.title} with standard textbooks and research publications curated for {course.code}.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/20">Advanced Inorganic Chemistry - Cotton & Wilkinson</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/20">Organic Chemistry - Clayden</span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold border border-white/20">Physical Chemistry - Atkins</span>
            </div>
          </div>
          <div className="w-32 h-32 bg-indigo-500/20 rounded-full flex items-center justify-center animate-pulse">
            <i className="fas fa-book-open text-4xl"></i>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
};

export default CourseDetail;
