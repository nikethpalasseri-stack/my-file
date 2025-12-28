
import React, { useState, useEffect } from 'react';
import { SYLLABUS, USER_PROFILE, TIMETABLES, RESULTS, ACADEMIC_CALENDAR } from './constants';
import { Course } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/DashboardView';
import ProfileView from './components/ProfileView';
import TimetableView from './components/TimetableView';
import ResultsView from './components/ResultsView';
import SyllabusHub from './components/SyllabusHub';
import CalendarView from './components/CalendarView';
import LoginPage from './components/LoginPage';

export type ViewMode = 'dashboard' | 'profile' | 'syllabus' | 'timetable' | 'results' | 'calendar';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [activeSemester, setActiveSemester] = useState<number>(2); // Default to current semester
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Manage profile as state to allow dynamic updates (like profile pic)
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('niketh_profile');
    return savedProfile ? JSON.parse(savedProfile) : USER_PROFILE;
  });

  // Persistence check for login
  useEffect(() => {
    const savedLogin = localStorage.getItem('isLoggedIn');
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setViewMode('dashboard');
  };

  const handleUpdateProfile = (updates: Partial<typeof USER_PROFILE>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem('niketh_profile', JSON.stringify(newProfile));
  };

  const renderContent = () => {
    switch (viewMode) {
      case 'dashboard':
        return <DashboardView onNavigate={setViewMode} profile={profile} results={RESULTS} />;
      case 'profile':
        return <ProfileView profile={profile} onUpdateProfile={handleUpdateProfile} />;
      case 'timetable':
        return <TimetableView timetables={TIMETABLES} syllabus={SYLLABUS} />;
      case 'results':
        return <ResultsView results={RESULTS} syllabus={SYLLABUS} />;
      case 'calendar':
        return <CalendarView calendar={ACADEMIC_CALENDAR} />;
      case 'syllabus':
        return (
          <SyllabusHub 
            activeSemester={activeSemester}
            setActiveSemester={setActiveSemester}
            selectedCourse={selectedCourse}
            setSelectedCourse={setSelectedCourse}
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
          />
        );
      default:
        return <DashboardView onNavigate={setViewMode} profile={profile} results={RESULTS} />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} profile={profile} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden animate-in fade-in duration-700">
      <Sidebar 
        viewMode={viewMode} 
        setViewMode={(mode) => {
          setViewMode(mode);
          setSelectedCourse(null);
          setSelectedTopic(null);
        }} 
        onLogout={handleLogout}
        profile={profile}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 glass-morphism border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3">
             <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
               {viewMode.replace('-', ' ')}
             </h2>
             <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
             <p className="text-xs font-medium text-slate-500 hidden sm:block">{profile.university} | {profile.campus}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-800 tracking-tight">{profile.name}</p>
              <p className="text-[10px] text-slate-500 font-medium">Reg No: {profile.regNo}</p>
            </div>
            <div className="w-10 h-10 rounded-full border-2 border-red-600/20 p-0.5 shadow-md shadow-red-200/50">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-black">
                  {profile.avatar}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto p-8 animate-in fade-in duration-500">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
