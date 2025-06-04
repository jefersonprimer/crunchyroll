'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Post } from '../types/posts'; 

const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await axios.get('http://localhost:8080/api/posts');
        console.log('Response data:', response.data);
        
        // Ensure we're getting an array
        const postsData = Array.isArray(response.data) ? response.data : [response.data];
        
        // Validate each post has required fields
        const validPosts = postsData.filter(post => {
          const isValid = post && 
            typeof post.id === 'string' && 
            typeof post.title === 'string' &&
            typeof post.category === 'string' &&
            typeof post.created_at === 'string' &&
            typeof post.slug === 'string' &&
            Array.isArray(post.tags) &&
            post.author &&
            typeof post.author.name === 'string';
          
          if (!isValid) {
            console.warn('Invalid post found:', post);
          }
          return isValid;
        });

        console.log('Valid posts:', validPosts);
        setPosts(validPosts);
      } catch (err) {
        console.error('Error fetching posts:', err);
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