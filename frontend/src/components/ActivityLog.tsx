import React, { useState } from 'react';

interface ActivityLogProps {
  notify?: (msg: string, type?: 'success' | 'error') => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ notify }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterText, setFilterText] = useState('');

  const activities = [
    { id: 1, guard: 'Juan Pérez', action: 'Ronda Perimetral', location: 'Sector A', status: 'Completado', time: '20:15', severity: 'low' },
    { id: 2, guard: 'Carlos Ruiz', action: 'Control de Acceso', location: 'Puerta Principal', status: 'Incidente', time: '19:45', severity: 'high' },
    { id: 3, guard: 'Ana López', action: 'Monitoreo CCTV', location: 'Centro Control', status: 'En Proceso', time: 'Ahora', severity: 'low' },
    { id: 4, guard: 'Pedro Picapiedra', action: 'Revisión de Extintores', location: 'Planta 2', status: 'Completado', time: '18:30', severity: 'medium' },
    { id: 5, guard: 'Juan Pérez', action: 'Cambio de Turno', location: 'Entrada', status: 'Completado', time: '18:00', severity: 'low' },
  ].filter(act => 
    act.guard.toLowerCase().includes(filterText.toLowerCase()) || 
    act.action.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="animate-fade">
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{ fontSize: '1.2rem' }}>Registro Histórico</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`btn ${showFilters ? 'btn-primary' : ''}`} 
              style={{ background: showFilters ? '' : 'var(--bg-accent)', color: 'white' }} 
              onClick={() => setShowFilters(!showFilters)}
            >
              🔍 {showFilters ? 'Ocultar Filtros' : 'Filtros'}
            </button>
            <button className="btn btn-primary" onClick={() => notify?.('Generando archivo CSV...')}>Exportar CSV</button>
          </div>
        </div>

        {showFilters && (
          <div style={{ padding: '15px 25px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--border)', display: 'flex', gap: '15px' }}>
            <input 
              type="text" 
              className="input-field" 
              style={{ maxWidth: '300px', margin: '0' }} 
              placeholder="Filtrar por guardia o acción..." 
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <select className="input-field" style={{ maxWidth: '150px', margin: '0' }}>
              <option>Todas las zonas</option>
              <option>Sector A</option>
              <option>Sector B</option>
            </select>
          </div>
        )}
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', fontSize: '0.8rem', textTransform: 'uppercase' }}>
            <tr>
              <th style={{ padding: '15px 25px' }}>ID</th>
              <th style={{ padding: '15px 25px' }}>Guardia</th>
              <th style={{ padding: '15px 25px' }}>Acción</th>
              <th style={{ padding: '15px 25px' }}>Ubicación</th>
              <th style={{ padding: '15px 25px' }}>Hora</th>
              <th style={{ padding: '15px 25px' }}>Estado</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: '0.9rem' }}>
            {activities.map((act) => (
              <tr key={act.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }} className="table-row-hover">
                <td style={{ padding: '15px 25px', color: 'var(--text-muted)' }}>#{act.id.toString().padStart(4, '0')}</td>
                <td style={{ padding: '15px 25px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>
                      {act.guard.split(' ').map(n => n[0]).join('')}
                    </div>
                    {act.guard}
                  </div>
                </td>
                <td style={{ padding: '15px 25px' }}>{act.action}</td>
                <td style={{ padding: '15px 25px', color: 'var(--text-secondary)' }}>{act.location}</td>
                <td style={{ padding: '15px 25px' }}>{act.time}</td>
                <td style={{ padding: '15px 25px' }}>
                  <span className={`badge ${act.severity === 'high' ? 'badge-danger' : act.severity === 'medium' ? 'badge-warning' : 'badge-success'}`}>
                    {act.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ padding: '20px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
          <span>Mostrando 5 de 1,240 resultados</span>
          <div style={{ display: 'flex', gap: '5px' }}>
            <button className="btn" style={{ padding: '5px 10px', background: 'var(--bg-accent)' }} onClick={() => notify?.('Cargando página anterior...')}>Anterior</button>
            <button className="btn" style={{ padding: '5px 10px', background: 'var(--primary)', color: 'white' }}>1</button>
            <button className="btn" style={{ padding: '5px 10px', background: 'var(--bg-accent)' }} onClick={() => notify?.('Cargando página 2...')}>2</button>
            <button className="btn" style={{ padding: '5px 10px', background: 'var(--bg-accent)' }} onClick={() => notify?.('Cargando siguiente página...')}>Siguiente</button>
          </div>
        </div>
      </div>

      <style>{`
        .table-row-hover:hover {
          background: rgba(255, 255, 255, 0.02);
        }
      `}</style>
    </div>
  );
};

export default ActivityLog;
