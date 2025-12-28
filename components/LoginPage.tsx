
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
  profile: any;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, profile }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Personal Login for Niketh
    setTimeout(() => {
      if (username === 'CB.PS.P2CHM25009' && password === 'cbchm9') {
        onLogin();
      } else {
        setError('Invalid login for user CB.PS.P2CHM25009. Check credentials.');
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600/[0.03] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-indigo-600/[0.03] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="w-full max-w-md px-6 z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white rounded-[3.5rem] p-12 shadow-2xl shadow-slate-300/40 border border-slate-100 text-center">
          <div className="flex flex-col items-center mb-10">
            <div className="relative mb-8">
                <div className="w-24 h-24 bg-red-600 rounded-[2.2rem] flex items-center justify-center text-white shadow-2xl shadow-red-600/30 overflow-hidden transform -rotate-3 hover:rotate-0 transition-all duration-500 border-4 border-white">
                  {profile.photo ? (
                    <img src={profile.photo} alt="Niketh P" className="w-full h-full object-cover" />
                  ) : (
                    <i className="fas fa-atom text-3xl"></i>
                  )}
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-white flex items-center justify-center text-white text-[10px]">
                   <i className="fas fa-shield-halved"></i>
                </div>
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl font-black text-slate-800 tracking-tighter uppercase leading-none">{profile.name}</h1>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Personal Academic Portal</p>
            </div>
            <div className="mt-4 px-4 py-1.5 bg-slate-50 rounded-xl border border-slate-100">
               <p className="text-[9px] font-bold text-slate-500 tracking-widest uppercase">
                 {profile.school} • {profile.campus}
               </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Registration ID</label>
              <div className="relative group">
                <i className="fas fa-id-badge absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"></i>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="CB.PS.P2..."
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-red-600/10 focus:bg-white transition-all placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">Portal Key</label>
              <div className="relative group">
                <i className="fas fa-key absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-red-600 transition-colors"></i>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-red-600/10 focus:bg-white transition-all placeholder:text-slate-300"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-3 bg-red-50 text-red-600 p-4 rounded-2xl animate-in shake duration-500 border border-red-100">
                <i className="fas fa-triangle-exclamation text-xs"></i>
                <span className="text-[10px] font-black uppercase tracking-wider">{error}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full bg-slate-900 text-white rounded-[1.5rem] py-5 text-xs font-black shadow-2xl shadow-slate-900/20 hover:bg-slate-800 hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-4 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-[3px] border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span className="tracking-[0.2em]">VERIFYING...</span>
                </>
              ) : (
                <>
                  <span className="tracking-[0.2em]">ACCESS DASHBOARD</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 space-y-4">
            <div className="flex items-center gap-3 justify-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
              SECURE ACADEMIC ACCESS
              <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
            </div>
          </div>
        </div>
        
        <div className="mt-10 flex flex-col items-center gap-2 opacity-40">
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em]">
             Amrita Coimbatore Campus
           </p>
           <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
             Dept of Chemistry • {profile.school}
           </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
