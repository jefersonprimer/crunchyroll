'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import HeaderLogin from '@/app/components/layout/HeaderLogin';
import useLogin from '../hooks/useLogin';
import Link from 'next/link';
import { ClientMetadata } from '@/app/components/metadata/ClientMetadata';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { login, loading, error: loginError } = useLogin();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      router.push(`/`);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen bg-black'>
      <ClientMetadata
        title="Crunchyroll Login: Stream Anime Online Com Sua Conta"
        description="Stream Anime Online Com Sua Conta"
      />
      <HeaderLogin />
      <div className="flex justify-center items-center flex-1 flex-col py-10 w-full max-w-[1200px] mx-auto">
        <h1 className='text-[34px] font-normal text-center mb-[30px] text-white'>Login</h1>
        <div className="w-full max-w-[500px] flex justify-center">
          <div className='p-[50px] mb-5 w-full'>
            <form onSubmit={handleLogin}>
              {(error || loginError) && (
                <div className="text-red-500 mb-4 p-2 bg-red-500/10 rounded">
                  {error || loginError}
                </div>
              )}
              <div className="relative mb-5">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-2 top-2 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Email
                </label>
              </div>
              <div className="relative mb-5">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-white bg-transparent border-b-2 border-[#ccc] px-2 py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className="absolute left-2 top-2 text-[#aaa] text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-2 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
                >
                  Senha
                </label>
                <button
                  type="button"
                  className="absolute right-2.5 top-2 bg-transparent border-none text-[#A0A0A0] cursor-pointer text-xs p-1 transition-colors hover:text-white z-10"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "OCULTAR" : "EXIBIR"}
                </button>
              </div>
              <button
                type="submit"
                className={`w-full border border-[#A0A0A0] cursor-pointer text-sm rounded-full py-2.5 px-3 my-2.5 transition-all duration-300 ${
                  email && password
                    ? 'bg-[#FF640A] border-[#FF640A] hover:opacity-90'
                    : 'bg-transparent'
                }`}
                disabled={loading || !email || !password}
              >
                <span className={`font-bold transition-all duration-300 ${
                  email && password ? 'text-black' : 'text-[#A0A0A0]'
                }`}>
                  {loading ? 'Entrando...' : 'LOGIN'}
                </span>
              </button>
            </form>
            <div className="flex items-center justify-center gap-2.5">
              <div>
                <Link
                  href={`/${locale}/forgot-password`}
                  className="uppercase text-[#ff640a] font-black no-underline transition-colors hover:text-white"
                >
                  esqueceu a senha?
                </Link>
              </div>
              |
              <div>
                <Link
                  href={`/${locale}/register`}
                  className="uppercase text-[#ff640a] font-black no-underline transition-colors hover:text-white"
                >
                  criar conta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MinimalFooter/>
    </div>
  );
};

export default Login;