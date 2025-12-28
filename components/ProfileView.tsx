
import React, { useRef } from 'react';

interface ProfileViewProps {
  profile: any;
  onUpdateProfile: (updates: any) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ profile, onUpdateProfile }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateProfile({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      
      <div className="bg-white rounded-[3rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-64 bg-gradient-to-r from-red-800 via-red-600 to-indigo-900 relative">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center overflow-hidden">
             <i className="fas fa-atom text-[400px] text-white -rotate-12"></i>
          </div>
        </div>
        <div className="px-12 pb-12">
          {/* Header section with avatar and info */}
          <div className="relative -mt-24 mb-12 flex flex-col md:flex-row items-center md:items-center gap-8">
            <div 
              className="w-48 h-48 rounded-[3rem] bg-white p-3 shadow-2xl relative group cursor-pointer shrink-0 z-10"
              onClick={handlePhotoClick}
            >
              <div className="w-full h-full rounded-[2.5rem] bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100 shadow-inner">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-slate-500 text-6xl font-black tracking-tighter">{profile.avatar}</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-3 rounded-[2.5rem] bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                 <i className="fas fa-camera text-2xl"></i>
                 <span className="text-[10px] font-black uppercase tracking-widest text-center px-2">Update Photo</span>
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left self-center mt-4 md:mt-20">
              <div className="inline-flex flex-col">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  <h1 className="text-5xl font-black text-slate-800 tracking-tighter leading-none">{profile.name}</h1>
                  <div className="bg-blue-50 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-blue-100">
                    <i className="fas fa-check text-xs"></i>
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mb-6">
                  <p className="text-slate-500 font-black text-lg uppercase tracking-tight leading-none">
                    {profile.department}
                  </p>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                  <p className="text-red-600 font-bold text-sm tracking-wide">
                    {profile.program}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 text-[10px] font-black rounded-xl border border-slate-200/60 shadow-sm uppercase tracking-wider">
                  <i className="fas fa-fingerprint text-slate-400"></i>
                  <span>REG: {profile.regNo}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 text-slate-700 text-[10px] font-black rounded-xl border border-slate-200/60 shadow-sm uppercase tracking-wider">
                  <i className="fas fa-university text-slate-400"></i>
                  <span>{profile.school}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-xl border border-emerald-100 shadow-sm uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Verified Student</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section className="bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-slate-200"></span>
                  PERSONAL ACADEMIC SUMMARY
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                   Niketh P is an M.Sc. Chemistry student at {profile.university}, {profile.school}. 
                   Pursuing advanced postgraduate studies at Amrita Vishwa Vidyapeetham, Coimbatore Campus, his academic journey 
                   focuses on the fundamental and applied aspects of molecular sciences within the Department of Chemistry. 
                   With a robust Semester 1 foundation (7.33 SGPA), he is currently exploring the intricate mechanisms of Semester 2 modules.
                </p>
              </section>

              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-slate-100"></span>
                  RESEARCH & SPECIALIZATION
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.interests.map((interest: string, i: number) => (
                    <span key={i} className="px-5 py-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-600 hover:border-red-600 hover:text-red-600 transition-all cursor-default shadow-sm hover:-translate-y-1">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">Identity Verification</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-id-card text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Registration No</p>
                      <p className="text-sm font-black text-slate-700 font-mono tracking-tight">{profile.regNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-map-marker-alt text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Campus Location</p>
                      <p className="text-sm font-black text-slate-700">Coimbatore</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-envelope-open text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">University Mail</p>
                      <p className="text-sm font-black text-slate-700 truncate">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Academic Mentor</h3>
                  <p className="text-xl font-black mb-2 tracking-tight">DR THILAGAVATHY</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-6">
                    Associate Professor, Dept of Chemistry. Specialized in Physical Chemistry, Group Theory and Computational Analysis.
                  </p>
                  <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black transition-all shadow-xl shadow-red-950/40 uppercase tracking-widest active:scale-95">
                    INITIATE CONTACT
                  </button>
                </div>
                <i className="fas fa-microscope absolute -bottom-6 -right-6 text-white/5 text-9xl group-hover:scale-110 transition-transform"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
