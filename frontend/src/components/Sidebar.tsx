import React from 'react';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  user: { name: string; role: string };
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, user, onLogout }) => {
  const isAdmin = user.role === 'Administrador';

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <div className="logo-icon">🛡️</div>
        <div className="logo-text">GuardSafe</div>
      </div>

      <div 
        className="user-profile-sidebar glass" 
        onClick={() => setActiveView('profile')}
        style={{ 
          padding: '15px', 
          borderRadius: '12px', 
          marginBottom: '30px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px',
          cursor: 'pointer',
          border: activeView === 'profile' ? '1px solid var(--primary)' : '1px solid var(--border)'
        }}
      >
        <div style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '10px', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)'
        }}>
          👤
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <div style={{ fontWeight: '600', fontSize: '0.9rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>{user.role}</div>
        </div>
      </div>

      <div className="nav-group">
        <span className="nav-label">General</span>
        <div 
          className={`nav-item ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveView('dashboard')}
        >
          <span className="nav-icon">📊</span>
          <span>Dashboard</span>
        </div>
        
        <div 
          className={`nav-item ${activeView === 'activities' ? 'active' : ''}`}
          onClick={() => setActiveView('activities')}
        >
          <span className="nav-icon">📝</span>
          <span>Actividades</span>
        </div>

        <div 
          className={`nav-item ${activeView === 'reportes' ? 'active' : ''}`}
          onClick={() => setActiveView('reportes')}
        >
          <span className="nav-icon">📄</span>
          <span>Generar Reporte</span>
        </div>

        <div 
          className={`nav-item ${activeView === 'incidents' ? 'active' : ''}`}
          onClick={() => setActiveView('incidents')}
        >
          <span className="nav-icon">🚨</span>
          <span>Incidentes</span>
        </div>

        {isAdmin && (
          <div 
            className={`nav-item ${activeView === 'cctv' ? 'active' : ''}`}
            onClick={() => setActiveView('cctv')}
          >
            <span className="nav-icon">📹</span>
            <span>CCTV</span>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="nav-group">
          <span className="nav-label">Administración</span>
          <div 
            className={`nav-item ${activeView === 'metrics' ? 'active' : ''}`}
            onClick={() => setActiveView('metrics')}
          >
            <span className="nav-icon">📈</span>
            <span>Métricas</span>
          </div>
          <div 
            className={`nav-item ${activeView === 'guards' ? 'active' : ''}`}
            onClick={() => setActiveView('guards')}
          >
            <span className="nav-icon">👮</span>
            <span>Personal</span>
          </div>
          <div 
            className={`nav-item ${activeView === 'zones' ? 'active' : ''}`}
            onClick={() => setActiveView('zones')}
          >
            <span className="nav-icon">📍</span>
            <span>Zonas</span>
          </div>
          <div 
            className={`nav-item ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveView('settings')}
          >
            <span className="nav-icon">⚙️</span>
            <span>Configuración</span>
          </div>
        </div>
      )}

      <div className="sidebar-footer" style={{ marginTop: 'auto' }}>
        <div className="nav-item" style={{ color: 'var(--danger)' }} onClick={onLogout}>
          <span className="nav-icon">🚪</span>
          <span style={{ color: 'var(--danger)' }}>Cerrar Sesión</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
