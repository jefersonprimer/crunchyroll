'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas
import './styles.css'; // Estilos do seu componente

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.dispatchEvent(new Event('auth-state-changed'));
        router.push('/profile');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className='title'>Login</h1>
      <div className="login-box">
        <div className='form-container'>
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            <div className="input-container">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="email" className="input-label">
                Email
              </label>
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="password" className="input-label">
                Senha
              </label>
              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "OCULTAR" : "EXIBIR"}
              </button>
            </div>
            <button 
              type="submit" 
              className={`login-button ${email && password ? 'filled' : ''}`}
            >
              <span>LOGIN</span>
            </button>
          </form>
          <div className="register-link">
          <a href="/register"> Don't have an account? Register here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 