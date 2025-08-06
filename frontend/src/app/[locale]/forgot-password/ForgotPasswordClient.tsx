'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useRequestPasswordReset from '../hooks/useRequestPasswordReset';
import MinimalFooter from '@/app/components/layout/MinimalFooter';
import HeaderLogin from '@/app/components/layout/HeaderLogin';
import Spinner from '@/app/components/loading/Spinner';

const ForgotPasswordClient = () => {
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [showCodeInput, setShowCodeInput] = useState(false);
  const router = useRouter();
  const { requestPasswordReset, loading, error, message } = useRequestPasswordReset();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await requestPasswordReset(email);
    if (data && data.message) {
      setShowCodeInput(true);
    }
  };

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (resetCode.length === 6) {
      // Redirecionar para a página de reset com o código
      window.location.href = `/reset-password?email=${encodeURIComponent(email)}&code=${resetCode}`;
    }
  };

  // Função para validar e formatar o código (aceita números e letras a-f)
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    // Aceitar apenas caracteres hexadecimais (0-9, a-f)
    const hexOnly = value.replace(/[^0-9a-f]/g, '').slice(0, 6);
    setResetCode(hexOnly);
  };

  return (
    <div>
     
      <div className="flex flex-col items-center justify-center bg-[#000000] text-white p-5">
        <div className="w-[416px] h-[396px]">
          <h1 className="text-[2.125rem] mb-8 text-[#FFFFFF] text-center font-medium">Redefinir Senha</h1>
          <p className="text-[#A0A0A0] text-[1rem] text-center w-[416px] h-[72px] mb-8">
            {!showCodeInput 
              ? "Um código será enviado para o seu endereço de e-mail para redefinir sua senha. Seu endereço de IP pode ser registrado para fins de segurança."
              : "Digite o código de 6 caracteres enviado para seu email."
            }
          </p>
          <div className="bg-[#000000] p-8 rounded-lg w-full max-w-[416px] shadow-md">
            {!showCodeInput ? (
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
                    className="w-full py-1 border-b-2 border-[#59595B] bg-transparent text-white text-base transition-colors focus:outline-none focus:border-[#f47521] peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-white transition-all duration-300 pointer-events-none
                    peer-focus:-top-2 peer-focus:left-0 peer-focus:text-xs peer-focus:text-[#f47521]
                    peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-0
                    peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)] peer-[&:not(:placeholder-shown)]:text-[#f47521]"
                  >
                    Endereço de E-mail
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 px-3 rounded-[50px] transition-colors mt-10 ${
                    email
                      ? 'bg-[#f47521] text-black cursor-pointer hover:bg-[#e06a1b]'
                      : 'border-[#59595B] border-2 text-[#59595B] cursor-not-allowed'
                  }`}
                  disabled={loading || !email}
                >
                  <span className="text-sm font-bold">{loading ? <Spinner size={16} border={2}/> : 'ENVIAR'}</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleCodeSubmit} className="flex flex-col gap-6">
                <div className="relative">
                  <input
                    type="text"
                    id="code"
                    value={resetCode}
                    onChange={handleCodeChange}
                    required
                    maxLength={6}
                    className="w-full p-3 border-b border-[#59595B] bg-transparent text-white text-base transition-colors focus:outline-none focus:border-[#f47521] peer text-center tracking-widest"
                    placeholder=" "
                  />
                  <label
                    htmlFor="code"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888] transition-all duration-300 pointer-events-none
                    peer-focus:top-0 peer-focus:left-2 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-[#2a2a2a] peer-focus:text-[#f47521]
                    peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-2
                    peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1
                    peer-[&:not(:placeholder-shown)]:bg-[#2a2a2a] peer-[&:not(:placeholder-shown)]:text-[#f47521]"
                  >
                    Código
                  </label>
                </div>
                <button
                  type="submit"
                  className={`w-full p-3 rounded-[50px] border-[#59595B] border-2 text-base transition-colors mt-10 ${
                    resetCode.length === 6
                      ? 'bg-[#f47521] text-white cursor-pointer hover:bg-[#e06a1b]'
                      : 'bg-none text-[#888] cursor-not-allowed'
                  }`}
                  disabled={resetCode.length !== 6}
                >
                  <span>VERIFICAR CÓDIGO</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowCodeInput(false)}
                  className="w-full p-3 rounded-[50px] border-[#59595B] border-2 text-base transition-colors text-[#f47521] hover:bg-[#f47521] hover:text-white"
                >
                  VOLTAR
                </button>
              </form>
            )}
            <div className="text-center mt-4">
              <a
                href="/login"
                className="text-[#f47521] no-underline hover:underline"
              >
                Lembrou sua senha? Faça login aqui
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordClient;
