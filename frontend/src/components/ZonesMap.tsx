import React from 'react';

const ZonesMap: React.FC = () => {
  const zones = [
    { id: 1, name: 'Sector A - Entrada', status: 'Seguro', guards: 2, top: '20%', left: '30%' },
    { id: 2, name: 'Sector B - Almacenes', status: 'Alerta', guards: 4, top: '45%', left: '60%' },
    { id: 3, name: 'Sector C - Parking', status: 'Seguro', guards: 1, top: '70%', left: '20%' },
    { id: 4, name: 'Sector D - Oficinas', status: 'Seguro', guards: 3, top: '30%', left: '75%' },
  ];

  return (
    <div className="animate-fade">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div className="glass-card" style={{ padding: '25px', height: '600px', position: 'relative', overflow: 'hidden' }}>
          <div className="card-title">Mapa de Instalaciones</div>
          
          {/* Simulated Map Background */}
          <div style={{ 
            width: '100%', 
            height: '100%', 
            background: 'radial-gradient(circle at 50% 50%, #1a2235 0%, #05070a 100%)',
            borderRadius: '15px',
            border: '1px solid var(--border)',
            position: 'relative'
          }}>
            {/* Grid Pattern */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              opacity: 0.2
            }}></div>

            {/* Zone Markers */}
            {zones.map((zone) => (
              <div key={zone.id} style={{ 
                position: 'absolute', 
                top: zone.top, 
                left: zone.left,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer'
              }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  background: zone.status === 'Alerta' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                  border: zone.status === 'Alerta' ? '2px solid var(--danger)' : '2px solid var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  <div className={`glow-point ${zone.status === 'Alerta' ? 'red' : ''}`}></div>
                  
                  {/* Tooltip-like Info */}
                  <div className="zone-info" style={{ 
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '10px',
                    padding: '10px',
                    background: 'var(--bg-sidebar)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    whiteSpace: 'nowrap',
                    zIndex: 10
                  }}>
                    <div style={{ fontWeight: '700', fontSize: '0.8rem' }}>{zone.name}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Guardias: {zone.guards}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '25px' }}>
          <div className="card-title">Zonas en Detalle</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {zones.map((zone) => (
              <div key={zone.id} style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontWeight: '600' }}>{zone.name}</span>
                  <span className={`badge ${zone.status === 'Alerta' ? 'badge-danger' : 'badge-success'}`}>{zone.status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>Personal asignado:</span>
                  <span>{zone.guards} Guardias</span>
                </div>
                <button className="btn" style={{ width: '100%', marginTop: '15px', justifyContent: 'center', background: 'var(--bg-accent)', fontSize: '0.8rem' }}>
                  Ver Cámaras
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .zone-info { opacity: 0; transition: opacity 0.3s; pointer-events: none; }
        div:hover > .zone-info { opacity: 1; }
      `}</style>
    </div>
  );
};

export default ZonesMap;
