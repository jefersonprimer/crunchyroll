'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '@/types/posts'; 

const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('https://blog-backend-ten-plum.vercel.app/api/posts');
        setPosts(response.data); // Ajustado para acessar a estrutura correta.
      } catch (err) {
        console.error(err);
        setError('Erro ao buscar os posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
};

export default useFetchPosts;