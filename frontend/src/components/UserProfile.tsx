import React, { useState } from 'react';

interface UserProfileProps {
  user: { name: string; role: string };
  notify: (msg: string, type?: 'success' | 'error') => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, notify }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      notify('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }
    notify('Contraseña actualizada correctamente');
    setShowPasswordModal(false);
    setNewPassword('');
  };

  const handle2FA = () => {
    notify('Iniciando configuración de autenticación de dos factores...');
    setTimeout(() => {
      notify('Código de verificación enviado a tu correo');
    }, 2000);
  };
  return (
    <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '800' }}>Perfil de Usuario</h2>
        <p style={{ color: 'var(--text-muted)' }}>Gestiona tu información personal y preferencias de cuenta.</p>
      </div>

      <div className="glass-card" style={{ padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
        <div style={{ 
          width: '120px', 
          height: '120px', 
          borderRadius: '30px', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '3rem',
          boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)',
          position: 'relative'
        }}>
          👤
          <div style={{ 
            position: 'absolute', 
            bottom: '-5px', 
            right: '-5px', 
            background: 'var(--success)', 
            width: '25px', 
            height: '25px', 
            borderRadius: '50%', 
            border: '4px solid var(--bg-card)' 
          }}></div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '5px' }}>{user.name}</h3>
          <span className="badge badge-success" style={{ padding: '6px 15px', fontSize: '0.85rem' }}>{user.role}</span>
        </div>

        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
          <div className="info-box">
            <label>Correo Electrónico</label>
            <p>{user.name.toLowerCase().replace(' ', '.')}@gmail.com</p>
          </div>
          <div className="info-box">
            <label>ID de Empleado</label>
            <p>GS-2024-0892</p>
          </div>
          <div className="info-box">
            <label>Fecha de Ingreso</label>
            <p>12 de Octubre, 2023</p>
          </div>
          <div className="info-box">
            <label>Departamento</label>
            <p>Seguridad Operativa</p>
          </div>
        </div>

        <div style={{ width: '100%', borderTop: '1px solid var(--border)', paddingTop: '30px', marginTop: '10px' }}>
          <h4 style={{ marginBottom: '20px' }}>Configuración de Seguridad</h4>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              className="btn" 
              style={{ background: 'var(--bg-accent)', flex: 1, justifyContent: 'center' }}
              onClick={() => setShowPasswordModal(true)}
            >
              Cambiar Contraseña
            </button>
            <button 
              className="btn" 
              style={{ background: 'var(--bg-accent)', flex: 1, justifyContent: 'center' }}
              onClick={handle2FA}
            >
              Configurar 2FA
            </button>
          </div>
        </div>
      </div>

      {showPasswordModal && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(0,0,0,0.8)', 
          zIndex: 1000, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ maxWidth: '400px', width: '100%', padding: '30px' }}>
            <h3 style={{ marginBottom: '20px' }}>🔐 Nueva Contraseña</h3>
            <div className="form-group" style={{ marginBottom: '20px' }}>
              <label>Ingresa tu nueva clave</label>
              <input 
                type="password" 
                className="input-field" 
                style={{ width: '100%', background: 'var(--bg-accent)', border: '1px solid var(--border)', padding: '12px', borderRadius: '8px', color: 'white' }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
              />
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowPasswordModal(false)}>Cancelar</button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={handlePasswordChange}>Guardar</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .info-box {
          background: rgba(255, 255, 255, 0.03);
          padding: 20px;
          border-radius: 15px;
          border: 1px solid var(--border);
        }
        .info-box label {
          display: block;
          font-size: 0.75rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 8px;
        }
        .info-box p {
          font-size: 1.1rem;
          fontWeight: 600;
        }
      `}</style>
    </div>
  );
};

export default UserProfile;
