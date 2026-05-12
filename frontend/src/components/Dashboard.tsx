import React from 'react';

interface DashboardProps {
  setActiveView?: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setActiveView }) => {
  return (
    <div className="animate-fade">
      <div className="stats-grid" style={{ marginBottom: '50px' }}>
        {[
          { title: 'Guardias Activos', value: '12', icon: '👤', trend: '↑ 2', color: 'var(--primary)', view: 'guards' },
          { title: 'Incidentes Hoy', value: '03', icon: '⚠️', trend: '↓ 1', color: 'var(--danger)', view: 'incidents' },
          { title: 'Rondas Completadas', value: '48', icon: '🔄', trend: '98%', color: 'var(--success)', view: 'activities' },
          { title: 'Zonas Aseguradas', value: '24', icon: '🔒', trend: 'Live', color: 'var(--accent)', view: 'zones' },
        ].map((stat, i) => (
          <div key={i} className="glass-card stat-card" style={{ borderLeft: `4px solid ${stat.color}`, cursor: 'pointer' }} onClick={() => setActiveView?.(stat.view)}>
            <div className="stat-header">
              <span className="stat-title">{stat.title}</span>
              <span className="stat-icon" style={{ background: `${stat.color}22`, padding: '8px', borderRadius: '10px' }}>{stat.icon}</span>
            </div>
            <div className="stat-value" style={{ fontSize: '2.5rem', margin: '10px 0' }}>{stat.value}</div>
            <div className="stat-footer">
              <span className={stat.trend.includes('↑') ? 'trend-up' : stat.trend.includes('↓') ? 'trend-down' : ''} style={{ fontWeight: '700' }}>
                {stat.trend}
              </span> 
              <span style={{ marginLeft: '5px', fontSize: '0.8rem', opacity: 0.7 }}>{i === 2 ? 'Eficiencia' : i === 3 ? 'Monitoreo' : 'vs ayer'}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '35px' }}>
          <div className="card-title" style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>📈 Actividad Crítica Reciente</h3>
            <button 
              className="btn btn-primary" 
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              onClick={() => setActiveView?.('activities')}
            >Registro Global</button>
          </div>
          <div className="feed-list">
            {[
              { guard: 'Juan Pérez', action: 'Ronda Perimetral', zone: 'Zona Norte', time: '5 min', status: 'OK' },
              { guard: 'Ana López', action: 'Control Acceso', zone: 'Puerta Principal', time: '12 min', status: 'OK' },
            ].map((item, i) => (
              <div key={i} className="feed-item" style={{ padding: '20px', borderRadius: '15px', background: 'rgba(255,255,255,0.02)', marginBottom: '15px', border: '1px solid var(--border)' }}>
                <div className="feed-avatar" style={{ fontSize: '1.2rem' }}>👮</div>
                <div className="feed-content">
                  <div className="feed-msg">
                    <b style={{ color: 'var(--primary)' }}>{item.guard}</b> {item.action.toLowerCase()} en <b style={{ color: 'var(--accent)' }}>{item.zone}</b>
                  </div>
                  <div className="feed-time">Hace {item.time} • {item.status}</div>
                </div>
                <span className="badge badge-success">{item.status}</span>
              </div>
            ))}
            <div className="feed-item" style={{ padding: '20px', borderRadius: '15px', background: 'rgba(239, 68, 68, 0.05)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
              <div className="feed-avatar" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>🚨</div>
              <div className="feed-content">
                <div className="feed-msg" style={{ color: 'var(--danger)', fontWeight: '600' }}>
                  Intento de acceso no autorizado en Sector B
                </div>
                <div className="feed-time">Hace 45 min • Intervención Requerida</div>
              </div>
              <span className="badge badge-danger">Crítico</span>
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '35px' }}>
          <div className="card-title" style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.4rem' }}>📊 Ocupación de Turnos</h3>
          </div>
          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '20px 0', background: 'rgba(0,0,0,0.2)', borderRadius: '15px', marginBottom: '30px' }}>
            {[40, 75, 30, 95].map((height, i) => (
              <div key={i} style={{ 
                width: '45px', 
                height: `${height}%`, 
                background: i === 3 ? 'var(--danger)' : 'linear-gradient(to top, var(--primary), var(--accent))',
                borderRadius: '10px 10px 0 0',
                position: 'relative',
                boxShadow: '0 0 15px rgba(59, 130, 246, 0.2)'
              }}>
                <span style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: '700' }}>
                  {height}%
                </span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
            <span>Mañana</span>
            <span>Tarde</span>
            <span>Noche</span>
            <span style={{ color: 'var(--danger)' }}>Refuerzo</span>
          </div>
          <div style={{ padding: '20px', background: 'var(--bg-accent)', borderRadius: '15px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '10px' }}>Capacidad Operativa</h4>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
              <div style={{ width: '85%', height: '100%', background: 'linear-gradient(to right, var(--primary), var(--accent))', borderRadius: '10px', boxShadow: '0 0 10px var(--primary-glow)' }}></div>
            </div>
            <p style={{ marginTop: '12px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              85% del personal activo en campo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
