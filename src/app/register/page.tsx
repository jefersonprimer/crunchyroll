'use client'

// src/app/register/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Para redirecionamento de rotas
import './styles.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    display_name: ''
  });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        router.push('/profile');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1 className='title'>Register</h1>
      <div className="register-box">
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="email" className={`input-label ${formData.email ? 'filled' : ''}`}>
                Email
              </label>
            </div>

            <div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="username" className={`input-label ${formData.username ? 'filled' : ''}`}>
                Username
              </label>
            </div>

            <div>
              <input
                type="text"
                id="display_name"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="display_name" className={`input-label ${formData.display_name ? 'filled' : ''}`}>
                Display Name
              </label>
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
              />
              <label htmlFor="password" className={`input-label ${formData.password ? 'filled' : ''}`}>
                Password
              </label>
            </div>

            <button type="submit" className="register-button">
              REGISTER
            </button>
          </form>
          <div className="login-link">
            Already have an account? <a href="/login">Login here</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
