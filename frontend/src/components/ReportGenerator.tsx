import React, { useState } from 'react';

interface ReportGeneratorProps {
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ notify }) => {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Novedades de Turno');
  const [body, setBody] = useState('');
  const [recipient, setRecipient] = useState('admin@gmail.com');
  const [isSending, setIsSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones
    if (!subject.trim()) {
      notify('El asunto es obligatorio.', 'error');
      return;
    }

    if (body.trim().length < 20) {
      notify('El cuerpo del reporte debe tener al menos 20 caracteres.', 'error');
      return;
    }

    setIsSending(true);

    // Simulación de envío
    setTimeout(() => {
      setIsSending(false);
      notify('Reporte enviado correctamente a supervisión.');
      // Limpiar formulario
      setSubject('');
      setBody('');
    }, 1500);
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Centro de Reportes Oficiales
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '1.1rem' }}>
          Genera y envía informes detallados de seguridad directamente a supervisión.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Left Side: Form */}
        <div className="glass-card" style={{ padding: '40px' }}>
          <div style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '10px' }}>📄 Redactar Informe</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Completa todos los campos para garantizar la precisión del reporte.</p>
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <div className="form-group">
              <label>Asunto del Informe</label>
              <input 
                type="text" 
                className="input-field" 
                placeholder="Ej: Reporte de Incidencias Sector Norte" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Categoría</label>
              <select 
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Novedades de Turno</option>
                <option>Reporte de Incidente Crítico</option>
                <option>Bitácora de Control de Acceso</option>
                <option>Solicitud de Mantenimiento</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cuerpo del Reporte</label>
              <textarea
                className="input-field"
                style={{ height: '250px', lineHeight: '1.6' }}
                placeholder="Describe detalladamente los eventos, horas y personas involucradas..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary" 
              style={{ height: '55px', justifyContent: 'center', fontSize: '1.1rem', fontWeight: '700' }}
              disabled={isSending}
            >
              {isSending ? '🚀 ENVIANDO...' : '📧 ENVIAR A SUPERVISIÓN'}
            </button>
          </form>
        </div>

        {/* Right Side: Options & Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h4 style={{ marginBottom: '20px' }}>Configuración de Envío</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div className="form-group">
                <label>Destinatario (Gmail)</label>
                <input 
                  type="email" 
                  className="input-field" 
                  value={recipient} 
                  onChange={(e) => setRecipient(e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '0.85rem' }}>Adjuntar registro de actividades del turno</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input type="checkbox" checked readOnly style={{ width: '18px', height: '18px' }} />
                <span style={{ fontSize: '0.85rem' }}>Enviar copia a mi correo personal</span>
              </div>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
            <h4 style={{ marginBottom: '15px' }}>💡 Consejos para el Reporte</h4>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '20px' }}>
              <li>Sé específico con las horas de los sucesos.</li>
              <li>Menciona nombres y números de placa si aplica.</li>
              <li>Describe las acciones tomadas ante incidentes.</li>
              <li>Verifica que no haya errores ortográficos antes de enviar.</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '15px' }}>📤</div>
            <h4>Último Reporte Enviado</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
              "Novedades Turno Noche - 05/05/2026"
            </p>
            <span className="badge badge-success" style={{ marginTop: '10px', display: 'inline-block' }}>Enviado Correctamente</span>
          </div>
        </div>
      </div>

      <style>{`
        .input-field {
          width: 100%;
          background: var(--bg-accent);
          border: 1px solid var(--border);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          color: white;
          outline: none;
          font-family: inherit;
          margin-top: 5px;
          transition: all 0.2s;
        }
        .input-field:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-glow);
        }
        .form-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #e2e8f0;
        }
      `}</style>
    </div>
  );
};

export default ReportGenerator;
