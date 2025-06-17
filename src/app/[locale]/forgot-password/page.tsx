'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './styles.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Redirecionando para a página de reset de senha...');
        // Redireciona automaticamente para a página de reset com o token
        if (data.token) {
          router.push(`/reset-password?token=${data.token}`);
        }
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Forgot Password</h1>
      <div className="login-box">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
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
            <button 
              type="submit" 
              className={`login-button ${email ? 'filled' : ''}`}
            >
              <span>REQUEST RESET LINK</span>
            </button>
          </form>
          <div className="register-link">
            <a href="/login">Remember your password? Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 