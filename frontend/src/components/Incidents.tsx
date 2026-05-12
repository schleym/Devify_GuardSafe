import React from 'react';

const Incidents: React.FC = () => {
  const incidents = [
    { id: 'INC-2024-001', type: 'Intrusión', location: 'Valla Perimetral Sur', guard: 'Juan Pérez', priority: 'Crítica', time: 'Hace 10 min' },
    { id: 'INC-2024-002', type: 'Falla Eléctrica', location: 'Generador B', guard: 'Ana López', priority: 'Media', time: 'Hace 1h' },
    { id: 'INC-2024-003', type: 'Puerta Abierta', location: 'Almacén 4', guard: 'Carlos Ruiz', priority: 'Alta', time: 'Hace 45 min' },
    { id: 'INC-2024-004', type: 'Persona Sospechosa', location: 'Estacionamiento', guard: 'María García', priority: 'Baja', time: 'Hace 2h' },
  ];

  return (
    <div className="animate-fade">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '25px' }}>
          <div className="card-title">Alertas Activas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {incidents.map((inc) => (
              <div key={inc.id} style={{ 
                padding: '20px', 
                background: 'rgba(255,255,255,0.02)', 
                borderRadius: '15px', 
                border: inc.priority === 'Crítica' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div className={`glow-point ${inc.priority === 'Crítica' ? 'red' : ''}`} style={{ width: '12px', height: '12px' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontWeight: '700', fontSize: '1rem' }}>{inc.type}</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{inc.id}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <span>📍 {inc.location}</span>
                    <span>👮 {inc.guard}</span>
                    <span>🕒 {inc.time}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${inc.priority === 'Crítica' ? 'badge-danger' : inc.priority === 'Alta' ? 'badge-warning' : 'badge-success'}`} style={{ marginBottom: '10px', display: 'inline-block' }}>
                    {inc.priority}
                  </span>
                  <div>
                    <button className="btn" style={{ padding: '5px 15px', fontSize: '0.75rem', background: 'var(--bg-accent)' }}>Atender</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '25px' }}>
          <div className="card-title">Resumen de Criticidad</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { label: 'Crítico', count: 1, color: 'var(--danger)' },
              { label: 'Alta Prioridad', count: 4, color: 'var(--warning)' },
              { label: 'Media Prioridad', count: 12, color: 'var(--primary)' },
              { label: 'Baja Prioridad', count: 24, color: 'var(--success)' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                  <span>{stat.label}</span>
                  <span style={{ fontWeight: '700' }}>{stat.count}</span>
                </div>
                <div style={{ width: '100%', height: '6px', background: 'var(--bg-accent)', borderRadius: '10px' }}>
                  <div style={{ 
                    width: `${(stat.count / 41) * 100}%`, 
                    height: '100%', 
                    background: stat.color, 
                    borderRadius: '10px',
                    boxShadow: `0 0 10px ${stat.color}55`
                  }}></div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ marginTop: '40px', padding: '20px', borderRadius: '15px', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), transparent)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
            <h4 style={{ color: 'var(--danger)', marginBottom: '10px' }}>Protocolo de Emergencia</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              En caso de alerta crítica, contactar inmediatamente al centro de control y activar sirenas de sector.
            </p>
            <button className="btn btn-primary" style={{ marginTop: '15px', width: '100%', background: 'var(--danger)', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.3)' }}>
              BOTÓN DE PÁNICO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
