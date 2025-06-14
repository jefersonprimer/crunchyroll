'use client'

// src/app/register/page.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import './styles.css';
import FooterSecundary from '../components/layout/FooterSecundary';
import HeaderLogin from '../components/layout/HeaderLogin';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    display_name: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className='main-container'>
      <HeaderLogin />
      <div className="container">
        <h1 className='title'>Criar Conta</h1>
        <div className="register-box">
          <div className='form-container'>
            <form onSubmit={handleSubmit}>
              {error && <div className="error-message">{error}</div>}
      
              <div className="input-container">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder=" "
                />
                <label htmlFor="username" className="input-label">
                  Username
                </label>
              </div>
              <div className="input-container">
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  placeholder=" "
                />
                <label htmlFor="display_name" className="input-label">
                  Display Name
                </label>
              </div>
              <div className="input-container">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
                className={`register-button ${formData.email && formData.password && formData.username && formData.display_name ? 'filled' : ''}`}
              >
                REGISTER
              </button>
            </form>
            <div className='login'>
              <span className="login-link">Já possui uma conta?</span>
              <a href="/login" className='link'>LOGIN</a>
            </div>
            <div className='terms'>
              <p>
                By creating an account you're agreeing to our <a href="/termsofuse">Terms of Use</a> & <a href="/privacypolicy">Privacy Policy</a>, and you confirm that you are at least 16 years of age.
              </p>
            </div>
          </div>
        </div>
      </div>
      <FooterSecundary/>
    </div>
  );
};

export default Register;
