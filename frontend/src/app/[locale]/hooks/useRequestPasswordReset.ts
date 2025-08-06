import { useState } from 'react';

const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const requestPasswordReset = async (email: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch('http://localhost:3000/api/request-password-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Código de redefinição enviado para seu email! Verifique sua caixa de entrada.');
        return data;
      } else {
        setError(data.error || 'Ocorreu um erro. Tente novamente.');
      }
    } catch (err) {
      setError('Ocorreu um erro. Verifique sua conexão e tente novamente.');
    } finally {
      setLoading(false);
    }
    return null;
  };

  return { requestPasswordReset, loading, error, message };
};

export default useRequestPasswordReset; 