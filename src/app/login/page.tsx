'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css'; 
import FooterSecundary from '../components/layout/FooterSecundary';
import HeaderLogin from '../components/layout/HeaderLogin';

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
    <div className='main-container'>
      <HeaderLogin />
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
            <div className="container-link">
              <div className="forgot-password-link">
                <a href="/forgot-password">esqueceu a senha?</a>
              </div>
              |
              <div className="register-link">
                <a href="/register">criar conta</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSecundary/>
    </div>
  );
};

export default Login; 