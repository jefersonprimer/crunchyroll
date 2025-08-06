import { useState } from 'react';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetPassword = async (email: string, code: string, password: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Senha redefinida com sucesso!');
        return { success: true, data };
      } else {
        setError(data.error || 'Ocorreu um erro');
        return { success: false, error: data.error || 'Ocorreu um erro' };
      }
    } catch (err) {
      setError('Ocorreu um erro. Verifique sua conexão e tente novamente.');
      return { success: false, error: 'Ocorreu um erro. Verifique sua conexão e tente novamente.' };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, message };
};

export default useResetPassword; 