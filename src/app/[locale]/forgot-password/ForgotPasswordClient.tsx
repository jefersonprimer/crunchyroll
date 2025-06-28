'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequestPasswordReset from '../hooks/useRequestPasswordReset';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import HeaderLogin from '@/app/components/layout/HeaderLogin';

const ForgotPasswordClient = () => {
  const [email, setEmail] = useState('');
  const router = useRouter();
  const { requestPasswordReset, loading, error, message } = useRequestPasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await requestPasswordReset(email);
    if (data && data.token) {
      setTimeout(() => {
        // Reload completo para garantir que metadata seja aplicado corretamente
        window.location.href = `/reset-password?token=${data.token}`;
      }, 1000);
    }
  };

  return (
    <div>
      <HeaderLogin />
      <div className="flex flex-col items-center justify-center bg-[#000000] text-white p-5">
        <div className="w-[416px] h-[396px]">
          <h1 className="text-[2.5rem] mb-8 text-[#FFFFFF] text-center">Redefinir Senha</h1>
          <p className="text-[#A0A0A0] text-[1rem] text-center w-[416px] h-[72px]">
            Um link será enviado para o seu endereço de e-mail para redefinir sua senha. Seu endereço de IP pode ser registrado para fins de segurança.
          </p>
          <div className="bg-[#000000] p-8 rounded-lg w-full max-w-[400px] shadow-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="text-[#ff4444] bg-[rgba(255,68,68,0.1)] p-2.5 rounded mb-4">
                  {error}
                </div>
              )}
              {message && (
                <div className="text-[#44ff44] bg-[rgba(68,255,68,0.1)] p-2.5 rounded mb-4">
                  {message}
                </div>
              )}
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-3 border-b border-[#59595B] bg-transparent text-white text-base transition-colors focus:outline-none focus:border-[#f47521] peer"
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] transition-all duration-300 pointer-events-none
                  peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-[#2a2a2a] peer-focus:text-[#f47521]
                  peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-2
                  peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1
                  peer-[&:not(:placeholder-shown)]:bg-[#2a2a2a] peer-[&:not(:placeholder-shown)]:text-[#f47521]"
                >
                  Email
                </label>
              </div>
              <button
                type="submit"
                className={`w-full p-3 rounded-[50px] border-[#59595B] border-2 text-base transition-colors mt-10 ${
                  email
                    ? 'bg-[#f47521] text-white cursor-pointer hover:bg-[#e06a1b]'
                    : 'bg-none text-[#888] cursor-not-allowed'
                }`}
                disabled={loading || !email}
              >
                <span>{loading ? 'SENDING...' : 'REQUEST RESET LINK'}</span>
              </button>
            </form>
            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-[#f47521] no-underline hover:underline"
              >
                Remember your password? Login here
              </a>
            </div>
          </div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  );
};

export default ForgotPasswordClient;
