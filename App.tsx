
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
  const [activeSemester, setActiveSemester] = useState<number>(2);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('niketh_profile');
    return savedProfile ? JSON.parse(savedProfile) : USER_PROFILE;
  });

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
    <div className="portal-layout">
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

      <main className="main-content">
        <header className="portal-header">
          <div className="flex items-center gap-3">
             <h2 className="text-xs font-black text-slate-400 uppercase tracking-widest">
               {viewMode.replace('-', ' ')}
             </h2>
             <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
             <p className="text-[10px] font-bold text-slate-400 hidden sm:block uppercase tracking-tight">
               {profile.campus}
             </p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-black text-slate-800 tracking-tight uppercase">{profile.name}</p>
              <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest">{profile.regNo}</p>
            </div>
            <div className="w-9 h-9 rounded-full border border-slate-200 p-0.5 shadow-sm">
              {profile.photo ? (
                <img src={profile.photo} alt={profile.name} className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-black">
                  {profile.avatar}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="content-scroll custom-scroll">
          <div className="max-w-6xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
