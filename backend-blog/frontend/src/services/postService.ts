import axios from 'axios';

export interface Post {
  id?: string;
  title: string;
  summary: string;
  content: string;
  cover_image: string;
  tags: string[];
  category: string;
  slug: string;
  author: {
    name: string;
    image: string;
    role?: string;
  };
  created_at: string;
  updated_at: string;
  read_time: number;
  published?: boolean;
}

const API_URL = 'http://localhost:8080/api';

export const postService = {
  async createPost(post: Omit<Post, 'id'>): Promise<Post> {
    const response = await axios.post(`${API_URL}/posts`, post);
    return response.data;
  },

  async updatePost(id: string, post: Partial<Post>): Promise<Post> {
    const response = await axios.patch(`${API_URL}/posts/${id}`, post);
    return response.data;
  },

  async deletePost(id: string): Promise<void> {
    await axios.delete(`${API_URL}/posts/${id}`);
  },

  async getPost(id: string): Promise<Post> {
    const response = await axios.get(`${API_URL}/posts/${id}`);
    return response.data;
  },

  async getAllPosts(): Promise<Post[]> {
    const response = await axios.get(`${API_URL}/posts`);
    return response.data;
  },

  calculateReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  }
}; 