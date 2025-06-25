import { useState } from 'react';

const useResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetPassword = async (token: string, password: string) => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch('http://localhost:3000/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Senha redefinida com sucesso!');
        return { success: true, data };
      } else {
        setError(data.error || 'An error occurred');
        return { success: false, error: data.error || 'An error occurred' };
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      return { success: false, error: 'An error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error, message };
};

export default useResetPassword; 