
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

    setTimeout(() => {
      if (username === 'CB.PS.P2CHM25009' && password === 'cbchm9') {
        onLogin();
      } else {
        setError('Verification failed. Invalid ID or key.');
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="login-container">
      {/* Abstract Backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/5 blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="login-form-card animate-slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 bg-slate-900 text-white rounded-2xl items-center justify-center mb-6 shadow-2xl transform -rotate-3">
            <i className="fas fa-lock text-xl"></i>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tighter uppercase mb-1">{profile.name}</h1>
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">Academic Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Registration ID</label>
            <div className="relative">
              <i className="fas fa-fingerprint absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="CB.PS.P2..."
                className="w-full bg-slate-50 border border-transparent rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-slate-200 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2 ml-1">Portal Access Key</label>
            <div className="relative">
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-transparent rounded-xl py-4 pl-12 pr-6 text-sm font-bold text-slate-700 focus:outline-none focus:border-slate-200 focus:bg-white transition-all"
                required
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-[9px] font-black uppercase tracking-widest border border-red-100 animate-pulse">
               <i className="fas fa-exclamation-circle mr-2"></i> {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full py-5 text-[10px] tracking-[0.3em]">
            {loading ? <i className="fas fa-spinner animate-spin"></i> : 'Verify & Enter'}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-slate-50 text-center opacity-40">
           <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">Amrita Vishwa Vidyapeetham</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
