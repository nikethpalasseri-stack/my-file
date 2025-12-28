
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
          <div className="relative -mt-24 mb-10 flex flex-col md:flex-row items-end gap-8">
            <div 
              className="w-48 h-48 rounded-[2.5rem] bg-white p-3 shadow-2xl relative group cursor-pointer"
              onClick={handlePhotoClick}
            >
              <div className="w-full h-full rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                {profile.photo ? (
                  <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <span className="text-slate-500 text-6xl font-black tracking-tighter">{profile.avatar}</span>
                  </div>
                )}
              </div>
              <div className="absolute inset-3 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                 <i className="fas fa-camera text-2xl"></i>
                 <span className="text-[10px] font-black uppercase tracking-widest text-center px-2">Update Photo</span>
              </div>
            </div>
            <div className="flex-1 mb-4 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <h1 className="text-4xl font-black text-slate-800 tracking-tighter">{profile.name}</h1>
                <i className="fas fa-check-circle text-blue-500 text-xl shadow-sm"></i>
              </div>
              <p className="text-slate-500 font-bold text-lg mt-1">{profile.department}</p>
              <div className="mt-3 flex flex-wrap justify-center md:justify-start gap-2">
                <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-black rounded-lg uppercase tracking-wider border border-red-100">Reg No: {profile.regNo}</span>
                <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black rounded-lg uppercase tracking-wider border border-indigo-100">{profile.school}</span>
                <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black rounded-lg uppercase tracking-wider border border-slate-100">{profile.campus}</span>
              </div>
            </div>
            <button className="px-8 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95 uppercase tracking-widest">
              Modify Academic Bio
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-slate-100"></span>
                  PERSONAL ACADEMIC SUMMARY
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                   Niketh P is an M.Sc. Chemistry student at Amrita Vishwa Vidyapeetham, School of Physical Sciences. 
                   With a solid foundation from Semester 1 (7.33 SGPA), Niketh is currently pursuing advanced modules in Semester 2 at the Coimbatore Campus. 
                   His academic journey is defined by a rigorous approach to the molecular sciences and a commitment to excellence within the Department of Chemistry.
                </p>
              </section>

              <section>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
                  <span className="w-10 h-0.5 bg-slate-100"></span>
                  RESEARCH & SPECIALIZATION
                </h3>
                <div className="flex flex-wrap gap-3">
                  {profile.interests.map((interest: string, i: number) => (
                    <span key={i} className="px-5 py-3 bg-white border-2 border-slate-100 rounded-2xl text-xs font-black text-slate-600 hover:border-red-600 hover:text-red-600 transition-all cursor-default shadow-sm">
                      {interest}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 shadow-inner">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Identity Verification</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-fingerprint text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Student ID</p>
                      <p className="text-sm font-black text-slate-700 font-mono">{profile.regNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-building-columns text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Campus Locality</p>
                      <p className="text-sm font-black text-slate-700">{profile.campus}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm">
                      <i className="fas fa-envelope text-sm"></i>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Official Contact</p>
                      <p className="text-sm font-black text-slate-700 truncate">{profile.email}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3">Academic Mentor</h3>
                  <p className="text-xl font-black mb-2 tracking-tight">Dr. Venkata Ravikumar Darbha</p>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-medium mb-6">
                    Dept of Chemistry Advisor. Specialized in Quantum Analysis and Molecular Spectroscopy.
                  </p>
                  <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-xs font-black transition-all shadow-xl shadow-red-950/40 uppercase tracking-widest">
                    REACH OUT
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
