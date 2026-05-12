import React from 'react';

interface SettingsProps {
  theme: string;
  setTheme: (theme: string) => void;
  language: string;
  setLanguage: (lang: string) => void;
  notifications: boolean;
  setNotifications: (notif: boolean) => void;
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  theme, setTheme, 
  language, setLanguage, 
  notifications, setNotifications,
  notify
}) => {
  const handleThemeChange = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    notify(`Tema ${newTheme === 'dark' ? 'Oscuro' : 'Claro'} aplicado`);
  };

  const handleLangChange = (lang: string) => {
    setLanguage(lang);
    notify(`Idioma cambiado a ${lang === 'es' ? 'Español' : 'Inglés'}`);
  };

  const handleNotifToggle = () => {
    setNotifications(!notifications);
    notify(`Notificaciones ${!notifications ? 'Activadas' : 'Desactivadas'}`);
  };
  return (
    <div className="animate-fade" style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Configuración del Sistema</h2>
        <p style={{ color: 'var(--text-muted)' }}>Personaliza tu experiencia y ajusta los parámetros de seguridad.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* General Settings */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            ⚙️ Preferencias Generales
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Idioma del Sistema</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Selecciona el idioma de la interfaz.</div>
              </div>
              <select 
                className="input-field" 
                style={{ width: '120px', marginTop: '0' }}
                value={language}
                onChange={(e) => handleLangChange(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>

            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Modo de Visualización</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Cambia entre tema oscuro y claro.</div>
              </div>
              <div 
                className={`toggle-mock ${theme === 'light' ? 'active' : ''}`}
                onClick={handleThemeChange}
              ></div>
            </div>

            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Notificaciones de Escritorio</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recibe alertas en tiempo real.</div>
              </div>
              <div 
                className={`toggle-mock ${notifications ? 'active' : ''}`}
                onClick={handleNotifToggle}
              ></div>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔒 Seguridad Avanzada
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Autenticación de Dos Factores</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Añade una capa extra de seguridad.</div>
              </div>
              <button 
                className="btn" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--primary)', color: 'white' }}
                onClick={() => notify('Iniciando configuración de 2FA...')}
              >Activar</button>
            </div>

            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Sesiones Activas</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Gestiona tus dispositivos conectados.</div>
              </div>
              <button 
                className="btn" 
                style={{ padding: '6px 12px', fontSize: '0.75rem', background: 'var(--bg-accent)' }}
                onClick={() => notify('Obteniendo lista de sesiones activas...')}
              >Ver Todo</button>
            </div>

            <div className="setting-item">
              <div>
                <div style={{ fontWeight: '600' }}>Cerrar sesión al cerrar pestaña</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mayor seguridad en equipos compartidos.</div>
              </div>
              <div className="toggle-mock" onClick={() => notify('Esta función requiere permisos de navegador')}></div>
            </div>
          </div>
        </div>

        {/* Profile Settings */}
        <div className="glass-card" style={{ padding: '30px', gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>👤 Mi Perfil</h3>
          <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') as string;
            const email = formData.get('email') as string;
            
            if (name.length < 3) return notify('El nombre es muy corto', 'error');
            if (!email.includes('@')) return notify('Email no válido', 'error');
            
            notify('Perfil actualizado correctamente');
          }}>
            <div className="form-group">
              <label>Nombre Completo</label>
              <input name="name" type="text" className="input-field" defaultValue="Administrador Principal" />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input name="email" type="email" className="input-field" defaultValue="admin@gmail.com" />
            </div>
            <button className="btn btn-primary" style={{ gridColumn: 'span 2', justifyContent: 'center' }}>
              Guardar Cambios de Perfil
            </button>
          </form>
        </div>

        {/* Audit & Logs */}
        <div className="glass-card" style={{ padding: '30px', gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>📜 Registro de Auditoría</h3>
          <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '10px', padding: '15px', fontFamily: 'monospace', fontSize: '0.85rem', color: '#10b981' }}>
            <div>[{new Date().toISOString().slice(0, 16).replace('T', ' ')}] Cambio de configuración: <span style={{ color: 'white' }}>TEMA {theme.toUpperCase()} APLICADO</span></div>
            <div>[2024-05-05 20:15] Intento de acceso desde 192.168.1.45 - <span style={{ color: 'white' }}>EXITOSO</span></div>
            <div>[2024-05-05 18:30] Cambio de configuración de cámaras por Administrador</div>
            <div>[2024-05-05 14:10] Generación de reporte semanal - <span style={{ color: 'white' }}>COMPLETADO</span></div>
          </div>
          <button className="btn" style={{ marginTop: '20px', background: 'var(--bg-accent)', width: '100%', justifyContent: 'center' }}>
            Descargar Historial Completo de Auditoría
          </button>
        </div>
      </div>

      <style>{`
        .setting-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 15px;
          border-bottom: 1px solid var(--border);
        }
        .setting-item:last-child {
          border-bottom: none;
        }
        .toggle-mock {
          width: 44px;
          height: 22px;
          background: #475569;
          border-radius: 20px;
          position: relative;
          cursor: pointer;
          border: 1px solid var(--border);
          transition: all 0.3s;
        }
        .toggle-mock::after {
          content: '';
          position: absolute;
          width: 18px;
          height: 18px;
          background: white;
          border-radius: 50%;
          top: 1px;
          left: 1px;
          transition: all 0.2s;
        }
        .toggle-mock.active {
          background: var(--primary);
          border-color: var(--primary);
        }
        .toggle-mock.active::after {
          left: 23px;
        }
        .input-field {
          background: var(--bg-accent);
          border: 1px solid var(--border);
          padding: 8px 12px;
          border-radius: 8px;
          color: var(--text-primary);
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default Settings;
