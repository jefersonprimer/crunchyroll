'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useLogin from '../hooks/useLogin';
import Spinner from '../../components/loading/Spinner';

interface Props {
  locale: string;
}

const LoginForm = ({ locale }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading, error: loginError } = useLogin();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(email, password);
    if (result.success) {
      router.push('/');
    } else {
      setError(result.error);
    }
  };

  return (
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
            autoComplete="off"
            className="w-full text-white bg-transparent border-b-2 border-[#59595B] py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute left-0 top-2 text-white text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-0 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
          >
            Endereço de E-mail
          </label>
        </div>
        <div className="relative mb-5">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full text-white bg-transparent border-b-2 border-[#59595B]  py-2 text-base outline-none transition-colors focus:border-[#ff640a] peer placeholder-transparent"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="absolute left-0 top-2 text-white text-base transition-all duration-200 pointer-events-none peer-focus:-top-3.5 peer-focus:left-0 peer-focus:text-xs peer-focus:text-[#ff640a] peer-[&:not(:placeholder-shown)]:-top-3.5 peer-[&:not(:placeholder-shown)]:left-0 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-[#ff640a]"
          >
            Senha
          </label>
          <button
            type="button"
            className="absolute right-2.5 top-2 bg-transparent border-none text-[#A0A0A0] cursor-pointer font-bold text-xs p-1 transition-colors hover:text-white z-10"
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
            {loading ? (
              <div className="flex justify-center items-center">
                <Spinner size={16} border={2}/>
              </div>
            ) : (
              <span className={`font-bold transition-all duration-300 ${
                email && password ? 'text-black' : 'text-[#A0A0A0]'
              }`}>
                LOGIN
              </span>
            )}
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
  );
};

export default LoginForm;
