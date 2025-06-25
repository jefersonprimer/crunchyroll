import { useState } from 'react';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        window.dispatchEvent(new Event('auth-state-changed'));
        return { success: true, data };
      } else {
        setError(data.error || 'Login failed');
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      return { success: false, error: 'An error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};

export default useLogin; 