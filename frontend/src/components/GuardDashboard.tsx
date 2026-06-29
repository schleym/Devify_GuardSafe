import React, { useState, useEffect } from 'react';

const GuardDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('actividades');
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  
  // Determinar turno automáticamente
  const getCurrentShift = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 14) return 'Mañana (06:00 - 14:00)';
    if (hour >= 14 && hour < 22) return 'Tarde (14:00 - 22:00)';
    return 'Noche (22:00 - 06:00)';
  };

  const shiftName = getCurrentShift();
  const isDay = new Date().getHours() >= 6 && new Date().getHours() < 20;

  // Cargar tareas reales de la API de NestJS
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:4000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (Array.isArray(data)) {
          if (data.length === 0) {
            // Auto-crear tareas por defecto si está vacío (Seeding inicial para pruebas)
            const demoTasks = [
              { title: isDay ? 'Ronda Perimetral Planta Silos' : 'Ronda Perimetral de Noche', description: 'Verificar portones principales y cerraduras secundarias.' },
              { title: 'Control de Alcotest Aleatorio', description: 'Realizar pruebas aleatorias en la portería de carga.' },
              { title: 'Verificación EPP Contratistas', description: 'Inspeccionar casco y zapatos de seguridad en el acceso peatonal.' }
            ];

            const createdTasks = [];
            for (const t of demoTasks) {
              const resCreate = await fetch('http://localhost:4000/api/tasks', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(t)
              });
              if (resCreate.ok) {
                const newTask = await resCreate.json();
                createdTasks.push(newTask);
              }
            }
            setTasks(createdTasks);
          } else {
            setTasks(data);
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar tareas:', err);
        setLoading(false);
      });
  }, []);

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ title: newTitle, description: newDesc || undefined })
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo crear la tarea');
        return res.json();
      })
      .then((newTask) => {
        setTasks((prev) => [newTask, ...prev]);
        setNewTitle('');
        setNewDesc('');
      })
      .catch((err) => console.error(err));
  };

  const handleCompleteTask = (id: number) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ completed: true })
    })
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo completar la tarea');
        return res.json();
      })
      .then(() => {
        // Eliminar o marcar como completado. Vamos a filtrarla de la lista
        setTasks((prev) => prev.filter((t) => t.id !== id));
      })
      .catch((err) => console.error(err));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'actividades':
        return (
          <div className="task-list" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Formulario para agregar tarea */}
            <form onSubmit={handleAddTask} className="glass-card" style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ flex: 1 }}>
                <input 
                  type="text" 
                  placeholder="Nueva Tarea (ej: Ronda Perimetral)" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="input-field"
                  style={{ margin: 0, padding: '10px 14px' }}
                  required
                />
              </div>
              <div style={{ flex: 2 }}>
                <input 
                  type="text" 
                  placeholder="Descripción (ej: Verificar portón norte)" 
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="input-field"
                  style={{ margin: 0, padding: '10px 14px' }}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px', borderRadius: '10px' }}>
                ➕ Agregar
              </button>
            </form>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>Cargando tareas...</div>
            ) : tasks.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>No tienes tareas asignadas.</div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="glass-card" style={{ padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: task.completed ? 'rgba(16, 185, 129, 0.05)' : 'linear-gradient(135deg, rgba(255,255,255,0.03), transparent)' }}>
                  <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '12px', 
                      background: task.completed ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-accent)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '1.2rem',
                      border: '1px solid var(--border)',
                      color: task.completed ? 'var(--success)' : 'inherit'
                    }}>
                      {task.completed ? '✅' : '📋'}
                    </div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '4px', textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'var(--text-muted)' : 'inherit' }}>{task.title}</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                        {task.description || 'Sin descripción'}
                      </div>
                    </div>
                  </div>
                  {!task.completed && (
                    <button 
                      onClick={() => handleCompleteTask(task.id)}
                      className="btn" 
                      style={{ padding: '10px 20px', fontSize: '0.85rem', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', border: '1px solid rgba(16, 185, 129, 0.2)' }}
                    >
                      Completar
                    </button>
                  )}
                </div>
              ))
            )}
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
