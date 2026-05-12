import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ActivityLog from './components/ActivityLog';
import GuardProfiles from './components/GuardProfiles';
import Incidents from './components/Incidents';
import ZonesMap from './components/ZonesMap';
import CCTVControl from './components/CCTVControl';
import Login from './components/Login';
import GuardDashboard from './components/GuardDashboard';
import ReportGenerator from './components/ReportGenerator';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import './App.css';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: '', role: '' });
  
  // Settings State
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('es');
  const [notifications, setNotifications] = useState(true);

  // Toast State
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | null}>({message: '', type: null});
  
  const notify = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({message, type});
    setTimeout(() => setToast({message: '', type: null}), 3000);
  };

  // Apply Theme
  React.useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--bg-main', '#f8fafc');
      document.documentElement.style.setProperty('--bg-sidebar', '#ffffff');
      document.documentElement.style.setProperty('--bg-card', 'rgba(255, 255, 255, 0.8)');
      document.documentElement.style.setProperty('--bg-accent', '#f1f5f9');
      document.documentElement.style.setProperty('--text-primary', '#0f172a');
      document.documentElement.style.setProperty('--text-secondary', '#334155');
      document.documentElement.style.setProperty('--text-muted', '#64748b');
      document.documentElement.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
    } else {
      document.documentElement.style.setProperty('--bg-main', '#05070a');
      document.documentElement.style.setProperty('--bg-sidebar', '#0a0d14');
      document.documentElement.style.setProperty('--bg-card', 'rgba(16, 20, 29, 0.7)');
      document.documentElement.style.setProperty('--bg-accent', '#161b26');
      document.documentElement.style.setProperty('--text-primary', '#ffffff');
      document.documentElement.style.setProperty('--text-secondary', '#ffffff');
      document.documentElement.style.setProperty('--text-muted', '#ffffff');
      document.documentElement.style.setProperty('--border', 'rgba(255, 255, 255, 0.15)');
    }
  }, [theme]);

  const handleLogin = (userData: { name: string; role: string }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const renderView = () => {
    if (user.role === 'Guardia de Seguridad' && activeView === 'dashboard') {
      return <GuardDashboard />;
    }

    switch (activeView) {
      case 'dashboard':
        return <Dashboard setActiveView={setActiveView} />;
      case 'activities':
        return <ActivityLog notify={notify} />;
      case 'guards':
        return <GuardProfiles />;
      case 'incidents':
        return <Incidents />;
      case 'reportes':
        return <ReportGenerator notify={notify} />;
      case 'profile':
        return <UserProfile user={user} notify={notify} />;
      case 'settings':
        return (
          <Settings 
            theme={theme} 
            setTheme={setTheme} 
            language={language} 
            setLanguage={setLanguage}
            notifications={notifications}
            setNotifications={setNotifications}
            notify={notify}
          />
        );
      case 'zones':
        return <ZonesMap />;
      case 'cctv':
        return <CCTVControl notify={notify} />;
      default:
        return user.role === 'Guardia de Seguridad' ? <GuardDashboard /> : <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      {toast.type && (
        <div className={`toast-notification ${toast.type}`}>
          {toast.message}
        </div>
      )}
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Sidebar activeView={activeView} setActiveView={setActiveView} user={user} onLogout={handleLogout} />
          <main className="main-content">
            <header className="top-header glass">
              <div className="header-left">
                <h1>{activeView.charAt(0).toUpperCase() + activeView.slice(1)}</h1>
                <span className="breadcrumb">Devify GuardSafe / {activeView}</span>
              </div>
              <div className="header-right">
                <div className="search-bar">
                  <span className="icon">🔍</span>
                  <input type="text" placeholder="Buscar actividad, guardia..." />
                </div>
                <div className="user-profile">
                  <div className="profile-info">
                    <span className="profile-name">{user.name}</span>
                    <span className="profile-role">{user.role}</span>
                  </div>
                  <div className="profile-avatar">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                </div>
              </div>
            </header>
            <div className="view-container">
              <div className="centered-view">
                {renderView()}
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default App;
