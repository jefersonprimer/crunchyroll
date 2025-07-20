<template>
  <div class="post-list">
    <div class="header">
      <h1>Posts</h1>
      <button class="btn btn-primary" @click="router.push('/admin/posts/new')">
        New Post
      </button>
    </div>

    <div v-if="loading" class="loading">
      Loading posts...
    </div>

    <div v-else-if="error" class="error">
      {{ error }}
    </div>

    <div v-else-if="posts.length === 0" class="empty-state">
      No posts found. Create your first post!
    </div>

    <div v-else class="posts-grid">
      <div v-for="post in posts" :key="post.id" class="post-card">
        <div class="post-cover" v-if="post.cover_image">
          <img :src="post.cover_image" :alt="post.title" />
        </div>
        <div class="post-content">
          <div class="post-header">
            <h2>{{ post.title }}</h2>
            <div class="more-options">
              <button class="more-button" @click="toggleMoreMenu(post.id!)">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="1"></circle>
                  <circle cx="19" cy="12" r="1"></circle>
                  <circle cx="5" cy="12" r="1"></circle>
                </svg>
              </button>
              <div v-if="activeMoreMenu === post.id" class="more-menu">
                <button @click="duplicatePost(post)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  Duplicate Post
                </button>
                <button @click="previewPost(post)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Preview
                </button>
                <button @click="exportPost(post)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Export
                </button>
                <button @click="togglePublishStatus(post)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  {{ post.published ? 'Unpublish' : 'Publish' }}
                </button>
                <button class="danger" @click="deletePost(post.id!)">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          </div>
          <p class="summary">{{ post.summary }}</p>
          <div class="post-meta">
            <span class="date">{{ formatDate(post.created_at) }}</span>
            <span class="reading-time">{{ post.read_time }} min read</span>
            <span v-if="post.published" class="status published">Published</span>
            <span v-else class="status draft">Draft</span>
          </div>
          <div class="post-actions">
            <button class="btn btn-secondary" @click="router.push(`/admin/posts/${post.id}`)">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { postService, type Post } from '../../services/postService';

const router = useRouter();
const posts = ref<Post[]>([]);
const loading = ref(true);
const error = ref('');
const activeMoreMenu = ref<string | null>(null);

const loadPosts = async () => {
  try {
    loading.value = true;
    posts.value = await postService.getAllPosts();
  } catch (err) {
    error.value = 'Error loading posts. Please try again.';
    console.error('Error loading posts:', err);
  } finally {
    loading.value = false;
  }
};

const toggleMoreMenu = (postId: string) => {
  activeMoreMenu.value = activeMoreMenu.value === postId ? null : postId;
};

const duplicatePost = async (post: Post) => {
  try {
    const newPost = { ...post };
    delete newPost.id;
    newPost.title = `${post.title} (Copy)`;
    newPost.created_at = new Date().toISOString();
    newPost.updated_at = new Date().toISOString();
    await postService.createPost(newPost);
    await loadPosts();
  } catch (err) {
    error.value = 'Error duplicating post. Please try again.';
    console.error('Error duplicating post:', err);
  }
};

const previewPost = (post: Post) => {
  window.open(`/preview/${post.id}`, '_blank');
};

const exportPost = (post: Post) => {
  const postData = JSON.stringify(post, null, 2);
  const blob = new Blob([postData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${post.title.toLowerCase().replace(/\s+/g, '-')}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const togglePublishStatus = async (post: Post) => {
  try {
    await postService.updatePost(post.id!, { published: !post.published });
    await loadPosts();
  } catch (err) {
    error.value = 'Error updating post status. Please try again.';
    console.error('Error updating post status:', err);
  }
};

const deletePost = async (id: string) => {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await postService.deletePost(id);
      posts.value = posts.value.filter(post => post.id !== id);
    } catch (err) {
      error.value = 'Error deleting post. Please try again.';
      console.error('Error deleting post:', err);
    }
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Close more menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.more-options')) {
    activeMoreMenu.value = null;
  }
};

onMounted(() => {
  loadPosts();
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.post-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.loading,
.error,
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.error {
  color: #dc3545;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-cover {
  height: 200px;
  overflow: hidden;
}

.post-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.post-content {
  padding: 1.5rem;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.post-header h2 {
  margin: 0;
  font-size: 1.25rem;
  line-height: 1.4;
  flex: 1;
  padding-right: 1rem;
}

.more-options {
  position: relative;
}

.more-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
}

.more-button:hover {
  background: #f0f0f0;
  color: #333;
}

.more-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 200px;
  margin-top: 0.5rem;
  overflow: hidden;
}

.more-menu button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.75rem 1rem;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.more-menu button:hover {
  background: #f8f9fa;
}

.more-menu button svg {
  color: #666;
}

.more-menu button.danger {
  color: #dc3545;
  border-top: 1px solid #eee;
  margin-top: 0.5rem;
}

.more-menu button.danger svg {
  color: #dc3545;
}

.more-menu button.danger:hover {
  background: #fff5f5;
}

.summary {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.status.published {
  background: #e8f5e9;
  color: #2e7d32;
}

.status.draft {
  background: #f5f5f5;
  color: #666;
}

.post-actions {
  display: flex;
  gap: 0.5rem;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background-color 0.2s;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-danger {
  background: #dc3545;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style> 