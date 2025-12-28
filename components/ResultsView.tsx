
import React, { useState } from 'react';
import { SemesterResult, Semester } from '../types';
import { USER_PROFILE } from '../constants';

interface ResultsViewProps {
  results: SemesterResult[];
  syllabus: Semester[];
}

const ResultsView: React.FC<ResultsViewProps> = ({ results, syllabus }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const currentResult = results.find(r => r.semesterId === activeTab);
  const allSyllabusCourses = syllabus.flatMap(s => s.courses);

  const handleDownloadPDF = () => {
    const element = document.getElementById('results-content');
    if (!element) return;

    setIsExporting(true);

    const opt = {
      margin: 10,
      filename: `Niketh_P_Semester_${activeTab}_Results.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save().then(() => {
      setIsExporting(false);
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-800">Academic Transcript</h2>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-widest mt-1">Official Result Statement</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {results.map((r) => (
            <button
              key={r.semesterId}
              onClick={() => setActiveTab(r.semesterId)}
              className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === r.semesterId 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Sem {r.semesterId}
            </button>
          ))}
        </div>
      </div>

      {!currentResult?.published ? (
        <div className="bg-white p-20 rounded-3xl border border-slate-200 text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-lock text-xl"></i>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Results Not Published</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            The examination results for Semester {activeTab} are currently being processed by the University Controller of Examinations.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div id="results-content" className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              {/* PDF Header - Only visible during export logic if we styled it, but html2pdf takes what's there */}
              <div className="p-8 border-b border-slate-100 bg-slate-50/50">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-xl font-black text-slate-900 uppercase">Statement of Marks</h1>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Semester {activeTab} | M.Sc. Chemistry</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-slate-800">{USER_PROFILE.name}</p>
                    <p className="text-[9px] font-bold text-slate-400">{USER_PROFILE.regNo}</p>
                  </div>
                </div>
              </div>

              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase">Course Details</th>
                    <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase text-center">Credits</th>
                    <th className="px-4 py-4 text-[10px] font-bold text-slate-400 uppercase text-center">Grade</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {currentResult.grades.map((g, idx) => {
                    const course = allSyllabusCourses.find(c => c.code === g.courseCode);
                    const courseName = course?.title || 'Unknown Course';
                    const credits = course?.credits || '-';
                    const isPass = g.grade !== 'F';

                    return (
                      <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-5">
                          <p className="text-sm font-bold text-slate-800 line-clamp-1">{courseName}</p>
                          <p className="text-[10px] font-mono text-slate-400">{g.courseCode}</p>
                        </td>
                        <td className="px-4 py-5 text-center text-xs font-bold text-slate-600">{credits}</td>
                        <td className="px-4 py-5 text-center">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-black min-w-[32px] inline-block ${
                            ['O', 'A+', 'A'].includes(g.grade) ? 'bg-emerald-50 text-emerald-600' :
                            ['B+', 'B'].includes(g.grade) ? 'bg-indigo-50 text-indigo-600' :
                            'bg-slate-100 text-slate-600'
                          }`}>
                            {g.grade}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-center">
                           <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${isPass ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                             {isPass ? 'PASS' : 'FAIL'}
                           </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-slate-900 text-white">
                    <tr>
                        <td colSpan={3} className="px-6 py-4 text-xs font-black uppercase tracking-widest text-right">Semester Grade Point Average (SGPA)</td>
                        <td className="px-6 py-4 text-center font-black text-lg">{currentResult.sgpa}</td>
                    </tr>
                </tfoot>
              </table>
              <div className="p-4 bg-slate-50 text-[8px] text-slate-400 text-center uppercase tracking-widest font-bold">
                Generated via Niketh's Personal Academic Portal • Amrita Vishwa Vidyapeetham
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-center relative overflow-hidden">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Semester SGPA</h3>
              <div className="relative inline-flex items-center justify-center mb-6">
                 <svg className="w-40 h-40">
                   <circle className="text-slate-100" strokeWidth="10" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                   <circle className="text-red-600" strokeWidth="10" strokeDasharray={440} strokeDashoffset={440 - (440 * currentResult.sgpa) / 10} strokeLinecap="round" stroke="currentColor" fill="transparent" r="70" cx="80" cy="80" />
                 </svg>
                 <span className="absolute text-4xl font-black text-slate-800 tracking-tighter">{currentResult.sgpa}</span>
              </div>
              <p className="text-[10px] font-bold text-emerald-600 mb-2 tracking-widest uppercase">Academic Status: Good Standing</p>
              <div className="w-full h-1 bg-slate-100 rounded-full mt-8 relative">
                 <div className="absolute inset-0 bg-red-600 rounded-full" style={{width: `${currentResult.sgpa * 10}%`}}></div>
              </div>
              <div className="mt-4 flex justify-between text-[10px] font-bold text-slate-400">
                <span>0.00</span>
                <span>CGPA 7.33</span>
                <span>10.0</span>
              </div>
            </div>

            <div className="bg-slate-900 p-6 rounded-3xl text-white relative group overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xs font-bold text-slate-500 uppercase mb-4">Official Verification</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed italic mb-6">
                  "These results are calculated based on the official University grading schema. Download the PDF for submission to external entities."
                </p>
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isExporting}
                  className="w-full py-3 bg-red-600 hover:bg-red-700 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/40 active:scale-95 disabled:opacity-50"
                >
                  {isExporting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>GENERATING...</span>
                    </>
                  ) : (
                    <>
                      <i className="fas fa-file-pdf"></i>
                      <span>DOWNLOAD TRANSCRIPT</span>
                    </>
                  )}
                </button>
              </div>
              <i className="fas fa-award absolute -bottom-4 -right-4 text-white/5 text-8xl group-hover:scale-110 transition-transform"></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsView;
