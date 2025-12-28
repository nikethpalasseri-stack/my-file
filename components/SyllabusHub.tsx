
import React from 'react';
import { Course } from '../types';
import { SYLLABUS } from '../constants';
import CourseCard from './CourseCard';
import CourseDetail from './CourseDetail';
import StudyNotesView from './StudyNotesView';

interface SyllabusHubProps {
  activeSemester: number;
  setActiveSemester: (id: number) => void;
  selectedCourse: Course | null;
  setSelectedCourse: (course: Course | null) => void;
  selectedTopic: string | null;
  setSelectedTopic: (topic: string | null) => void;
}

const SyllabusHub: React.FC<SyllabusHubProps> = ({ 
  activeSemester, 
  setActiveSemester, 
  selectedCourse, 
  setSelectedCourse, 
  selectedTopic, 
  setSelectedTopic 
}) => {
  const currentSemester = SYLLABUS.find(s => s.id === activeSemester);

  const handleBackToSemester = () => {
    setSelectedCourse(null);
    setSelectedTopic(null);
  };

  const handleBackToCourse = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {selectedCourse && (
            <button 
              onClick={selectedTopic ? handleBackToCourse : handleBackToSemester}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-600"
            >
              <i className="fas fa-arrow-left"></i>
            </button>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-800">
              {selectedTopic ? selectedTopic : selectedCourse ? selectedCourse.title : `Semester ${activeSemester}`}
            </h1>
            <p className="text-sm text-slate-500 font-medium">
              {selectedTopic ? `${selectedCourse?.code} • AI Study Module` : selectedCourse ? `${selectedCourse.code} • ${selectedCourse.credits} Credits` : 'Select a course to view details'}
            </p>
          </div>
        </div>

        {!selectedCourse && (
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {[1, 2, 3, 4].map((id) => (
              <button
                key={id}
                onClick={() => setActiveSemester(id)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSemester === id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                SEM {id}
              </button>
            ))}
          </div>
        )}
      </div>

      {!selectedCourse ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentSemester?.courses.map((course) => (
            <CourseCard 
              key={course.code} 
              course={course} 
              onClick={() => setSelectedCourse(course)} 
            />
          ))}
        </div>
      ) : !selectedTopic ? (
        <CourseDetail 
          course={selectedCourse} 
          onSelectTopic={setSelectedTopic} 
        />
      ) : (
        <StudyNotesView 
          course={selectedCourse} 
          topic={selectedTopic} 
        />
      )}
    </div>
  );
};

export default SyllabusHub;
