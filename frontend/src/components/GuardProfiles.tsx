import React from 'react';

const GuardProfiles: React.FC = () => {
  const guards = [
    { id: 1, name: 'Juan Pérez', role: 'Supervisor', shift: 'Mañana', status: 'En Servicio', rank: 'Senior', performance: 95 },
    { id: 2, name: 'Ana López', role: 'Operador CCTV', shift: 'Noche', status: 'En Servicio', rank: 'Especialista', performance: 98 },
    { id: 3, name: 'Carlos Ruiz', role: 'Patrullaje', shift: 'Tarde', status: 'Descanso', rank: 'Junior', performance: 88 },
    { id: 4, name: 'María García', role: 'Patrullaje', shift: 'Mañana', status: 'En Servicio', rank: 'Intermedio', performance: 92 },
  ];

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Gestión de Personal</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Administra y monitorea el rendimiento de tus guardias.</p>
        </div>
        <button className="btn btn-primary">
          <span>+</span> Añadir Guardia
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {guards.map((guard) => (
          <div key={guard.id} className="glass-card" style={{ padding: '25px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '15px', background: 'linear-gradient(135deg, var(--bg-accent), var(--border))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', border: '1px solid var(--border)' }}>
                👮
              </div>
              <span className={`badge ${guard.status === 'En Servicio' ? 'badge-success' : 'badge-warning'}`}>
                {guard.status}
              </span>
            </div>
            
            <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{guard.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '20px' }}>{guard.role} • {guard.rank}</p>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Turno</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>{guard.shift}</div>
              </div>
              <div style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', textAlign: 'center' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Rendimiento</div>
                <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--success)' }}>{guard.performance}%</div>
              </div>
            </div>

            <div style={{ width: '100%', height: '4px', background: 'var(--bg-accent)', borderRadius: '10px', marginBottom: '25px' }}>
              <div style={{ width: `${guard.performance}%`, height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" style={{ flex: 1, justifyContent: 'center', background: 'var(--bg-accent)', fontSize: '0.85rem' }}>Perfil</button>
              <button className="btn" style={{ flex: 1, justifyContent: 'center', background: 'var(--bg-accent)', fontSize: '0.85rem' }}>Asignar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuardProfiles;
