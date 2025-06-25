import { useState } from 'react';

const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (formData: {
    email: string;
    password: string;
    username: string;
    display_name: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
        window.dispatchEvent(new Event('auth-state-changed'));
        return { success: true, data };
      } else {
        setError(data.error || 'Registration failed');
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      return { success: false, error: 'An error occurred. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
};

export default useRegister; 