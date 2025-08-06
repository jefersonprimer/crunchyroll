'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import useResetPassword from '../hooks/useResetPassword';

interface Props {
  locale: string;
}

export default function ResetPasswordForm({ locale }: Props) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const code = searchParams.get('code');
  const { resetPassword, loading, error, message } = useResetPassword();

  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('As senhas não coincidem');
      return;
    }

    if (!email || !code) {
      setLocalError('Email ou código inválido');
      return;
    }

    const result = await resetPassword(email, code, password);
    if (result.success) {
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    }
  };

  // Se não tiver email ou código, mostrar erro
  if (!email || !code) {
    return (
      <div className="w-[416px] h-[396px]">
        <h1 className="text-[2.5rem] mb-8 text-[#f47521] text-center">Redefinir Senha</h1>
        <div className="bg-[#000000] p-8 w-full shadow-md">
          <div className="text-[#ff4444] bg-[rgba(255,68,68,0.1)] p-2.5 rounded mb-4">
            Link inválido. Por favor, solicite um novo código de redefinição.
          </div>
          <a
            href="/forgot-password"
            className="text-[#f47521] no-underline hover:underline"
          >
            Voltar para solicitar novo código
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[416px] h-[396px]">
        <h1 className="text-[2.5rem] mb-8 text-[#f47521] text-center">Redefinir Senha</h1>
        <p className="text-[#A0A0A0] text-[1rem] text-center mb-4">
          Redefinindo senha para: {email}
        </p>
        <div className="bg-[#000000] p-8 w-full shadow-md">
        <div className="flex flex-col gap-6">
            <form onSubmit={handleSubmit}>
            {(localError || error) && (
                <div className="text-[#ff4444] bg-[rgba(255,68,68,0.1)] p-2.5 rounded mb-4">
                {localError || error}
                </div>
            )}
            {message && (
                <div className="text-[#44ff44] bg-[rgba(68,255,68,0.1)] p-2.5 rounded mb-4">
                {message}
                </div>
            )}
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border-b border-[#59595B] mb-2 bg-[#000000] text-white text-base transition-colors focus:outline-none focus:border-[#f47521] peer placeholder-transparent"
                placeholder=" "
                />
                <label
                htmlFor="password"
                className="absolute left-0 top-3 text-[#888] text-base transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-0 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-[#2a2a2a] peer-focus:text-[#f47521] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:bg-[#2a2a2a] peer-[&:not(:placeholder-shown)]:text-[#f47521]"
                >
                Nova Senha
                </label>
                <button
                type="button"
                className="absolute right-3 top-3 bg-transparent border-none text-[#888] cursor-pointer text-xs p-1 transition-colors hover:text-[#f47521]"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? "OCULTAR" : "EXIBIR"}
                </button>
            </div>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border-b mb-8 border-[#59595B] bg-[#000000] text-white text-base transition-colors focus:outline-none focus:border-[#f47521] peer placeholder-transparent"
                placeholder=" "
                />
                <label
                htmlFor="confirmPassword"
                className="absolute left-0 top-3 text-[#888] text-base transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:left-0 peer-focus:text-xs peer-focus:px-1 peer-focus:bg-[#2a2a2a] peer-focus:text-[#f47521] peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:left-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:px-1 peer-[&:not(:placeholder-shown)]:bg-[#2a2a2a] peer-[&:not(:placeholder-shown)]:text-[#f47521]"
                >
                Confirmar Nova Senha
                </label>
            </div>
            <button
                type="submit"
                className={`w-full p-3 rounded-[50px] text-base transition-colors border border-[#59595B] ${
                password && confirmPassword
                    ? 'bg-[#f47521] text-white cursor-pointer hover:bg-[#e06a1b]'
                    : 'bg-[#000000] text-[#888] cursor-not-allowed'
                }`}
                disabled={loading || !password || !confirmPassword}
            >
                <span>{loading ? 'REDEFININDO...' : 'REDEFINIR SENHA'}</span>
            </button>
            </form>
        </div>
        </div>
    </div>
  );
}