'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './styles.css';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!token) {
      setError('Invalid reset token');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setError(data.error || 'An error occurred');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Reset Password</h1>
      <div className="login-box">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}
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
                New Password
              </label>
              <button
                type="button"
                className="show-password-button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "OCULTAR" : "EXIBIR"}
              </button>
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field"
                placeholder=" "
              />
              <label htmlFor="confirmPassword" className="input-label">
                Confirm New Password
              </label>
            </div>
            <button 
              type="submit" 
              className={`login-button ${password && confirmPassword ? 'filled' : ''}`}
            >
              <span>RESET PASSWORD</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword; 