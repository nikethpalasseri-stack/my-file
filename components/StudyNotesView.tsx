
import React, { useState, useEffect } from 'react';
import { Course, StudyNote } from '../types';
import { getStudyNotes } from '../geminiService';

interface StudyNotesViewProps {
  course: Course;
  topic: string;
}

const StudyNotesView: React.FC<StudyNotesViewProps> = ({ course, topic }) => {
  const [note, setNote] = useState<StudyNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getStudyNotes(course.title, topic);
        setNote(data);
      } catch (err) {
        setError('Failed to generate study notes. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [course, topic]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <i className="fas fa-brain text-indigo-600 text-xl animate-bounce"></i>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Gemini is synthesizing notes...</h3>
        <p className="text-slate-500 text-sm max-w-xs text-center">
          Analyzing {topic} in the context of {course.title} for M.Sc. level mastery.
        </p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="bg-red-50 border border-red-200 p-8 rounded-2xl text-center">
        <i className="fas fa-exclamation-triangle text-red-500 text-3xl mb-4"></i>
        <h3 className="text-lg font-bold text-red-800 mb-2">Error</h3>
        <p className="text-red-600 text-sm mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500 pb-20">
      {/* Header Summary */}
      <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-indigo-100">
              Exam Summary
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed text-lg first-letter:text-4xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-2 first-letter:float-left">
            {note.summary}
          </p>
        </div>
        <div className="absolute top-0 right-0 p-8 text-indigo-50/30">
          <i className="fas fa-quote-right text-9xl"></i>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Key Points */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <i className="fas fa-list-check text-emerald-500"></i>
            Key Points for Revision
          </h3>
          <ul className="space-y-4">
            {note.keyPoints.map((point, i) => (
              <li key={i} className="flex gap-4 group">
                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold flex items-center justify-center shrink-0 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  {i + 1}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">{point}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Exam Tips */}
        <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <i className="fas fa-lightbulb text-amber-500"></i>
            Exam Success Tips
          </h3>
          <div className="space-y-4">
            {note.examTips.map((tip, i) => (
              <div key={i} className="p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50 flex gap-4">
                <i className="fas fa-circle-check text-amber-500 mt-1"></i>
                <p className="text-slate-700 text-sm italic">"{tip}"</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* References */}
      <section className="bg-slate-900 p-8 rounded-3xl text-white">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
          <i className="fas fa-link text-indigo-400"></i>
          Academic References & Deep Links
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {note.references.map((ref, i) => (
            <a 
              key={i} 
              href={ref.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-slate-800 rounded-xl hover:bg-indigo-600 transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-700 group-hover:bg-indigo-500 flex items-center justify-center transition-colors">
                  <i className="fas fa-book text-slate-400 group-hover:text-white"></i>
                </div>
                <span className="text-sm font-medium">{ref.title}</span>
              </div>
              <i className="fas fa-external-link-alt text-[10px] opacity-40 group-hover:opacity-100"></i>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default StudyNotesView;
