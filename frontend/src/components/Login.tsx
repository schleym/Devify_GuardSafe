import React, { useState } from 'react';

interface LoginProps {
  onLogin: (user: { name: string; role: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones de formato
    if (!validateEmail(email)) {
      setError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Inicio de sesión real mediante API
    const btn = e.currentTarget.querySelector('button');
    if (btn) btn.innerHTML = 'Verificando...';

    fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.message || 'Credenciales incorrectas. Intente de nuevo.');
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem('token', data.access_token);
        onLogin({ name: data.user.name, role: data.user.role });
      })
      .catch((err) => {
        setError(err.message || 'Error al conectar con el servidor.');
        if (btn) btn.innerHTML = 'Iniciar Sesión';
      });
  };

  return (
    <div className="login-page">
      <div className="login-container glass">
        <div className="login-header">
          <div className="logo-icon" style={{ margin: '0 auto 20px', width: '50px', height: '50px', fontSize: '1.5rem' }}>🛡️</div>
          <h2>Acceso al Sistema</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
            Ingresa tus credenciales autorizadas para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div style={{ 
              background: 'rgba(239, 68, 68, 0.1)', 
              color: 'var(--danger)', 
              padding: '12px', 
              borderRadius: '8px', 
              fontSize: '0.85rem', 
              marginBottom: '20px',
              border: '1px solid rgba(239, 68, 68, 0.2)',
              textAlign: 'center'
            }}>
              {error}
            </div>
          )}

          <div className="form-group">
            <label>Correo Electrónico</label>
            <input 
              type="email" 
              placeholder="admin@gmail.com o guardia@gmail.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}>
            Iniciar Sesión
          </button>
        </form>

        <div className="login-footer">
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
            Usa <b>admin@gmail.com</b> / <b>admin1234</b> para Admin<br/>
            Usa <b>guardia@gmail.com</b> / <b>guardia1234</b> para Guardia
          </p>
        </div>
      </div>

      <style>{`
        .login-page {
          position: fixed;
          inset: 0;
          background: radial-gradient(circle at top right, #1a2235 0%, #05070a 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 40px;
          border-radius: var(--radius-lg);
          text-align: center;
        }

        .login-header h2 {
          font-size: 1.8rem;
          font-weight: 700;
        }

        .login-form {
          margin-top: 30px;
          text-align: left;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.85rem;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .form-group input {
          width: 100%;
          background: var(--bg-accent);
          border: 1px solid var(--border);
          padding: 12px 16px;
          border-radius: var(--radius-sm);
          color: white;
          outline: none;
          transition: border-color 0.2s;
        }

        .form-group input:focus {
          border-color: var(--primary);
        }

        .login-footer {
          margin-top: 30px;
          color: var(--text-muted);
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default Login;
