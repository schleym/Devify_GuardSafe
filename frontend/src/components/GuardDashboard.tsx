import React, { useState } from 'react';

const GuardDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('actividades');
  
  // Determinar turno automáticamente
  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return 'Mañana (06:00 - 14:00)';
    if (hour >= 14 && hour < 22) return 'Tarde (14:00 - 22:00)';
    return 'Noche (22:00 - 06:00)';
  };

  const shiftName = getCurrentShift();
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 20;

  const currentTasks = [
    { 
      id: 1, 
      title: isDay ? 'Control de Romana y Pesaje' : 'Ronda Perimetral Planta Silos', 
      time: 'En curso', 
      priority: 'Alta', 
      zone: isDay ? 'Romana Principal' : 'Sector Silos y Calderas' 
    },
    { 
      id: 2, 
      title: isDay ? 'Verificación EPP Contratistas' : 'Control de Temperatura de Equipos', 
      time: 'Pendiente', 
      priority: 'Media', 
      zone: isDay ? 'Acceso Peatonal Norte' : 'Planta de Procesos' 
    },
    { 
      id: 3, 
      title: 'Control de Alcotest Aleatorio', 
      time: 'Programado 12:00', 
      priority: 'Alta', 
      zone: 'Acceso Transporte de Carga' 
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'actividades':
        return (
          <div className="task-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {currentTasks.map((task) => (
              <div key={task.id} className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)' }}>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '16px', 
                    background: 'var(--bg-accent)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '1.5rem',
                    border: '1px solid var(--border)',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                  }}>
                    {task.priority === 'Alta' ? '🔥' : '📋'}
                  </div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '1.2rem', marginBottom: '4px' }}>{task.title}</div>
                    <div style={{ fontSize: '0.9rem', color: '#cbd5e1', display: 'flex', gap: '15px' }}>
                      <span>📍 {task.zone}</span>
                      <span>🕒 {task.time}</span>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary" style={{ padding: '10px 24px', fontSize: '0.9rem', borderRadius: '10px' }}>Marcar como Listado</button>
              </div>
            ))}
          </div>
        );
      
      case 'romana':
        return (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'left', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), transparent)' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Control de Romana y Transporte de Carga</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Registro de pesaje, guías de despacho y sellos de seguridad.</p>
            </div>
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div className="form-group">
                <label>Tipo de Movimiento</label>
                <select className="input-field">
                  <option>Ingreso Materia Prima (Remolacha/Trigo)</option>
                  <option>Despacho Producto Terminado (Azúcar/Insumos)</option>
                  <option>Ingreso Proveedor (Químicos/Combustible)</option>
                  <option>Salida Residuos</option>
                </select>
              </div>
              <div className="form-group">
                <label>N° Guía de Despacho</label>
                <input type="text" className="input-field" placeholder="Ej: 8450123" />
              </div>
              <div className="form-group">
                <label>Patente Camión / Rampla</label>
                <input type="text" className="input-field" placeholder="Ej: ABCD-12 / XYZ-99" />
              </div>
              <div className="form-group">
                <label>Empresa de Transporte</label>
                <input type="text" className="input-field" placeholder="Ej: Transportes del Sur S.A." />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '15px' }}>
                <div style={{ flex: 1 }}>
                  <label>Tara (Kg)</label>
                  <input type="number" className="input-field" placeholder="0" />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Peso Bruto (Kg)</label>
                  <input type="number" className="input-field" placeholder="0" />
                </div>
              </div>
              <div className="form-group">
                <label>N° Sello de Seguridad (Escotilla/Puerta)</label>
                <input type="text" className="input-field" placeholder="Ej: S-45091" />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Observaciones de Carga/Descarga</label>
                <textarea className="input-field" style={{ height: '80px' }} placeholder="Condiciones de la carpa, derrames, etc..."></textarea>
              </div>
              <button type="button" className="btn btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center', height: '50px', fontSize: '1rem' }}>
                ✅ REGISTRAR PESAJE E IMPRIMIR VALE
              </button>
            </form>
          </div>
        );

      case 'epp':
        return (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'left', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), transparent)' }}>
            <div style={{ marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Control Prevención de Riesgos y EPP</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verificación de contratistas, charlas de inducción y prueba de alcotest.</p>
            </div>
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>RUT Contratista / Trabajador</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input type="text" className="input-field" placeholder="12.345.678-9" style={{ flex: 1 }} />
                  <button className="btn" style={{ background: 'var(--bg-accent)', marginTop: '8px' }}>🔍 Validar AST/Permisos</button>
                </div>
              </div>
              
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Verificación de Elementos de Protección Personal (EPP)</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '15px', marginTop: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Casco de Seguridad</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Lentes de Seguridad</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Chaleco Reflectante</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Zapatos de Seguridad</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Protección Auditiva</label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}><input type="checkbox" /> Guantes</label>
                </div>
              </div>

              <div className="form-group">
                <label>Resultado Alcotest (si aplica)</label>
                <select className="input-field">
                  <option>No Aplica</option>
                  <option>Negativo (0.00)</option>
                  <option style={{ color: 'var(--danger)' }}>Positivo ({'>'}0.00) - RECHAZAR INGRESO</option>
                </select>
              </div>

              <div className="form-group">
                <label>Inducción de Planta</label>
                <select className="input-field">
                  <option>Vigente</option>
                  <option>Vencida - Requiere Charla Diaria</option>
                  <option>Nueva Visita - Entregar Video/Tríptico</option>
                </select>
              </div>

              <button type="button" className="btn btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center', height: '50px', fontSize: '1rem', background: 'var(--success)' }}>
                ✅ AUTORIZAR INGRESO A PLANTA
              </button>
            </form>
          </div>
        );

      case 'alertas':
        return (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'left', border: '1px solid rgba(239, 68, 68, 0.2)', background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05), transparent)' }}>
            <div style={{ marginBottom: '30px', textAlign: 'center' }}>
              <h3 style={{ marginBottom: '10px', color: 'var(--danger)', fontSize: '1.8rem' }}>⚠️ REPORTE DE INCIDENCIA</h3>
              <p style={{ color: 'var(--text-muted)' }}>Usa este formulario solo para reportar eventos que requieran atención inmediata.</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px', maxWidth: '600px', margin: '0 auto' }}>
              <div className="form-group">
                <label>Tipo de Evento Industrial</label>
                <select className="input-field" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
                  <option>Fuga de Producto / Derrame Químico</option>
                  <option>Incendio en Silo / Caldera</option>
                  <option>Accidente de Contratista / Operador</option>
                  <option>Vehículo no autorizado en zona de carga</option>
                  <option>Actividad Sospechosa / Intruso Perimetral</option>
                </select>
              </div>
              <div className="form-group">
                <label>Zona del Suceso en Planta</label>
                <input type="text" className="input-field" placeholder="Ej: Romana 2, Planta de Extracción, Patio de Carbón" />
              </div>
              <div className="form-group">
                <label>Notas de Campo y Evaluación de Daños</label>
                <textarea className="input-field" style={{ height: '120px' }} placeholder="Indique si hay lesionados, si requiere brigada de emergencia o bomberos..."></textarea>
              </div>
              <button className="btn" style={{ background: 'var(--danger)', color: 'white', width: '100%', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '800', padding: '18px', boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)' }}>
                🚨 ACTIVAR SIRENA Y BRIGADA DE EMERGENCIA
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="animate-fade guard-dashboard" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '30px', marginBottom: '40px', background: 'linear-gradient(to right, rgba(59, 130, 246, 0.1), transparent)' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: '800', marginBottom: '8px' }}>Operaciones de Seguridad</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          Estado del Turno: <span style={{ color: 'var(--primary)', fontWeight: '700' }}>{shiftName}</span>
        </p>
      </div>

      {/* Modern Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '15px', marginBottom: '40px' }}>
        {[
          { id: 'actividades', label: 'Plan de Tareas', icon: '📋' },
          { id: 'romana', label: 'Control Romana', icon: '⚖️' },
          { id: 'epp', label: 'Control Prevención/EPP', icon: '🦺' },
          { id: 'alertas', label: 'Emergencias Planta', icon: '🚨' }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : ''}`}
            style={{ 
              background: activeTab === tab.id ? '' : 'rgba(255,255,255,0.05)',
              padding: '15px 30px',
              fontSize: '1rem',
              borderRadius: '14px',
              border: activeTab === tab.id ? '' : '1px solid var(--border)'
            }}
          >
            <span style={{ fontSize: '1.2rem', marginRight: '8px' }}>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div style={{ minHeight: '500px' }}>
        {renderContent()}
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: rgba(16, 21, 30, 0.8);
          border: 1px solid var(--border);
          padding: 14px 18px;
          border-radius: 10px;
          color: white;
          outline: none;
          font-family: inherit;
          margin-top: 8px;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: var(--primary);
          background: rgba(16, 21, 30, 1);
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      `}</style>
    </div>
  );
};

export default GuardDashboard;
