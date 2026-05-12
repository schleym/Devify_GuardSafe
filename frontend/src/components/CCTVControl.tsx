import React, { useState } from 'react';

interface CCTVProps {
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const CCTVControl: React.FC<CCTVProps> = ({ notify }) => {
  const [selectedCam, setSelectedCam] = useState<any>(null);

  const handleExpand = (cam: any) => {
    setSelectedCam(cam);
    notify(`Ampliando vista de ${cam.name}...`);
  };

  const cameras = [
    { id: 1, name: 'CAM-01 (Entrada)', status: 'Live', zone: 'Sector A' },
    { id: 2, name: 'CAM-02 (Pasillo Central)', status: 'Live', zone: 'Sector A' },
    { id: 3, name: 'CAM-03 (Almacén)', status: 'Live', zone: 'Sector B' },
    { id: 4, name: 'CAM-04 (Parking)', status: 'Live', zone: 'Sector C' },
    { id: 5, name: 'CAM-05 (Perímetro Sur)', status: 'Falla', zone: 'Sector D' },
    { id: 6, name: 'CAM-06 (Oficinas)', status: 'Live', zone: 'Sector D' },
  ];

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Centro de Monitoreo CCTV</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Visualización en tiempo real de todas las unidades de vigilancia.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {cameras.map((cam) => (
          <div key={cam.id} className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
            <div style={{ 
              height: '200px', 
              background: '#000', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column'
            }}>
              {cam.status === 'Live' ? (
                <>
                  <div style={{ 
                    position: 'absolute', 
                    top: '15px', 
                    left: '15px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    background: 'rgba(0,0,0,0.5)',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    fontSize: '0.7rem'
                  }}>
                    <div className="glow-point red" style={{ width: '6px', height: '6px' }}></div>
                    REC
                  </div>
                  <div style={{ opacity: 0.1, fontSize: '4rem' }}>📹</div>
                  {/* Scanline Effect */}
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0, 
                    background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                    backgroundSize: '100% 4px, 3px 100%',
                    pointerEvents: 'none'
                  }}></div>
                </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '10px' }}>❌</div>
                  <div style={{ color: 'var(--danger)', fontWeight: '600' }}>SIN SEÑAL</div>
                </div>
              )}
            </div>
            <div style={{ padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{cam.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{cam.zone}</div>
              </div>
              <button 
                className="btn" 
                style={{ padding: '6px 12px', fontSize: '0.8rem', background: 'var(--bg-accent)' }}
                onClick={() => handleExpand(cam)}
              >
                Ampliar
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCam && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.95)', 
          zIndex: 2000, 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '40px'
        }}>
          <div style={{ position: 'absolute', top: '30px', right: '30px', cursor: 'pointer', fontSize: '2rem' }} onClick={() => setSelectedCam(null)}>✕</div>
          <div style={{ 
            width: '100%', 
            maxWidth: '1000px', 
            height: '600px', 
            background: '#000', 
            borderRadius: '20px',
            border: '2px solid var(--primary)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="glow-point red"></div>
              <span style={{ fontWeight: '700' }}>{selectedCam.name} - EN VIVO</span>
            </div>
            <div style={{ fontSize: '10rem', opacity: 0.1 }}>📹</div>
            {/* Scanline Effect */}
            <div style={{ 
              position: 'absolute', 
              inset: 0, 
              background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.2) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
              backgroundSize: '100% 4px, 3px 100%',
              pointerEvents: 'none',
              borderRadius: '18px'
            }}></div>
          </div>
          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <h3>{selectedCam.zone}</h3>
            <p style={{ color: 'var(--text-muted)' }}>ID de Unidad: CCTV-00{selectedCam.id} • Señal: 1080p @ 60fps</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CCTVControl;
