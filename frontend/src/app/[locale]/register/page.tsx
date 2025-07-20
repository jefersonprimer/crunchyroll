'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; 
import MinimalFooter from '../../components/layout/MinimalFooter';
import HeaderLogin from '../../components/layout/HeaderLogin';
import useRegister from '../hooks/useRegister';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

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
  const { register, loading, error: registerError } = useRegister();

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

    const result = await register(formData);
    if (result.success) {
      router.push('/profile');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <ClientMetadata
        title="Cadastre-se no Crunchyroll: curta anime a qualquer hora!"
        description="curta anime a qualquer hora!"
      />
      <HeaderLogin />
      <div className="flex justify-center items-center flex-1 flex-col py-10 w-full max-w-[1200px] mx-auto">
        <h1 className='text-[34px] font-normal'>Criar Conta</h1>
        <div className="p-5 shadow-md w-[540px] text-center">
          <div className='p-[50px] mb-5'>
            <form onSubmit={handleSubmit}>
              {(error || registerError) && (
                <div className="text-red-500 mb-4">
                  {error || registerError}
                </div>
              )}
      
              <div className="relative mb-5">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 top-3 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Email
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="username"
                  className="absolute left-2 top-3 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Username
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  type="text"
                  id="display_name"
                  name="display_name"
                  value={formData.display_name}
                  onChange={handleChange}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="display_name"
                  className="absolute left-2 top-3 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Display Name
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 top-3 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="absolute right-2 top-3 bg-transparent border-none text-[#666] cursor-pointer text-xs transition-colors hover:text-[#333]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "OCULTAR" : "EXIBIR"}
                </button>
              </div>
              <button
                type="submit"
                className={`w-full py-2.5 px-5 border rounded-full transition-all duration-300 ${
                  formData.email && formData.password && formData.username && formData.display_name
                    ? 'bg-[#ff640a] border-[#ff640a] text-white'
                    : 'border-[#A0A0A0] text-[#A0A0A0] bg-transparent'
                }`}
                disabled={loading}
              >
                {loading ? 'REGISTERING...' : 'REGISTER'}
              </button>
            </form>
            <div className='flex items-center justify-center mt-5 gap-2.5'>
              <span className="text-white">Já possui uma conta?</span>
              <a href="/login" className='text-[#ff640a] no-underline transition-colors hover:text-white'>LOGIN</a>
            </div>
            <div className='text-[#A0A0A0] mt-5 text-sm'>
              <p>
                By creating an account you're agreeing to our <a href="/termsofuse" className='text-[#FF640A] no-underline transition-colors hover:text-white'>Terms of Use</a> & <a href="/privacypolicy" className='text-[#FF640A] no-underline transition-colors hover:text-white'>Privacy Policy</a>, and you confirm that you are at least 16 years of age.
              </p>
            </div>
          </div>
        </div>
      </div>
      <MinimalFooter/>
    </div>
  );
};

export default Register;